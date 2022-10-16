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
        <p>
          <a v-if="currentUser">{{ currentUser.username }}</a>
        </p>
        <p>
          <a v-if="currentUser" >{{ currentUser.name }}</a>
        </p>
        <p>
          <a v-if="currentUser">{{ currentUser.email }}</a>
        </p>
      </div>
      <div>
        <button class="btnUser" id="logoutbtn" @click="logout()">
          log out
        </button>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <table>
          <th>CREATE A SCHEDULE</th>
          <tr>
            <div>
              <div>
                <input
                  type="text"
                  id="scheduleName"
                  v-model="cells.scheduleName"
                  placeholder="Schedule Name"
                  required
                  unique
                />
              </div>
              <div v-if="invalidScheduleName">
                <h3 style="color: red">
                  Invalid schedule name! Name cannot be empty or a duplicate!
                </h3>
              </div>
            </div>
            <div>
              <button class="btnUser" @click="checkIfExists">
                Create Schedule
              </button>
            </div>
          </tr>
        </table>
      </div>
      <div class="middle">
        <table>
          <th>SELETECT A SCHEDULE</th>
          <tr>
            <div>
              <input
              type="text"
              v-model="selectScheduleName"
              placeholder="Schedule Name"
              required />
            </div>
            <button class="btnUser" @click="selectSchedule">
              select a schedule
            </button>
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
              v-model="deleteScheduleName"
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
      scheduleNameExists: false,
      pictureModal: false,
      deleteModal: false,
      invalidScheduleName: false,
      currentUser: {},
      deleteScheduleName: '',
      selectScheduleName: '',
      cells: {
        scheduleName: '',
        monday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: [],
            day: 1
          }))
        },
        tuesday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: [],
            day: 2
          }))
        },
        wednesday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: [],
            day: 3
          }))
        },
        thursday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: [],
            day: 4
          }))
        },
        friday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: [],
            day: 5
          }))
        },
        saturday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: [],
            day: 6
          }))
        },
        sunday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: [],
            day: 7
          }))
        }
      }
    }
  },
  mounted() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.cells.owner = this.currentUser.username
  },
  methods: {
    async createSchedule() {
      const res = await Api.post('users/' + this.currentUser._id + '/schedules', this.cells)
      if (res.status === 201) {
        const usersArr = await Api.get('/users')
        for (let i = 0; i < usersArr.data.users.length; i++) {
          if (usersArr.data.users[i].username === this.currentUser.username) {
            this.currentUser = usersArr.data.users[i]
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
            this.$router.push('/SchedulingSubmit/' + this.currentUser._id + '/schedules/' + this.cells.scheduleName)
          }
        }
        this.invalidScheduleName = false
      } else if (res.status === 500) {
        this.invalidScheduleName = true
      }
    },
    checkIfExists() {
      Api.get('/schedules').then(response => {
        const arr = response.data.schedules
        for (let i = 0; i < arr.length; i++) {
          const element = arr[i].scheduleName
          if (this.cells.scheduleName === element) {
            this.scheduleNameExists = true
          }
        }
        if (this.scheduleNameExists) {
          this.scheduleNameExists = false
        } else {
          this.scheduleNameExists = false
          this.createSchedule()
        }
      })
    },
    async selectSchedule() {
      Api.get('/schedules').then(response => {
        const arr = response.data.schedules
        for (let i = 0; i < arr.length; i++) {
          const element = arr[i].scheduleName
          if (this.selectScheduleName === element) {
            const cellId = arr[i]._id
            Api.get('/schedules/' + cellId).then(resCell => {
              this.cells = resCell.data
              this.$router.push('/SchedulingSubmit/' + this.currentUser._id + '/schedules/' + this.cells.scheduleName)
            }
            )
          }
        }
      })
    },
    async deleteSchedule() {
      Api.get('/schedules').then(response => {
        const arr = response.data.schedules
        for (let i = 0; i < arr.length; i++) {
          const element = arr[i].scheduleName
          if (this.deleteScheduleName === element) {
            const id = arr[i]._id
            Api.delete('/users/' + this.currentUser._id + '/schedules/' + id)
            // Api.delete('/schedules/' + id).then(console.log)
            this.deleteScheduleName = ''
            console.log(this.currentUser.schedule)
            break
          }
        }
      })
    },
    logout() {
      localStorage.removeItem('currentUser')
      this.$router.push('/')
    }
  }
}
</script>

<style>
input[type='text'],
input[type='scheduleName'] {
  width: 27%;
  margin: 5px 0 10px 0;
  display: inline-block;
  border: none;
}
</style>
