import { remark } from 'remark';
import html from 'remark-html';

export default function BlogPost({ post }) {
  const { title, date, author, content } = post;

  const processedContent = remark().use(html).processSync(content).toString();

  return (
    <article>
      <h1>{title}</h1>
      <p>{date} by {author}</p>
      <div dangerouslySetInnerHTML={{ __html: processedContent }} />
    </article>
  );
}
