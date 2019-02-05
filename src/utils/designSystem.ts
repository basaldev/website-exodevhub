// ./tokens/index.ts
import DesignSystem from 'design-system-utils';

// your design tokens object goes here, see below for further details
const designTokens = {
  colors: {
    // Used with `ds.color('colorName')`
    colorPalette: {
      grid: {
        base: '/texture/grid.svg'
      },
      orange: {
        base: '#FF5630',
        dark: '#C72B09'
      },
      red: {
        base: '#EE3B50',
        dark: '#C91026'
      },
      yellow: {
        base: '#FDD758',
        dark: '#FEC400'
      },
      green: {
        base: '#1CD1A6',
        dark: '#029C67'
      },
      blue: {
        base: '#3B4DEE',
        dark: '#0228A7'
      },
      pink: {
        light: '#FEDACF',
        base: '#FFC5A5'
      },
      black: {
        light: '#1A1E42',
        base: '#000000'
      },
      white: {
        light: '#F0F0F0',
        base: '#ffffff',
        dark: '#E7E7E7',
        darker: '#c2c2c2'
      }
    }
  },
  spacing: {
    scale: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80],
    baseline: 20
  },
  border: {
    width: 3
  },
  type: {
    baseFontSize: '22',
    sizes: {
      xxs: '14',
      xs: '16',
      s: '20',
      base: '22',
      m: '28',
      l: '36',
      xl: '44',
      xxl: '52'
    },

    fontFamily: {
      system:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans"',
      sans: '"Noto Sans CJK JP", Helvetica, Arial, sans-serif',
      serif: '"Big John PRO", Times, serif',
      mono: '"Roboto Mono", "Courier New", monospace'
    },
    lineHeight: {
      headings: 1.1
    },
    fontWeight: {
      normal: 300, // Useful to set here if using anything other than `normal`
      bold: 'bold', // Useful to set here when bold webfonts come as 400 font-weight.
      headings: 'bold' // instead of browser default, bold
    }
  }
};

export const designSystem = new DesignSystem(designTokens);
