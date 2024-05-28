import { useState } from 'react';
import styles from '../styles/Create.module.css';

const CreatePostForm = () => {
  const [newPost, setNewPost] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add your logic to handle post creation here
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" className={styles.submitButton}>Create Post</button>
    </form>
  );
};

export default CreatePostForm;
