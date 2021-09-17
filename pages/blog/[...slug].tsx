import PageTitle from '@/components/PageTitle'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { BlogSEO } from '@/components/SEO'
import { siteMetadata } from '@/data/siteMetadata'

export async function getStaticPaths() {
  const posts = getFiles('blog')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}
export const getStaticProps = async ({ params }) => {
  const allPosts = await getAllFilesFrontMatter('blog')
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join('/'))
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const post = await getFileBySlug('blog', params.slug?.join('/'))

  return { props: { post, prev, next } }
}

export default function Blog({ post, prev, next }) {
  const { mdxSource, frontMatter } = post
  return (
    <>
      {frontMatter.draft !== true ? (
        <>
          <BlogSEO url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
          <MDXLayoutRenderer
            mdxSource={mdxSource}
            frontMatter={frontMatter}
            prev={prev}
            next={next}
          />
        </>
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
