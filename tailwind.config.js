/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#0A0F2C',
        'dark-secondary': '#1A1F3A',
        'dark-tertiary': '#2A2F4A',
        'neon-blue': '#00D4FF',
        'neon-pink': '#FF2E63',
        'neon-purple': '#8B5CF6',
        'accent-yellow': '#FFD700',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(135deg, #00D4FF 0%, #FF2E63 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0F2C 0%, #1A1F3A 100%)',
        'gradient-card': 'linear-gradient(145deg, #1A1F3A 0%, #2A2F4A 100%)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00D4FF, 0 0 10px #00D4FF, 0 0 15px #00D4FF' },
          '100%': { boxShadow: '0 0 10px #00D4FF, 0 0 20px #00D4FF, 0 0 30px #00D4FF' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
