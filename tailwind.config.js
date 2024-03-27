/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '../../config/**/*.yaml',
    '../../pages/**/*.md',
    './blueprints/**/*.yaml',
    './js/**/*.js',
    './templates/**/*.twig',
    './grav-theme-vite.yaml',
    './grav-theme-vite.php'
  ],
  darkMode: 'class', //false or 'media' or 'class'
  theme: {
    container: {
      center: true,
      // padding: {
      //   DEFAULT: '1rem',
      //   sm: '2rem',
      // },
      screens: {
        sm: `640px`,
        md: `768px`,
        lg: `1024px`,
        xl: `1280px`,
      },
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1480px) { ... }
    },
    extend: {
      fontFamily: {
        'open-sans': ['"Open Sans"', 'sans-serif'],
      },
      fontSize: {
        'step-5': ['var(--step-5)', {
          lineHeight: '1.25',
          letterSpacing: '0rem',
          fontWeight: '600',
        }],
        'step-4': ['var(--step-4)', {
          lineHeight: '1.25',
          letterSpacing: '0rem',
          fontWeight: '600',
        }],
        'step-3': ['var(--step-3)', {
          lineHeight: '1.25',
          letterSpacing: '0rem',
          fontWeight: '500',
        }],
        'step-2': ['var(--step-2)', {
          lineHeight: '1.5',
          letterSpacing: '0rem',
          fontWeight: '500',
        }],
        'step-1': ['var(--step-1)', {
          lineHeight: '1.5',
          letterSpacing: '0rem',
          fontWeight: '400',
        }],
        'step-0': ['var(--step-0)', {
          lineHeight: '1.5',
          letterSpacing: '0rem',
          fontWeight: '400',
        }],
        'step--1': ['var(--step--1)', {
          lineHeight: '1.5',
          letterSpacing: '0rem',
          fontWeight: '400',
        }],
        'step--2': ['var(--step--2)', {
          lineHeight: '1.5',
          letterSpacing: '0rem',
          fontWeight: '400',
        }],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--color-neutral-400)',
            iframe: {
              width: '100%',
              height: '100%',
              aspectRatio: '16/9'
            },
            a: {
              color: 'var(--color-secondary-500)',
              '&:hover': {
                color: 'var(--color-secondary-200)',
              },
            },
          },
        },
      },
      colors:
        [
          { name: 'primary' },
          { name: 'secondary' },
          { name: 'accent' },
          { name: 'neutral' },
          { name: 'base' }
        ].reduce((acc, curr) => {
          const colorObj = {
            [curr.name]: {
              DEFAULT: `var(--color-${curr.name}-500)`,
              50: `var(--color-${curr.name}-50)`,
              100: `var(--color-${curr.name}-100)`,
              200: `var(--color-${curr.name}-200)`,
              300: `var(--color-${curr.name}-300)`,
              400: `var(--color-${curr.name}-400)`,
              500: `var(--color-${curr.name}-500)`,
              600: `var(--color-${curr.name}-600)`,
              700: `var(--color-${curr.name}-700)`,
              800: `var(--color-${curr.name}-800)`,
              900: `var(--color-${curr.name}-900)`,
            },
          };
          return { ...acc, ...colorObj };
        }, {})
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-debug-screens')
  ]
}
