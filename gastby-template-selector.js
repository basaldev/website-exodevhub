const path = require('path')
const _ = require('lodash');
function postsIndexPrevious(posts, slug) {
  const index = _.findIndex(posts, function(p) {
    return p.node.fields.slug == slug
  })
  const previous = index === posts.length - 1 ? null : posts[index + 1].node
  return previous
}
function postsIndexNext(posts, slug) {
  const index = _.findIndex(posts, function(p) {
    return p.node.fields.slug == slug
  })
  const next = index === 0 ? null : posts[index - 1].node
  return next
}
function filterByPost(posts, posttype) {
  return _.filter(posts, p => {
    return p.node.frontmatter.posttype === posttype
  })
}

exports.templateSelector = (post, posts) => {
  const template = path.resolve(
    `./src/templates/${post.node.frontmatter.posttype}.tsx`
  )
  switch (post.node.frontmatter.posttype) {
    case 'post':
      return {
        path: post.node.fields.slug,
        component: template,
        context: {
          slug: post.node.fields.slug,
          previous: postsIndexPrevious(
            filterByPost(posts, 'post'),
            post.node.fields.slug
          ),
          next: postsIndexNext(
            filterByPost(posts, 'post'),
            post.node.fields.slug
          ),
        },
      }
    default:
      return {
        path: post.node.fields.slug,
        component: template,
        context: {
          slug: post.node.fields.slug,
        },
      }
  }
}
