const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { BlogPosts } = require('./models');

BlogPosts.create('Article 1', 'This is the contents of article 1', 'Author 1', '01/01/2018');
BlogPosts.create('Article 2', 'This is the contents of article 2', 'Author 2', '02/02/2018');
BlogPosts.create('Article 3', 'This is the contents of article 3', 'Author 3', '03/03/2018');

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

// is it possible to use a helper function for params? or is it a hassle
// because of possibly returning from missing parameters?

router.post('/', jsonParser, (req, res) => {
  const requireFields = ['title', 'content', 'author', 'publishDate'];
  for(let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const post = BlogPosts.create(req.body.title, req.body.content. req.body.author, req.body.pusblishDate);
  req.status(201).json(post);
});

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.ID}\``);
  res.status(204).end();
});

// do we normally want to return the updated item as the response?

router.put('/:id', jsonParser, (req, res) => {
  const requireFields = ['title', 'content', 'author', 'publishDate'];
  for(let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  onsole.log(`Updating shopping list item \`${req.params.id}\``);
  const updatedPost = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).end();
});

module.exports = router;
