import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/users";

class UserService {

    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL, user);
    }

    getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    getUserByUsername(username){
        if(axios.get(USER_API_BASE_URL + '/login/' + username)===null) {
            alert("Username doesn't exist")
        } else {
            return axios.get(USER_API_BASE_URL + '/login/' + username)
        }

    }

    updateUser(user, userId){
        return axios.put(USER_API_BASE_URL + '/' + userId, user);
    }

    deleteUser(userId){
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }
}

export default new UserService()