const express = require('express');
const router = express.Router();
const Post = require('../database/models/post');
const User = require('../database/models/user')

router.get('/', (req, res,) => {
    console.log('===== Get post!!!======')
    Post.find({},{_id : 0},function(err,data){
        console.log('data: ', data);
        res.send(data)
    })
})

router.post('/ask', async(req, res,) => {
    console.log('===== ask!!======')
    const {question, username ,name} = req.body || {};
    if(!question || !username || !name){
        res.json({message : "Soemthing is not right", status : ""})
    }else {
        User.findOne({ username : username }, (err, currUser) => {
            const newPost = new Post({
                title: question,
                authorEmail : username,
                authorName : name,
                authorId : currUser._id
            })
            newPost.save((err, savedQuestion) => {
                if (err) return res.json(err)
                res.json(savedQuestion)
            })
        })
    }

})


module.exports = router