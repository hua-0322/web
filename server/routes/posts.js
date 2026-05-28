const express = require('express');
const router = express.Router();

class Post {
  constructor(data) {
    this.title = data.title;
    this.author = data.author;
  }
  async save() {
    return this;
  }
}

router.post('/', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();

    const io = req.app.get('io');
    io.emit('new_post_alert', {
      title: newPost.title,
      author: newPost.author
    });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;