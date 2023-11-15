import { ArticleFrontmatter } from '@/types/article'
import fs from 'fs'
import path from 'path'
import getAllFiles from '../utils/getAllFiles'
import { serialize } from 'next-mdx-remote/serialize'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeToc from '@jsdevtools/rehype-toc'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

const root = process.cwd()
const contentsDir = 'contents'

function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)/, '')
}

function dateSortDesc(a: string | number, b: string | number) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export async function getMdxFrontMatterBySlug(folder: string, slug: string) {
  const mdxPath = path.join(root, contentsDir, folder, `${slug}.mdx`)
  const mdPath = path.join(root, contentsDir, folder, `${slug}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.existsSync(mdPath)
      ? fs.readFileSync(mdPath, 'utf8')
      : undefined
  // Warn unexpected files
  if (source === undefined) {
    throw new Error(`Detected non-markdown format files: ${mdxPath}`)
  }
  const mdxSource = (await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      development: false,
      remarkPlugins: [remarkGfm, remarkFootnotes, remarkMath],
      rehypePlugins: [rehypeSlug, rehypePrismPlus, rehypeToc],
    },
  })) as unknown as MDXRemoteSerializeResult<Record<string, string>, ArticleFrontmatter>
  if (!mdxSource.frontmatter) {
    throw new Error(`Cannot find the frontmatter in your file: ${mdxPath}`)
  }
  return { ...mdxSource, frontmatter: { ...mdxSource.frontmatter, slug: formatSlug(slug) } }
}

export async function getAllFilesFrontMatter(folder: string) {
  const prefixPaths = path.join(root, contentsDir, folder)
  const files = getAllFiles(prefixPaths)
  const allFrontMatter = await Promise.all(
    files.map(async (file: string) => {
      // Convert absolute to relative
      const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
      // Warn unexpected files
      if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
        throw new Error(`Detected non-markdown format files: ${fileName}`)
      }
      const source = fs.readFileSync(file, 'utf8')
      const results = await serialize(source, { parseFrontmatter: true })
      if (!results.frontmatter) {
        throw new Error(`Cannot find the frontmatter in your file: ${fileName}`)
      }
      return {
        slug: formatSlug(fileName),
        ...results.frontmatter,
      } as ArticleFrontmatter
    })
  )
  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
