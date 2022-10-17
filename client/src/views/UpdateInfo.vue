<template>
  <div id="backchangewhite">
    <div>
      <div><h1>Update Profile</h1></div>
      <div>
        <img
          src="../images/ProfilePicture.png"
          alt="Profile Picture"
          class="image"
        />
      </div>
      <div>
        <div>
          <label for="newName" >New name: </label>
          <input
            id="newInfo"
            class="newName"
            type="text"
            v-model="user.name"
            placeholder="enter your new name"
          />
        </div>
        <div>
          <label for="newEmail" >New Email: </label>
          <input
            id="newInfo"
            class="newEmail"
            type="text"
            v-model="user.email"
            placeholder="enter your new email"
          />
        </div>
        <div>
          <label for="newPassord">New password:</label>
          <input
            id="newInfo"
            type="text"
            class="newPassword"
            v-model="user.password"
            placeholder="enter your new password"
          />
        </div>
      </div>
      <div>
        <button class="btnUser" @click="updateAll()">Update</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Api } from '../Api'

export default {
  name: 'UpdateInfo',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  mounted() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  },
  methods: {
    updateAll() {
      Api.put('/users/' + this.currentUser._id, {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
      Api.get('/users/' + this.currentUser._id).then((res) => {
        console.log(res)
        localStorage.setItem('currentUser', JSON.stringify(res.data.user))
      })
      localStorage.removeItem('currentUser')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.image {
  width: 10vw;
  border-radius: 50%;
  margin: 10px;
  border: 1px solid black;
}
h1 {
  font-size: 4vw;
  color: black;
}
p {
  color: black;
  font-size: 2vw;
  margin: 2vw 2vw;
}
</style>
