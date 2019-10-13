const Post = require('./database/models/post');
const User = require('./database/models/user')

const getUserInfo = (username)=> {
   return User.findOne({ username : username }, (err, currUser) => {
        console.log('currUser:???? ', currUser);
        return currUser;
    })
}

module.exports = { getUserInfo }