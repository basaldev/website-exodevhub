module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: 'Exo Devhub', // Navigation and Site Title
  siteTitleAlt: 'Exo Devhub', // Alternative Site title for SEO
  siteUrl: 'https://minimal-blog.netlify.com', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteBanner: '/social/banner.jpg', // Your image for og:image tag. You can find it in the /static folder
  favicon: 'src/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'Minimal Blog with big typography', // Your site description
  author: 'LekoArts', // Author for schemaORGJSONLD
  siteLogo: '/social/logo.svg', // Image for schemaORGJSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@exodevhub', // Twitter Username - Optional
  ogSiteName: 'exodevhub', // Facebook Site Name - Optional
  ogLanguage: 'en_US', // Facebook Language

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#000000',
  backgroundColor: '#000000',

  // Settings for typography.js
  headerFontFamily: 'Big John Pro',
  bodyFontFamily: 'Noto Sans JP',
  baseFontSize: '18px',
};
