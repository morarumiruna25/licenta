/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './src/**/*.{html,js}',
    // './node_modules/tw-elements/dist/js/**/*.js',
    // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      'Montaga': ['Montaga', 'serif'],
  },
  },
  plugins: [
    // require('tw-elements/dist/plugin'),
    require('flowbite/plugin'),
    // require('@tailwindcss/forms'),
  ],
  
}