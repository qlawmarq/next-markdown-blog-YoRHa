import { GetStaticProps } from 'next'
import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import { siteMetadata } from '@/data/siteMetadata'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'

export const getStaticProps: GetStaticProps = async () => {
  const tags = await getAllTags('blog')
  return { props: { tags } }
}

export default function Tags({ tags }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSEO title={`${siteMetadata.title} - Tags`} description="Things I blog about" />
      <div>
        <div>
          <h1>Tags</h1>
        </div>
        <div>
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t}>
                <Tag text={t} />
                <Link href={`/tags/${kebabCase(t)}`}>{` (${tags[t]})`}</Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
