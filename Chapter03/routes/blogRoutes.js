const express = require('express');
const blogController = require('../controllers/blogController')


const router = express.Router();

// Homepages
router.get('/', blogController.blog_index);

// create blog : Data를 데이터베이스에 post 방식으로 넣기 
router.post('/', blogController.blog_create_post);

// blogs/:id 밑에 있으면 create를 id로 인식해서 hang 걸림 
router.get('/create', blogController.blog_create_get);

// id에 맞는 blog 내용 가져오기 
router.get('/:id', blogController.blog_details);

// blog 삭제 
router.delete('/:id', blogController.blog_delete);

module.exports = router;