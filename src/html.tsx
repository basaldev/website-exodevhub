import React from 'react'

interface Props {
  htmlAttributes: object
  headComponents: any[]
  bodyAttributes: object
  preBodyComponents: any[]
  body: string
  postBodyComponents: any[]
}

function googleSeo(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-133300815-1');
}

export default class HTML extends React.Component<Props, {}> {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-133300815-1"></script>
          <script>
            googleSeo();
          </script>

          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
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
            href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700|Roboto+Mono:400,700"
            rel="stylesheet"
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
