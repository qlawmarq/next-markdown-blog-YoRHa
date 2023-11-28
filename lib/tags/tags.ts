import { getAllFilesFrontMatter } from '../markdown'

export async function getAllTags(folder: string) {
  const frontMatters = await getAllFilesFrontMatter(folder)
  let tags: string[] = []
  frontMatters
    .filter((frontmatter) => !frontmatter.draft && frontmatter.tags)
    .forEach((frontmatter) => {
      frontmatter.tags?.forEach((tag) => tags.push(tag))
    })
  return [...new Set(tags)]
}
