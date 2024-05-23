/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    fontFamily: {
      sans: ['Prompt', 'Arial', 'sans-serif'],
      serif: ['Prompt', 'Arial', 'sans-serif'],
      mono: ['Prompt', 'Arial', 'sans-serif'],
      display: ['Prompt', 'Arial', 'sans-serif'],
      body: ['Prompt', 'Arial', 'sans-serif']
    },
    container: {
      center: true,
      padding: '0.75rem'
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: 'var(--primary-color)',
        primaryHover: 'var(--primary-hover)',
        secondary: 'var(--secondary-color)',
        info: 'var(--info-color)',
        gray: 'var(--gray-color)',
        black: 'var(--black-color)',
        success: 'var(--success-color)',
        error: 'var(--error-color)',
        border: 'var(--border-color)',
        light: 'var(--light-color)',
        yellow: 'var(--yellow-color)',
      },
    }
  },
  plugins: [
  ]
}
