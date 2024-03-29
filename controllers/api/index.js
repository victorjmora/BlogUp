const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postsRoutes = require('./postRoutes');

router.use('/user', userRoutes);
router.use('/posts', postsRoutes);

module.exports = router;
