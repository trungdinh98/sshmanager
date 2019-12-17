import axios from 'axios';

export const register = newUser => {
    return axios
    .post('users/register', {
        user_firstname: newUser.user_firstname,
        user_lastname: newUser.user_lastname,
        user_email: newUser.user_email,
        user_password: newUser.user_password
    })
    .then(res => {
        console.log("Registered!!!!");
    })
}

export const login = user => {
    return axios
    .post('users/login', {
        user_email: user.user_email,
        user_password: user.user_password
    })
    .then(res => {
        localStorage.setItem('usertoken', res.data);
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
