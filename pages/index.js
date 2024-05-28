import { useState } from 'react';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import styles from '../styles/Home.module.css';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function HomePage({ allPostsData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(allPostsData.slice(0, 5));
  const [newPost, setNewPost] = useState({ title: '', date: '', author: '', summary: '', content: '' });

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredPosts(
      allPostsData.filter((post) =>
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query)
      ).slice(0, 5)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/create-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      alert('New post created successfully!');
      setNewPost({ title: '', date: '', author: '', summary: '', content: '' });
      window.location.reload(); // Refresh the page to see the new post
    } else {
      alert('Failed to create new post.');
    }
  };

  const handleDeletePost = async (id) => {
    const response = await fetch(`/api/delete-post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      alert('Post deleted successfully!');
      window.location.reload(); // Refresh the page to see the updated list of posts
    } else {
      alert('Failed to delete post.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Blog Posts</h1>
      <input
        type="text"
        placeholder="Search posts"
        value={searchQuery}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      <div className={styles.grid}>
        {filteredPosts.map(({ id, date, title, summary }) => (
          <div key={id} className={styles.card}>
            <Link href={`/posts/${id}`} legacyBehavior>
              <a>
                <h2>{title}</h2>
                <p>{summary}</p>
                <small>{date}</small>
              </a>
            </Link>
            <br></br>
            <button onClick={() => handleDeletePost(id)} className={styles.deleteButton}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <h2>Create a New Blog Post</h2>
      <form onSubmit={handleNewPostSubmit} className={styles.newPostForm}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={newPost.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newPost.author}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="summary"
          placeholder="Summary"
          value={newPost.summary}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={newPost.content}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
