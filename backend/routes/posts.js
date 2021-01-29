const express = require('express');
const Post = require('../model/post');
const multer = require('multer');

const MIME_TYPE_MAP = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name = '-' + Date.now() + '.' + ext);
    }
});
const router = express.Router();
router.post("", (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/'
    });
    post.save();
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully',
        post: post
    });
});



router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        res.status(200).json({ message: "Succsess" });
    });
});

router.get("", (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQueary = Post.find();
    if (pageSize && currentPage) {
        postQueary.skip(pagSize * (currentPage - 1))
            .limit(pageSize);
    }
    postQueary.then((documents) => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: documents
        });
    });

});


router.delete("/:id", (req, res, next) => {
    console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id }).then((result) => {
        console.log(result);
        res.status(200).json({ message: 'Post delete!' });

    });
})

module.exports = router;