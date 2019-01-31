import Typography from 'typography';

const config = require('../../config/SiteConfig');

const typography = new Typography({
  title: 'Lino',
  baseFontSize: config.baseFontSize,
  baseLineHeight: 1.66,
  scaleRatio: 4,
  headerFontFamily: [config.headerFontFamily, 'sans-serif'],
  bodyFontFamily: [config.bodyFontFamily, 'sans-serif'],
  headerWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h2: {
      fontFamily: ['Noto Sans', 'sans-serif'].join(',')
    },
    h1: {
      marginBottom: `3.5rem`
    }
  })
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
