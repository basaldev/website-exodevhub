const { createFilePath } = require('gatsby-source-filesystem')
const { templateSelector } = require('./gastby-template-selector')
const path = require('path');
const _ = require('lodash');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const allMarkdownRemark = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                posttype
                category
              }
            }
          }
        }
      }
    `
  )

  function createPagesFun(graphql) {
    const posts = graphql.data.allMarkdownRemark.edges;
    posts.forEach(post => {
      if(hasCategory(post.node)){
        createPage(createTaxonomy(post.node));
      }
      createPage(templateSelector(post, posts));
    })
  }
  await createPagesFun(allMarkdownRemark)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
function hasCategory(post){
  if(typeof post.frontmatter !== 'undefined'){
    return post.frontmatter.category !== null && post.frontmatter.category !== '';
  } else {
    return false;
  }
}

function createTaxonomy(post) {
    const template = path.resolve(`./src/templates/category.tsx`);
    const catPath = `/${post.frontmatter.posttype}/category/${_.kebabCase(post.frontmatter.category)}`;
    return {
      path: catPath,
      component: template,
      context: {
        category: post.frontmatter.category,
      },
  };
}


// let result = []

// _.each(rawQuery, edge => {
//   if (_.get(edge, 'node.frontmatter.posttype') === postType && edge.node.frontmatter[name]) {
//     result = result.concat(edge.node.frontmatter[name])
//   }
// })

// result = _.uniq(result)

// result.forEach((single, index) => {
