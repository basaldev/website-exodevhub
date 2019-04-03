const path = require('path')
const _ = require('lodash')

function createSlug(node, key, createNodeField) {
  if (
    Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
    Object.prototype.hasOwnProperty.call(node.frontmatter, key)
  ) {
    createNodeField({
      node,
      name: 'slug',
      value: `/${_.kebabCase(node.frontmatter[key])}`,
    })
  }
}
function createPostType(
  postType,
  rawQuery,
  component,
  createPage,
  contextCallback
) {
  let result = []

  _.each(rawQuery, edge => {
    if (_.get(edge, 'node.frontmatter.type') === postType) {
      result = result.concat(edge)
    }
  })
  result = _.uniq(result)
  result.forEach((edge, index) => {
    const extraContext = contextCallback(result, index) || {}

    createPage({
      path: edge.node.fields.slug,
      component,
      context: {
        slug: edge.node.fields.slug,
        ...extraContext,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slugFields = ['slug', 'title', 'fullName']
    _.map(slugFields, key => createSlug(node, key, createNodeField))
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postPage = path.resolve('src/templates/post.tsx')
    const categoryPage = path.resolve('src/templates/category.tsx')
    resolve(
      graphql(`
        {
          posts: allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  category
                  type
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        const results = result.data.posts.edges

        createPostType('post', results, postPage, createPage, (r, i) => {
          return {
            next: i === 0 ? null : r[i - 1].node,
            prev: i === r.length - 1 ? null : r[i + 1].node,
          }
        })
        createPostType(
          'person',
          results,
          path.resolve(`src/templates/person.tsx`),
          createPage
        )
        let categories = []

        _.each(results, edge => {
          if (!_.isNull(_.get(edge, 'node.frontmatter.category'))) {
            categories = categories.concat(edge.node.frontmatter.category)
          }
        })
        categories = _.uniq(categories)

        categories.forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}`,
            component: categoryPage,
            context: {
              category,
            },
          })
        })
      })
    )
  })
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}
