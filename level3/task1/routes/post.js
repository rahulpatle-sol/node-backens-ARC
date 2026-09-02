

import express from 'express';
import Post from '../models/Post.js';


const   router = express.Router();


router.post('/posts', async (req, res,next) => {
  try {
    const { title, content, author } = req.body;
    const post = new Post({ title, content, author });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error); // Pass the error to the next middleware
  } });

  //  get all posts

  router.get('/posts', async (req, res,next) => {

 try{
    const posts=await  Post.find().populate('author','name email');
    res.status(200).json(posts);
  } catch (error) { 
    res.status(400).json({ message: error.message });
    next(error); // Pass the error to the next middleware
  
 }




  });//


  //  get  post  by  id 


router.get('/posts/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name email');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post); // ← ye missing tha
    } catch (error) {
        next(error);
    }
});


//  find post by  author id
router.get('/posts/user/:userId', async (req, res, next) => {
    try {
        const posts = await Post.find({ author: req.params.userId })
            .populate('author', 'name email');
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

  export default router;