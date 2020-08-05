
import { getAllPosts } from '../lib/api'
import Post from '../types/post'

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  return `
    <?xml version="1.0"?>
        <rss version="2.0">
        <channel>
        <title>データフィードの名前</title>
        <link>http://www.example.com</link>
        <description>商品の説明</description>
        ${ allPosts.map(element => {
            return `
            <item> 
                <title>${element.title}</title>
                <link>${element.slug}</link>
                <description>${element.content}</description>
            </item>`
        })}
        </channel>
        </rss>`;
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'content',
  ])

  return {
    props: { allPosts },
  }
}
