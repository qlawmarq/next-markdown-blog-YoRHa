import { getAllFilesFrontMatter } from '../markdown'

export async function getAllTags(folder: string) {
  try {
    const frontMatters = await getAllFilesFrontMatter(folder)
    const tags: string[] = []
    frontMatters
      .filter((frontmatter) => !frontmatter.draft && frontmatter.tags)
      .forEach((frontmatter) => {
        frontmatter.tags?.forEach((tag) => tags.push(tag))
      })
    return [...new Set(tags)]
  } catch (error) {
    console.error('Error in getAllTags', error)
    return []
  }
}
