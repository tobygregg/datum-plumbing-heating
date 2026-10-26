/** ============================================================
 *  Tailwind config — Datum Plumbing & Heating Ltd
 *  Brand colours + fonts live here. Change them once, rebuild
 *  (npm run build) and the whole site updates.
 *  ============================================================ */
module.exports = {
  content: ['./index.html', './thanks.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Datum navy — the logo's lettering (#0b3369), extended into a full scale
        navy: {
          DEFAULT: '#0B3369',
          950: '#050F22',
          900: '#071A38',
          800: '#0A2A57',
          700: '#0B3369',
          600: '#1B4C8C',
          500: '#3068AE',
          300: '#8FAFD6',
        },
        // Steel — the grey-blues in the logo (#95a9b8, #d8e3ea)
        steel: {
          DEFAULT: '#95A9B8',
          200: '#D8E3EA',
          100: '#EAF0F4',
          50: '#F5F8FA',
        },
        // Copper — the pipework in the plant-room and underfloor photos
        copper: {
          DEFAULT: '#C8793A',
          light: '#E9A46D',
          dark: '#8F4F22',
        },
        // Heat — the orange expansion vessels in the cover photo; used for calls to action
        heat: {
          DEFAULT: '#FF6B2C',
          light: '#FF9158',
          dark: '#D94E12',
        },
        // Flow — the blue pipework in the cover photo; accents on animated pipes
        flow: {
          DEFAULT: '#2F8CE6',
          light: '#7DBBF5',
        },
        ink: '#10213B', // body text on light backgrounds
        muted: '#51657F', // secondary text on light backgrounds
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'system-ui', 'sans-serif'],
        sans: ['Barlow', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { site: '1240px' },
      boxShadow: {
        card: '0 1px 0 rgba(255,255,255,.8) inset, 0 24px 48px -28px rgba(7,26,56,.45)',
        btn: '0 4px 0 #D94E12',
        'btn-navy': '0 4px 0 #050F22',
      },
      keyframes: {
        kenburns: { '0%': { transform: 'scale(1.04) translate3d(0,0,0)' }, '100%': { transform: 'scale(1.16) translate3d(-1.5%,-1%,0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        scroll: { '0%': { transform: 'translateY(0)', opacity: 1 }, '80%,100%': { transform: 'translateY(14px)', opacity: 0 } },
      },
      animation: {
        kenburns: 'kenburns 26s ease-in-out infinite alternate',
        float: 'float 6s ease-in-out infinite',
        scroll: 'scroll 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
