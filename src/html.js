import React from "react"
import PropTypes from "prop-types"

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          {this.props.headComponents}
          <link rel="preload" crossOrigin="anonymous" href="/fonts/BigJohnPRO-Bold.woff2" as="font"></link>
          <link rel="preload" crossOrigin="anonymous" href="/fonts/BigJohnPRO-Bold.woff" as="font"></link>
          <link rel="preload" href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700|Roboto+Mono:400,700" rel="stylesheet"></link>
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

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
