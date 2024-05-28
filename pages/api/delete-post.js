// pages/api/delete-post.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.body;
    const filePath = path.join(process.cwd(), 'content/posts', `${id}.md`);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete post' });
        return;
      }

      res.status(200).json({ message: 'Post deleted successfully' });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
