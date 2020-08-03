import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'public/_posts')

export function getPostDir() {
  return fs.readdirSync(postsDirectory)
}

export function getPostByDir(slug: string, fields: string[] = []) {
  // const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${slug}/index.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'dir') {
      items[field] = slug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields: string[] = []) {
  const postDirs = getPostDir()
  const posts = postDirs
    .map((slug) => getPostByDir(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
