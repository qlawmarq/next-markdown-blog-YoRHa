import { getAllFilesFrontMatter } from '../markdown'

const root = process.cwd()

export async function getAllTags(folder: string) {
  const frontMatters = await getAllFilesFrontMatter(folder)
  let tags: string[] = []
  frontMatters.forEach((frontmatter) => {
    frontmatter.tags?.forEach((tag) => tags.push(tag))
  })
  return [...new Set(tags)]
}
