import Link from 'next/link';

export default function BlogList({ posts }) {
  return (
    <ul>
      {posts.map(({ id, title, summary }) => (
        <li key={id}>
          <Link href={`/posts/${id}`}>
            <a>
              <h2>{title}</h2>
              <p>{summary}</p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
