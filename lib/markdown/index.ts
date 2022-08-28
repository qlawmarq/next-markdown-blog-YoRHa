import { BlogFrontmatter } from '@/types/blog'
import { bundleMDX } from 'mdx-bundler'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import getAllFiles from '../utils/getAllFiles'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeToc from '@jsdevtools/rehype-toc'

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

  if (source === undefined) {
    return {
      mdxSource: '',
      frontMatter: {
        draft: true,
        slug: slug,
      } as BlogFrontmatter,
    }
  }

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }

  const { frontmatter, code } = await bundleMDX({
    source: source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(process.cwd(), 'components'),
    mdxOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypeSlug,
        [
          rehypeToc,
          {
            headings: ['h2'],
            cssClasses: {
              toc: 'table-of-contents',
              link: 'page-link',
            },
          },
        ],
      ]
      return options
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.ts': 'tsx',
      }
      return options
    },
  })

  return {
    mdxSource: code,
    frontMatter: {
      ...frontmatter,
      slug: slug,
      date: frontmatter.date,
    } as BlogFrontmatter,
  }
}

export async function getAllFilesFrontMatter(folder: string) {
  const prefixPaths = path.join(root, contentsDir, folder)
  const files = getAllFiles(prefixPaths)
  const allFrontMatter = [] as BlogFrontmatter[]
  files.forEach((file: string) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    // Remove Unexpected File
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return
    }
    const source = fs.readFileSync(file, 'utf8')
    const matterResult = matter(source) as unknown as { data: BlogFrontmatter }
    allFrontMatter.push({
      ...matterResult.data,
      language: matterResult.data.language,
      title: matterResult.data.title,
      date: matterResult.data.date,
      tags: matterResult.data.tags,
      draft: matterResult.data.draft,
      description: matterResult.data.description,
      slug: formatSlug(fileName),
    })
  })
  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
