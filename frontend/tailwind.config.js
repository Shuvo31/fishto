/** @type {import('tailwindcss').Config} */
const sfText = ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'];
const sfDisplay = ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'];

module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        fontFamily: {
                text: sfText,
                display: sfDisplay,
                sans: sfText,
        },
        // Type scale from the Apple (India) design system; display sizes are headline-only.
        fontSize: {
                xs: ['14px', { lineHeight: '20px', letterSpacing: '-0.016em' }],
                sm: ['17px', { lineHeight: '25px', letterSpacing: '-0.022em' }],
                base: ['19px', { lineHeight: '28px', letterSpacing: '0.012em' }],
                lg: ['26px', { lineHeight: '36px', letterSpacing: '0.004em' }],
                xl: ['28px', { lineHeight: '36px', letterSpacing: '0.007em' }],
                '2xl': ['32px', { lineHeight: '37.5px', letterSpacing: '0.004em' }],
                '3xl': ['34px', { lineHeight: '40px', letterSpacing: '-0.003em' }],
                display: ['48px', { lineHeight: '52px', letterSpacing: '-0.003em' }],
                'display-lg': ['56px', { lineHeight: '60px', letterSpacing: '-0.005em' }],
                hero: ['80px', { lineHeight: '84px', letterSpacing: '-0.015em' }],
        },
        fontWeight: {
                normal: '400',
                semibold: '600',
        },
        extend: {
                colors: {
                        // Theme-aware tokens (values swap under .dark, see index.css)
                        fg: {
                                DEFAULT: 'rgb(var(--fg) / <alpha-value>)',
                                muted: 'rgb(var(--fg-muted) / <alpha-value>)',
                        },
                        canvas: {
                                DEFAULT: 'rgb(var(--canvas) / <alpha-value>)',
                                alt: 'rgb(var(--canvas-alt) / <alpha-value>)',
                        },
                        brand: {
                                link: 'rgb(var(--brand-link) / <alpha-value>)',
                                DEFAULT: '#0071E3',
                                bright: '#2997FF',
                        },
                        // Fixed tokens for surfaces that stay dark in both themes
                        ink: '#1D1D1F',
                        snow: '#F5F5F7',
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                },
                spacing: {
                        's11': '11px',
                        's15': '15px',
                        's39': '39px',
                        's43': '43px',
                },
                borderRadius: {
                        pill: '980px',
                        lg: 'var(--radius)',
                        md: 'var(--radius)',
                        sm: 'var(--radius)'
                },
                transitionTimingFunction: {
                        apple: 'cubic-bezier(0.4, 0, 0.6, 1)',
                },
                transitionDuration: {
                        base: '240ms',
                        slow: '320ms',
                        slower: '387.5ms',
                },
                keyframes: {
                        'accordion-down': {
                                from: { height: '0' },
                                to: { height: 'var(--radix-accordion-content-height)' }
                        },
                        'accordion-up': {
                                from: { height: 'var(--radix-accordion-content-height)' },
                                to: { height: '0' }
                        },
                        'fade-up': {
                                '0%': { opacity: '0', transform: 'translateY(24px)' },
                                '100%': { opacity: '1', transform: 'translateY(0)' },
                        },
                        'hero-rise': {
                                '0%': { opacity: '0', transform: 'translateY(60px) scale(0.92)' },
                                '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                        },
                        'swim': {
                                '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
                                '50%': { transform: 'translateY(-14px) rotate(1deg)' },
                        },
                },
                animation: {
                        'accordion-down': 'accordion-down 320ms cubic-bezier(0.4, 0, 0.6, 1)',
                        'accordion-up': 'accordion-up 320ms cubic-bezier(0.4, 0, 0.6, 1)',
                        'fade-up': 'fade-up 800ms cubic-bezier(0.4, 0, 0.6, 1) both',
                        'hero-rise': 'hero-rise 1400ms cubic-bezier(0.16, 1, 0.3, 1) both',
                        'swim': 'swim 7s ease-in-out infinite',
                },
        }
  },
  plugins: [require("tailwindcss-animate")],
};
