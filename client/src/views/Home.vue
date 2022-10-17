<template>
  <div id="center">
  <h1 style="color:#FFCA3A;">Welcome to Quick Scheduling</h1>
  <br>
  <div class="form-username">
          <h3 style="color:#98D2EB" id="username">Username</h3><br />
          <input type="text" class="form-control" v-model="username" placeholder="Enter Username" required/><br />
        </div>
  <br>
  <div class="form-password">
          <h3 style="color:#98D2EB" id="password">Password</h3><br />
          <input type="password" class="form-control" v-model="password" placeholder="Enter Password" required/><br />
        <!-- if incorrect password let the user know that the password is incorrect -->
        <div v-if="incorrectPassword">
          <h3 style="color:#FFCA3A">Incorrect Password</h3>
        </div>
        </div>
        <div id="buttonbox">
        <button onclick="location.href='/forgotpassword'" class="registerbtn">Forgot Password</button>
        <button onclick="location.href='/register'" class="registerbtn">Register</button>
        <button @click="login(username, password)" class="registerbtn">Log in</button>
        </div>
      </div>
  </template>
<script>
import { Api } from '../Api'
export default {
  name: 'Register',
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      incorrectPassword: false
    }
  },
  methods: {
    getUser() {
      console.log(this.username)
      console.log('click')
      Api.get('/users', this.user)
      console.log(this.username)
    },
    login(u, p) {
      // prints args
      console.log('username: ' + u, 'password: ' + p)
      // check the database for the username
      // if the username is found, check the password
      // if the password is correct, log in
      Api.get('/users').then(r => {
        // search r.data.users for the username
        const arr = r.data.users
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].username === u) {
            // username found
            if (arr[i].password === p) {
              // password correct
              console.log('login successful')
              localStorage.setItem('currentUser', JSON.stringify(arr[i]))
              // redirect to profile page
              this.$router.push('/profile')
            } else {
              this.incorrectPassword = true
              // password incorrect
              console.log('password incorrect')
            }
          } else {
            // username not found
            console.log('username not found')
          }
        }
      })
    }
  }
}
</script>
<div class="backgroundx"></div>
<style>
  input[type='text'],
  input[type='password'] {
    width: 27%;
    margin: 5px 0 10px 0;
    display: inline-block;
    border: none;
  }
  input[type='text']:focus,
  input[type='password']:focus {
    background-color: #ddd;
    outline: none;
  }
</style>
