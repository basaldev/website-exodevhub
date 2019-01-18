// ./tokens/index.js
import DesignSystem from 'design-system-utils'

// your design tokens object goes here, see below for further details
const designTokens = {
  colors: {
    // Used with `ds.color('colorName')`
    colorPalette: {
      orange: {
        base: '#D1651C',
      },
      blue: {
        base: '#1CC6D1',
      },
      yellow: {
        base:'#D9B12E',
      },
      navy: {
        base: '#302C8B',
      }
      pink: {
        base: '#FFC5A5'
      }
    },
  },
  spacing: {
    scale: [0, 8, 16, 24, 32, 40],
    baseline: 20,
  },
  type: {
    baseFontSize: '22',
    sizes: {
      xs: '10',
      s: '16',
      base: '22',
      m: '28',
      l: '36',
      xl: '44',
      xxl: '52',
    },

    fontFamily: {
      system:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans"',
      sans: '"Noto Sans CJK JP", Helvetica, Arial, sans-serif',
      serif: '"Big John PRO", Times, serif',
      mono: '"Roboto Mono", "Courier New", monospace',
    },
    lineHeight: {
      headings: 1.1,
    },
    fontSizeUnit: 'px',
    fontWeight: {
      normal: 300, // Useful to set here if using anything other than `normal`
      bold: 'bold', // Useful to set here when bold webfonts come as 400 font-weight.
      headings: 'bold', // instead of browser default, bold
    },
  },
}

export const designSystem = new DesignSystem(designTokens);