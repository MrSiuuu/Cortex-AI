/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // On garde vos variables CSS personnalisées pour le thème dark/light
      colors: {
        // Vous pouvez utiliser vos variables CSS via var() dans Tailwind
        // ou définir les couleurs directement ici si vous voulez
      },
    },
  },
  plugins: [],
}
