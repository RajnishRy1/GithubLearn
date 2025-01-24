//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;
const commentsPath = path.join(__dirname, 'comments.json');
const comments = require(commentsPath);
const { v4: uuidv4 } = require('uuid');



app.use(bodyParser.json());


app.get('/comments', (req, res) => {
  res.json(comments);
});                     



app.post('/comments', (req, res) => {                                                                  
  const newComment = req.body;
  newComment.id = uuidv4();
  comments.push(newComment);
  fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
    if (err) {
      res.status(500).send('Unable to save comment');
    } else {
      res.status(201).send(newComment);
    }
  });
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    }   
);