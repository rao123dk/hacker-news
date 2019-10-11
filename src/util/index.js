function setUserToLocal(key,data){
    return localStorage.setItem(key, JSON.stringify(data));
}

function getUserFromLocal(key){
    return JSON.parse(localStorage.getItem(key))
}

function removeFromLocal(){

}




export default {setUserToLocal, getUserFromLocal, removeFromLocal}