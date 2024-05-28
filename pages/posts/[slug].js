// pages/posts/[slug].js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export async function getStaticPaths() {
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => {
    return {
      params: {
        slug: filename.replace(/\.md$/, ''),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(postsDirectory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContents);

  return {
    props: {
      postData: {
        ...data,
        content,
      },
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <article>
        <h1>{postData.title}</h1>
        <div>{postData.date}</div>
        <div>{postData.author}</div>
        <ReactMarkdown>{postData.content}</ReactMarkdown>
      </article>
    </Layout>
  );
}
