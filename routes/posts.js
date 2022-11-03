import express from 'express';
import { getPost, getPosts, getPostsSearch, createPosts, deletePosts, updatePosts } from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const router = express.Router();
router.get('/', getPosts)
router.get('/search', getPostsSearch)

router.get('/:id', getPost)

router.post('/', auth, createPosts)
router.patch('/:id', auth, updatePosts)
router.delete('/:id', auth, deletePosts)

export default router;