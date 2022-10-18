<template>
  <div id="center">
    <h1 style="color:#FFCA3A;">New Account Registration</h1>
    <br>
    <div class="form-username">
      <h3 style="color:#98D2EB">Username</h3><br />
      <input id="username" type="text" class="form-control" v-model="user.username" placeholder="Enter Username" required /><br />
    </div>
    <br>
    <div class="form-password">
      <h3 style="color:#98D2EB">Password</h3><br />
      <input id="password" type="password" class="form-control" v-model="user.password" placeholder="Enter Password" required /><br />
    </div>
    <div>
      <h3 style="color:#98D2EB">Name</h3><br />
      <input id="name" type="text" class="form-control" v-model="user.name" placeholder="Enter name" required /><br />
    </div>
    <div>
      <h3 style="color:#98D2EB">Email</h3><br />
      <input id="email" type="text" class="form-control" v-model="user.email" placeholder="Enter email" required /><br />
    </div>
    <div id="buttonbox">
      <button @click="registerUser()" class="registerbtn">Create Account</button>
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
        password: '',
        name: '',
        email: ''
      }
    }
  },
  methods: {
    registerUser() {
      console.log(this.user.username)
      // console.log('click')
      // if (condition) { //stop duplicate usernames // in my stop accounts that already exist I think but still check
      // } else {
      // }
      Api.post('/users', this.user).then(console.log).then(resCell => {
        this.$router.push('/')
      })
    }
  }
}
</script>
<style>
input[type='text'],
input[type='username'] {
  width: 162px;
  margin: 5px 0 10px 0;
  display: inline-block;
  border: none;
}

input[type='text']:focus,
input[type='password']:focus {
  background-color: #ddd;
  outline: none;
}

input[type='text']:focus,
input[type='name']:focus {
  background-color: #ddd;
  outline: none;
}

input[type='text']:focus,
input[type='email']:focus {
  background-color: #ddd;
  outline: none;
}
</style>
