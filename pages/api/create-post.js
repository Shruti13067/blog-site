import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { title, date, author, summary, content } = req.body;
    const slug = title.toLowerCase().replace(/ /g, '-');
    const newPostPath = path.join(process.cwd(), 'content/posts', `${slug}.md`);

    const newPostContent = matter.stringify(content, {
      title,
      date,
      author,
      summary,
    });

    fs.writeFileSync(newPostPath, newPostContent);
    res.status(201).json({ message: 'Post created successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
