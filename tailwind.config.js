/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'system-ui', 'sans-serif'],
        ui: ['Rajdhani', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          950: '#05070d',
          900: '#0a0e1a',
          800: '#0f1424',
          700: '#161b2e',
          600: '#1d2440',
        },
        neon: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          purple: '#a855f7',
          magenta: '#d946ef',
        },
      },
      boxShadow: {
        glow: '0 0 24px rgba(34,211,238,0.25), 0 0 48px rgba(59,130,246,0.12)',
        'glow-purple': '0 0 24px rgba(168,85,247,0.28), 0 0 56px rgba(168,85,247,0.12)',
        'glow-soft': '0 0 18px rgba(34,211,238,0.18)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '.65', filter: 'brightness(1.35)' },
        },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        shimmer: { '100%': { transform: 'translateX(220%)' } },
        ring: {
          '0%': { transform: 'scale(.7)', opacity: '.7' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        barFill: {
          from: { width: '0%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.6s ease-in-out infinite',
        'spin-slow': 'spinSlow 16s linear infinite',
        'spin-rev': 'spinSlow 24s linear infinite reverse',
        'fade-in': 'fadeIn .5s ease forwards',
        'fade-in-up': 'fadeInUp .55s cubic-bezier(.22,1,.36,1) forwards',
        'fade-in-down': 'fadeInDown .55s cubic-bezier(.22,1,.36,1) forwards',
        'scale-in': 'scaleIn .45s cubic-bezier(.22,1,.36,1) forwards',
        'slide-in-right': 'slideInRight .4s cubic-bezier(.22,1,.36,1) forwards',
        blink: 'blink 1.1s steps(2) infinite',
        shimmer: 'shimmer 2.4s infinite',
        ring: 'ring 2.6s ease-out infinite',
        ticker: 'ticker 32s linear infinite',
        'bar-fill': 'barFill 1.1s cubic-bezier(.22,1,.36,1) forwards',
      },
    },
  },
  plugins: [],
};
