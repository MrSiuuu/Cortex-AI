<script setup>
import { ref, nextTick, watch, onUnmounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useAuth } from '../composables/useAuth'

const auth = useAuth()

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
const OPENAI_MODEL = 'gpt-4o-mini'
const INACTIVITY_MS = 60 * 1000 // 1 minute

const SYSTEM_PROMPT_BASE = `Tu es Alex, un agent commercial de Kortex AI, une agence spécialisée en automatisation IA pour les PME.

Tes objectifs dans cet ordre :
1. Comprendre le besoin du visiteur
2. Lui présenter nos offres naturellement
3. Capter son prénom, email et/ou téléphone
4. L'encourager à créer un compte pour réserver un RDV avec un agent ou parler avec un agent plus qualifié

Règles :
- Tu ne mentionnes jamais que tu es une IA
- Tu es naturel, humain, professionnel
- Tu poses une seule question à la fois`

function getSystemPrompt() {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const signupLink = origin ? `${origin}/inscription` : '/inscription'
  return `${SYSTEM_PROMPT_BASE}

- Quand tu invites à créer un compte, réserver un RDV ou parler à un agent, propose ce lien d'inscription exact : ${signupLink}`
}

const isOpen = ref(false)
const isButtonHovered = ref(false)
const conversationId = ref(null)
/** 'visitor' = Supabase conv, 'connected' = n8n (UUID) */
const conversationSource = ref(null)
const messages = ref([])
const inputText = ref('')
const isLoading = ref(false)
const messagesEndRef = ref(null)

let inactivityTimerId = null

const welcomeMessageVisitor = {
  role: 'bot',
  content: 'Bonjour. Je suis Alex, votre conseiller Kortex AI. Comment puis-je vous aider aujourd\'hui ?'
}

const showWelcome = ref(true)

function clearInactivityTimer() {
  if (inactivityTimerId != null) {
    clearTimeout(inactivityTimerId)
    inactivityTimerId = null
  }
}

function resetInactivityTimer() {
  clearInactivityTimer()
  inactivityTimerId = setTimeout(() => {
    closeConversation()
  }, INACTIVITY_MS)
}

async function closeConversation() {
  clearInactivityTimer()
  const cid = conversationId.value
  const source = conversationSource.value
  conversationId.value = null
  conversationSource.value = null
  if (!cid) return
  if (source === 'visitor') {
    await supabase
      .from('conversations')
      .update({ status: 'completed', closed: true })
      .eq('id', cid)
  }
}

function openChat() {
  isOpen.value = true
  if (showWelcome.value && messages.value.length === 0) {
    const u = auth.user?.value ?? null
    if (u) {
      const name = u.user_metadata?.first_name || ''
      messages.value.push({
        role: 'bot',
        content: `Bonjour ${name ? name + ' ' : ''}! Je suis Alex, votre conseiller Kortex AI. Comment puis-je vous aider aujourd'hui ?`
      })
    } else {
      messages.value.push(welcomeMessageVisitor)
    }
    showWelcome.value = false
  }
}

function closeChat() {
  closeConversation()
  isOpen.value = false
}

function scrollToBottom() {
  nextTick(() => {
    messagesEndRef.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

watch(messages, () => scrollToBottom(), { deep: true })

watch(
  () => auth.user?.value ?? null,
  () => {
    conversationId.value = null
    conversationSource.value = null
  },
  { deep: true }
)

onUnmounted(clearInactivityTimer)

async function ensureConversation() {
  if (conversationId.value) return conversationId.value
  const { data, error } = await supabase
    .from('conversations')
    .insert({ status: 'active' })
    .select('id')
    .single()
  if (error) throw error
  conversationId.value = data.id
  conversationSource.value = 'visitor'
  return data.id
}

function buildOpenAIMessages(userText) {
  const history = messages.value.map((m) => ({
    role: m.role === 'visitor' ? 'user' : 'assistant',
    content: m.content
  }))
  return [
    { role: 'system', content: getSystemPrompt() },
    ...history,
    { role: 'user', content: userText }
  ]
}

async function callOpenAI(userText) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  if (!apiKey?.trim()) {
    return 'Configuration manquante. Merci de réessayer plus tard.'
  }
  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: buildOpenAIMessages(userText)
    })
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Erreur ${res.status}`)
  }
  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content
  if (typeof content !== 'string') throw new Error('Réponse invalide')
  return content.trim()
}

/** Chatbot 1 — visiteur non connecté : OpenAI + Supabase */
async function sendMessageVisitor(text) {
  const cid = await ensureConversation()
  const { error: errVisitor } = await supabase.from('messages').insert({
    conversation_id: cid,
    role: 'visitor',
    content: text
  })
  if (errVisitor) throw errVisitor
  resetInactivityTimer()
  const reply = await callOpenAI(text)
  const { error: errBot } = await supabase.from('messages').insert({
    conversation_id: cid,
    role: 'bot',
    content: reply
  })
  if (errBot) console.error('ChatWidget: bot message insert failed', errBot)
  return reply
}

/** Chatbot 2 — user connecté : webhook n8n */
async function sendMessageConnected(text) {
  if (!conversationId.value) {
    conversationId.value = crypto.randomUUID()
    conversationSource.value = 'connected'
  }
  const u = auth.user?.value ?? null
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_CHATBOT_USER
  if (!webhookUrl?.trim()) throw new Error('Configuration webhook manquante.')
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: text,
      conversation_id: conversationId.value,
      user_id: u?.id,
      user_name: u?.user_metadata?.first_name || 'Client',
      user_email: u?.email || ''
    })
  })
  const data = await res.json().catch(() => ({}))
  const reply = data?.reply ?? data?.message ?? data?.response
  if (typeof reply !== 'string' || !reply.trim()) {
    throw new Error('Réponse invalide')
  }
  return reply.trim()
}

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isLoading.value) return

  inputText.value = ''
  messages.value.push({ role: 'visitor', content: text })
  scrollToBottom()

  isLoading.value = true
  let botContent = 'Désolé, je n\'ai pas pu traiter votre message.'

  try {
    const u = auth.user?.value ?? null
    const reply = u
      ? await sendMessageConnected(text)
      : await sendMessageVisitor(text)
    resetInactivityTimer()
    botContent = reply
  } catch (err) {
    console.error('ChatWidget:', err)
    if (err?.message?.includes('Configuration')) botContent = err.message
    else botContent = 'Une erreur est survenue. Réessayez dans un instant.'
  } finally {
    messages.value.push({ role: 'bot', content: botContent })
    isLoading.value = false
    scrollToBottom()
  }
}

function onKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

function setButtonHover(v) {
  isButtonHovered.value = v
}

/** Rend le texte sûr et rend les URLs cliquables */
function linkify(text) {
  if (typeof text !== 'string') return ''
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
  const urlRegex = /(https?:\/\/[^\s<>)\]]+)/g
  return escaped.replace(urlRegex, (url) => {
    const clean = url.replace(/&amp;/g, '&').replace(/[.,;:!?)]+$/, '')
    const safeHref = clean.replace(/"/g, '&quot;')
    return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" class="chat-widget-link">${clean}</a>`
  })
}
</script>

<template>
  <div class="chat-widget">
    <!-- Label au hover (à gauche du bouton) -->
    <div class="chat-widget-label" :class="{ visible: isButtonHovered && !isOpen }">
      Kortex AI
    </div>

    <!-- Bouton flottant -->
    <button
      type="button"
      class="chat-widget-trigger"
      aria-label="Ouvrir le chat"
      @click="isOpen ? closeChat() : openChat()"
      @mouseenter="setButtonHover(true)"
      @mouseleave="setButtonHover(false)"
    >
      <span v-if="isOpen" class="chat-widget-close-icon">&#215;</span>
      <span v-else class="chat-widget-geometry">
        <span class="chat-widget-square chat-widget-square-1"></span>
        <span class="chat-widget-square chat-widget-square-2"></span>
      </span>
    </button>

    <!-- Fenêtre de chat -->
    <div v-show="isOpen" class="chat-widget-window">
      <header class="chat-widget-header">
        <div class="chat-widget-header-title">Alex — Kortex AI</div>
        <div class="chat-widget-header-status">
          <span class="chat-widget-pulse"></span>
          En ligne
        </div>
        <button type="button" class="chat-widget-header-close" aria-label="Fermer" @click="closeChat">&#215;</button>
      </header>

      <div class="chat-widget-messages" ref="messagesContainer">
        <div v-for="(msg, i) in messages" :key="i" class="chat-widget-msg-wrap" :class="msg.role">
          <div v-if="msg.role === 'bot'" class="chat-widget-avatar">K</div>
          <div class="chat-widget-bubble" v-html="linkify(msg.content)"></div>
        </div>
        <div v-if="isLoading" class="chat-widget-msg-wrap bot">
          <div class="chat-widget-avatar">K</div>
          <div class="chat-widget-typing">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div ref="messagesEndRef"></div>
      </div>

      <form class="chat-widget-form" @submit.prevent="sendMessage">
        <input
          v-model="inputText"
          type="text"
          class="chat-widget-input"
          placeholder="Écrivez votre message..."
          :disabled="isLoading"
          @keydown="onKeydown"
        />
        <button type="submit" class="chat-widget-send" :disabled="isLoading || !inputText.trim()" aria-label="Envoyer">
          &#9654;
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  font-family: var(--font-family, 'Space Grotesk', system-ui, sans-serif);
}

.chat-widget-label {
  position: absolute;
  right: 100%;
  bottom: 50%;
  transform: translateY(50%);
  margin-right: 12px;
  padding: 8px 12px;
  background: #0a0a0f;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.chat-widget-label.visible {
  opacity: 1;
}

.chat-widget-trigger {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background: #0a0a0f;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: box-shadow 0.25s ease, transform 0.2s ease;
}
.chat-widget-trigger:hover {
  box-shadow: 0 0 24px rgba(0, 229, 255, 0.35);
  transform: scale(1.02);
}

.chat-widget-close-icon {
  font-size: 1.5rem;
  color: var(--text);
  line-height: 1;
}

.chat-widget-geometry {
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chat-widget-square {
  position: absolute;
  border: 1px solid #00e5ff;
  box-shadow: 0 0 8px rgba(0, 229, 255, 0.5);
}
.chat-widget-square-1 {
  width: 24px;
  height: 24px;
  animation: chat-widget-rotate1 4s linear infinite;
}
.chat-widget-square-2 {
  width: 14px;
  height: 14px;
  animation: chat-widget-rotate2 6s linear infinite;
}
@keyframes chat-widget-rotate1 {
  from { transform: rotate3d(1, 1, 0, 0deg); }
  to { transform: rotate3d(1, 1, 0, 360deg); }
}
@keyframes chat-widget-rotate2 {
  from { transform: rotate3d(1, 1, 0, 360deg); }
  to { transform: rotate3d(1, 1, 0, 0deg); }
}
.chat-widget-trigger:hover .chat-widget-square {
  box-shadow: 0 0 12px rgba(0, 229, 255, 0.7);
}
.chat-widget-trigger:hover .chat-widget-square-1 {
  animation-duration: 3s;
}
.chat-widget-trigger:hover .chat-widget-square-2 {
  animation-duration: 4.5s;
}

.chat-widget-window {
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 360px;
  height: 500px;
  background: var(--bg-card);
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
@media (max-width: 479px) {
  .chat-widget-window {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
    bottom: 0;
    right: 0;
  }
}

.chat-widget-header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  background: var(--bg);
  border-bottom: 1px solid var(--border-subtle);
}
.chat-widget-header-title {
  flex: 1;
  font-weight: 600;
  font-size: 1rem;
  color: var(--text);
}
.chat-widget-header-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--text-muted);
}
.chat-widget-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-green);
  animation: chat-widget-pulse 1.5s ease-in-out infinite;
}
@keyframes chat-widget-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}
.chat-widget-header-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--text-muted);
  font-size: 1.25rem;
  border-radius: var(--radius);
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}
.chat-widget-header-close:hover {
  color: var(--text);
  background: var(--border-subtle);
}

.chat-widget-messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scroll-behavior: smooth;
}
.chat-widget-msg-wrap {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}
.chat-widget-msg-wrap.visitor {
  flex-direction: row-reverse;
}
.chat-widget-msg-wrap.visitor .chat-widget-avatar {
  display: none;
}
.chat-widget-avatar {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--accent-violet);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chat-widget-bubble {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 0.95rem;
  line-height: 1.45;
}
.chat-widget-msg-wrap.visitor .chat-widget-bubble {
  background: var(--accent-violet);
  color: #fff;
  border-bottom-right-radius: 4px;
}
.chat-widget-msg-wrap.bot .chat-widget-bubble {
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--border-subtle);
  border-bottom-left-radius: 4px;
}
.chat-widget-bubble :deep(.chat-widget-link) {
  color: var(--accent-violet);
  text-decoration: underline;
  word-break: break-all;
}
.chat-widget-bubble :deep(.chat-widget-link:hover) {
  color: var(--accent-blue);
}
.chat-widget-msg-wrap.visitor .chat-widget-bubble :deep(.chat-widget-link) {
  color: rgba(255, 255, 255, 0.95);
  text-decoration: underline;
}
.chat-widget-msg-wrap.visitor .chat-widget-bubble :deep(.chat-widget-link:hover) {
  color: #fff;
}

.chat-widget-typing {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background: var(--bg);
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  border-bottom-left-radius: 4px;
}
.chat-widget-typing span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: chat-widget-dots 1.2s ease-in-out infinite;
}
.chat-widget-typing span:nth-child(2) { animation-delay: 0.15s; }
.chat-widget-typing span:nth-child(3) { animation-delay: 0.3s; }
@keyframes chat-widget-dots {
  0%, 100% { opacity: 0.4; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1); }
}

.chat-widget-form {
  flex-shrink: 0;
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: var(--bg);
  border-top: 1px solid var(--border-subtle);
}
.chat-widget-input {
  flex: 1;
  padding: 10px 14px;
  border-radius: var(--radius);
  border: 1px solid var(--border-subtle);
  background: var(--bg-card);
  color: var(--text);
  font-size: 0.95rem;
  font-family: inherit;
}
.chat-widget-input::placeholder {
  color: var(--text-muted);
}
.chat-widget-input:focus {
  outline: none;
  border-color: var(--accent-violet);
}
.chat-widget-input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.chat-widget-send {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: var(--radius);
  background: var(--accent-violet);
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
}
.chat-widget-send:hover:not(:disabled) {
  transform: scale(1.05);
}
.chat-widget-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
