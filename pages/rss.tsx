import { GetServerSidePropsContext } from 'next';
import { getAllPosts } from '../lib/api'
import Post from '../types/post'
import RSS from 'rss';

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const xml = await generateFeedXml(); // フィードのXMLを生成する（後述）

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24時間キャッシュする
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;

const generateFeedXml = () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'content',
  ])
  const feed = new RSS({
    title: "Title",
    description: "Description",
    site_url: "Site URL",
    feed_url: "/rss",
    language: 'ja',
  });
  allPosts?.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      date: new Date(post.date),
      url: `https://yourblog/${post.slug}`,
    });
  })
  

  return feed.xml();
}
