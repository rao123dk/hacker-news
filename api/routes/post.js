const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Post = require('../database/models/post');
const User = require('../database/models/user');

const {getUserInfo} = require('../service');

router.get('/', (req, res,) => {
    console.log('===== Get post!!!======')
    Post.find({},function(err,data){
        console.log('data: ', data);
        res.send(data)
    })
})

router.get('/:postId', (req, res,) => {
    console.log('===== Get post info!!!======')
    Post.find({ _id : req.params.postId},function(err,data){
        if(err) res.send(err);
        res.send(data);
    })
})


router.post('/ask', async(req, res,) => {
    console.log('===== ask!!======')
    const {question, username ,name} = req.body || {};
    if(!question || !username || !name){
        res.json({message : "Soemthing is not right", status : ""})
    }else {
        const  { _id } = await getUserInfo(username);
        const newPost = new Post({
            title: question,
            authorEmail : username,
            authorName : name,
            authorId : _id
        })
        newPost.save((err, savedQuestion) => {
            if (err) return res.json(err)
            res.json(savedQuestion)
        })
    }

})

router.post('/comment', async (req, res,) => {
    console.log('=====post a comment!!!======')
    console.log(req.body)
    const { postUserName, comment, postId, isParentComment = true, name } = req.body || {};
    console.log('postId: ', postId);
    const {_id} = await getUserInfo(postUserName);

    Post.findOne({_id : mongoose.Types.ObjectId(postId)}, function(err, item){
        console.log('item...................ggggggggggggg: ', item);

    })

    var curr =  {
        text : comment,
        postedBy : _id,
        name : name
    }

    if(isParentComment){
        Post.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(postId) },
            { $push: {
                comments: curr
                    }
            })
    }


    res.send("data")
})


module.exports = router