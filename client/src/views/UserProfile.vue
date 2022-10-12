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
                v-model="cells.scheduleName"
                placeholder="Schedule name"
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
              <input
              type="text"
              v-model="cells.scheduleName"
              placeholder="Schedule Name"
              required />
            </div>
            <button class="btnUser" @click="deleteSchedule">
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
      },
      cells: {
        owner: '',
        scheduleName: '',
        monday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            state: 0,
            id: i,
            string: '',
            day: 1
          }))
        },
        tuesday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            state: 0,
            id: i,
            string: '',
            day: 2
          }))
        },
        wednesday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            state: 0,
            id: i,
            string: '',
            day: 3
          }))
        },
        thursday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            state: 0,
            id: i,
            string: '',
            day: 4
          }))
        },
        friday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            state: 0,
            id: i,
            string: '',
            day: 5
          }))
        },
        saturday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            state: 0,
            id: i,
            string: '',
            day: 6
          }))
        },
        sunday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            state: 0,
            id: i,
            string: '',
            day: 7
          }))
        }
      }
    }
  },
  methods: {
    async createSchedule() {
      const res = await Api.post('/schedules', this.cells)
      console.log(res.data)
      if (res.status === 201) {
        this.$router.push('/SchedulingSubmit')
      } else if (res.status === 400) {
        alert('Schedule scheduleName already exists')
      }
    },
    async deleteSchedule() {
      Api.get('/schedules').then(response => {
        const arr = response.data.schedules
        for (let i = 0; i < arr.length; i++) {
          const element = arr[i].scheduleName
          if (this.cells.scheduleName === element) {
            const id = arr[i]._id
            console.log(id)
            Api.delete('/schedules/' + id).then(console.log)
          }
        }
      })
    }
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
