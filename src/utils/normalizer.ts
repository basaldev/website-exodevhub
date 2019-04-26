export function normalizeProduct(item:any) {
  const {
    node: {
      fields: {
        slug
      },
      frontmatter
    }
  } = item;
  return {
    slug,
    ...frontmatter
  }
}
