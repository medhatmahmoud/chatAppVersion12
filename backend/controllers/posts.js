const mongoose = require('mongoose')
const postSchema = require('../models/post');

exports.postCreate = (req, res, next) => {
    const post = new postSchema({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        imagePath: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename,
        creator: req.userTata.userId
    })
    post.save().then((dataa) => {
        res.json({
            message: 'post saved success',
            post: dataa
        })
    }).catch((err) => {
        res.status(500).json({
            message: 'Creating Post Faild',
        })
    })
}

exports.postsGet = (req, res) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.currentPage;
    const postQuery = postSchema.find();
    let feachedPosts;
    if (pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize)
    }
    postQuery.then((documents) => {
        feachedPosts = documents;
        return postSchema.countDocuments()
    }).then((dataa) => {
        res.json({
            message: 'posts gets',
            posts: feachedPosts,
            maxPosts: dataa,
        })
    }).catch((dataa) => {
        res.json({
            message: 'Get posts Faild',
            posts: dataa
        })
    })
}

exports.postGet = (req, res) => {
    postSchema.findById(req.params.ids).then((dataa) => {
        res.json({
            message: 'get single post',
            singlePostt: dataa
        })
    }).catch((dataa) => {
        res.status(500).json({
            message: 'get single post failuer',
            singlePostt: dataa
        })
    })
}

exports.postDelete = (req, res) => {
    postSchema.deleteOne({_id: req.params.id, creator: req.userTata.userId})
    .then((dataa) => {
        console.log(dataa);
        if(dataa.n > 0) {
            res.status(200).json({
                message: 'post deleted',
                deletedPost: dataa
            })
        } else {
            res.status(401).json({
                message: 'Delete Post Faild',
            })
        }
        
    }).catch((error) => {
        res.status(500).json({
            message: 'Delete Post Faild',
        })
    })
}

exports.postUpdate = (req, res) => {
    
    if(req.file) {
        imagePath = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;
    } else {
        imagePath = req.body.image
    }

    const updatedPost = new postSchema({
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
    })

    postSchema.updateOne({_id: req.body._id, creator: req.userTata.userId}, updatedPost)
    .then((dataa) => {
        if(dataa.n > 0) {
            res.json({
                message: 'post Updated',
                post: dataa
            })
        } else {
            res.status(401).json({
                message: 'post NOTT Updated',
                post: dataa
            })
        }
        
    }).catch((error) => {
        res.status(500).json({
            message: 'Post Update Faild',
        })
    })
}
