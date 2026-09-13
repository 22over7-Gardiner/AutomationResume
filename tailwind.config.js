/** @type {import('tailwindcss').Config} */
const c = (v) => `oklch(var(${v}) / <alpha-value>)`;
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { background:c('--color-background'), surface:c('--color-surface'), surfaceAlt:c('--color-surfaceAlt'), foreground:c('--color-foreground'), foregroundMuted:c('--color-foregroundMuted'), border:c('--color-border'), primary:c('--color-primary'), accent:c('--color-accent'), accentForeground:c('--color-accentForeground'), slate:c('--color-slate') },
    fontFamily: { display:['Familjen Grotesk','system-ui','sans-serif'], body:['Inter','system-ui','sans-serif'] },
    borderRadius: { DEFAULT:'0.75rem' }
  }},
  plugins: []
};
