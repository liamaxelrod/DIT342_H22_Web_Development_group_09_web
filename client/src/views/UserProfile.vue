<template>
  <div>
    <div class="left">
      <h1>Profile</h1>
      <div>
        <img
          src="../images/ProfilePicture.png"
          alt="profile picture"
          class="image"
          @click="pictureModal = true"
        />
      </div>
      <div>
        <button class="btnUser" onclick="location.href='/update'">
          Update Profile
        </button>
      </div>
      <div class>
        <p>Username</p>
        <p>Name</p>
        <p>Email</p>
      </div>
      <div>
        <button class="btnUser" id="logoutbtn">log out</button>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <table>
          <th>CREATE A SCHEDULE</th>
          <tr>
            <div>
              <input
                type="text"
                id="name"
                v-model="schedule.name"
                placeholder="Schedule Name"
                required
                unique
              />
            </div>
            <div>
              <button class="btnUser" @click="createSchedule()">
                Create Schedule
              </button>
            </div>
          </tr>
        </table>
      </div>
      <div class="bottom">
        <table>
          <th>DELETE A SCHEDULE</th>
          <tr>
            <div>
              <input type="text" placeholder="Schedule Name" required />
            </div>
            <button @click="deleteModal" class="btnUser">
              Delete Schedule
            </button>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <modal :show="pictureModal" @cancel="pictureModal = false">
        <template #slot1>
          <h3 style="font-weight: bold">Change your profile photo</h3>
        </template>
        <template #slot2>
          <input type="file" id="upload" hidden />
          <label for="upload" id="uploadbtn">UPLOAD PHOTO</label>
        </template>
        <template #slot3>
          <button id="removebtn">REMOVE PHOTO</button>
        </template>
        <template #slot4> </template>
      </modal>
    </div>
    <div>
      <modal :show="deleteModal" @cancel="deleteModal = false">
        <template #slot1>
          <h4>Are your sure you want to delete this Schedule?</h4></template
        >
        <template #slot3> <button id="uploadbtn">Confirm</button></template>
      </modal>
    </div>
  </div>
</template>

<script>
import { Api } from '../Api'
import Modal from './Modal.vue'
export default {
  name: 'UserProfile',
  components: {
    Modal
  },
  data() {
    return {
      pictureModal: false,
      deleteModal: false,
      schedule: {
        name: ''
      }
    }
  },
  methods: {
    async createSchedule() {
      const res = await Api.post('/schedules', {
        name: this.schedule.name
      })
      if (res.status === 201) {
        this.$router.push('/SchedulingSubmit')
      } else if (res.status === 400) {
        alert('Schedule name already exists')
      }
    }
    /*
    async deleteSchedule() {
      console.log(this.name)
      console.log('click')
      const res = await Api.delete('/schedules/:name', {
        name: this.schedule.name
      })
      if (res.status === 201) {
        this.$router.push('/UserProfile')
      }
    } */
  }
}
</script>

<style>
input[type='text'],
input[type='name'] {
  width: 27%;
  margin: 5px 0 10px 0;
  display: inline-block;
  border: none;
}
</style>
