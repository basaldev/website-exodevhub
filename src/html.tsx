import React from 'react'

interface Props {
  htmlAttributes: object
  headComponents: any[]
  bodyAttributes: object
  preBodyComponents: any[]
  body: string
  postBodyComponents: any[]
}
const fonts = `@font-face {
  font-family: 'Big John PRO';
  src: url('/fonts/BigJohnPRO-Bold.woff2') format('woff2'),
      url('/fonts/BigJohnPRO-Bold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
  font-display:block;
}
@font-face {
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v6/L0x5DF4xlVMF-BfR8bXMIjhGq3-cXbKDO1w.woff2) format('woff2');
unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v6/L0x5DF4xlVMF-BfR8bXMIjhPq3-cXbKDO1w.woff2) format('woff2');
unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v6/L0x5DF4xlVMF-BfR8bXMIjhHq3-cXbKDO1w.woff2) format('woff2');
unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v6/L0x5DF4xlVMF-BfR8bXMIjhIq3-cXbKDO1w.woff2) format('woff2');
unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v6/L0x5DF4xlVMF-BfR8bXMIjhEq3-cXbKDO1w.woff2) format('woff2');
unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v6/L0x5DF4xlVMF-BfR8bXMIjhFq3-cXbKDO1w.woff2) format('woff2');
unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 400;
src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v6/L0x5DF4xlVMF-BfR8bXMIjhLq3-cXbKD.woff2) format('woff2');
unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v6/L0xkDF4xlVMF-BfR8bXMIjDwjmq8f7-pAVU_Lrg.woff2) format('woff2');
unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v6/L0xkDF4xlVMF-BfR8bXMIjDwjmq1f7-pAVU_Lrg.woff2) format('woff2');
unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v6/L0xkDF4xlVMF-BfR8bXMIjDwjmq9f7-pAVU_Lrg.woff2) format('woff2');
unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v6/L0xkDF4xlVMF-BfR8bXMIjDwjmqyf7-pAVU_Lrg.woff2) format('woff2');
unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v6/L0xkDF4xlVMF-BfR8bXMIjDwjmq-f7-pAVU_Lrg.woff2) format('woff2');
unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v6/L0xkDF4xlVMF-BfR8bXMIjDwjmq_f7-pAVU_Lrg.woff2) format('woff2');
unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
font-family: 'Roboto Mono';
font-style: normal;
font-weight: 700;
src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v6/L0xkDF4xlVMF-BfR8bXMIjDwjmqxf7-pAVU_.woff2) format('woff2');
unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
`
export default class HTML extends React.Component<Props, {}> {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-133300815-1"
          />
          <style type="text/css" dangerouslySetInnerHTML={{ __html:fonts}}></style>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          {this.props.headComponents}
          <link
            rel="preload"
            crossOrigin="anonymous"
            href="/fonts/BigJohnPRO-Bold.woff2"
            as="font"
          />
          <link
            rel="preload"
            crossOrigin="anonymous"
            href="/fonts/BigJohnPRO-Bold.woff"
            as="font"
          />
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700"
          />
        </head>
        <body {...this.props.bodyAttributes}>
          <style>{`
          body {
            opacity: 0;
            font-display:block;
          }
        `}</style>
          {this.props.preBodyComponents}

          <noscript key="noscript" id="gatsby-noscript">
            This app works best with JavaScript enabled.
          </noscript>
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
