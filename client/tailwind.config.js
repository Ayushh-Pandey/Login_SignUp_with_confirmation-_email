// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      screens: {
        'xs':{'min':'300px','max':'639px'},
        
        'sm': { 'min': '640px', 'max': '767px' },
        // => @media (min-width: 640px and max-width: 767px) { ... }

        'md': { 'min': '768px', 'max': '1023px' },
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        'lg': { 'min': '1024px', 'max': '1279px' },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }

        'xl': { 'min': '1280px', 'max': '1535px' },
        // => @media (min-width: 1280px and max-width: 1535px) { ... }

        '2xl': { 'min': '1536px' },
        // => @media (min-width: 1536px) { ... }
      }
    
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hidden': {
          /* Hide the vertical scrollbar */
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',      /* Firefox */
          '&::-webkit-scrollbar': {
            display: 'none'               /* Chrome, Safari, and Opera */
          }
        }
      };

      addUtilities(newUtilities, {
        variants: ['responsive', 'hover']
      });
    }
  ],
}
