<template>
  <div>
    <div class="left">
      <h1 style="color: white; font-size: max(4vw, 30px)">Profile</h1>
      <div>
        <img
          src="../images/ProfilePicture.png"
          alt="profile picture"
          class="image"
        />
      </div>
      <div>
        <button
          class="btnUser"
          id="updatebtn"
          onclick="location.href='/update'"
        >
          Update Profile
        </button>
      </div>
      <div class>
        <div>
          <label for="uname" class="label">Username: </label>
          <input
            type="userInfo"
            id="uname"
            class="userInfo"
            :value="this.currentUser.username"
            aria-label="username"
            readonly
          />
        </div>
        <div>
          <label for="name" class="label">Name: </label>
          <input
            type="userInfo"
            id="name"
            class="userInfo"
            :value="this.currentUser.name"
            readonly
          />
        </div>
        <div>
          <label for="email" class="label">Email: </label>
          <input
            type="userInfo"
            id="email"
            class="userInfo"
            :value="this.currentUser.email"
            readonly
          />
        </div>
      </div>
      <div>
        <button class="btnUser" id="logoutbtn" @click="logout()">
          Log Out
        </button>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <table class="userTable">
          <th class="userTableHeader">CREATE A SCHEDULE</th>
          <tr class="userTableRow">
            <div>
              <div>
                <input
                  type="SCH"
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
        <table class="userTable">
          <th class="userTableHeader">SELETECT A SCHEDULE</th>
          <tr class="userTableRow">
            <div>
              <input
              type="EXSCH"
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
        <table class="userTable">
          <th class="userTableHeader">DELETE A SCHEDULE</th>
          <tr class="userTableRow">
            <div>
              <input
              type="DELSCH"
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
  </div>
</template>
<script>
import { Api } from '../Api'
export default {
  data() {
    return {
      scheduleNameExists: false,
      invalidScheduleName: false,
      deleteScheduleName: '',
      selectScheduleName: '',
      currentUser: {
        name: '',
        username: '',
        email: '',
        password: ''
      },
      cells: {
        scheduleName: '',
        monday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: ['names:'],
            day: 1
          }))
        },
        tuesday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: ['names:'],
            day: 2
          }))
        },
        wednesday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: ['names:'],
            day: 3
          }))
        },
        thursday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: ['names:'],
            day: 4
          }))
        },
        friday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: ['names:'],
            day: 5
          }))
        },
        saturday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: ['names:'],
            day: 6
          }))
        },
        sunday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: ['names:'],
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
      if (this.cells.scheduleName === '') {
        this.cells.scheduleName = 'insert name'
      } else {
        const res = await Api.post(
          'users/' + this.currentUser._id + '/schedules',
          this.cells
        )
        if (res.status === 201) {
          const usersArr = await Api.get('/users')
          for (let i = 0; i < usersArr.data.users.length; i++) {
            if (usersArr.data.users[i].username === this.currentUser.username) {
              this.currentUser = usersArr.data.users[i]
              localStorage.setItem(
                'currentUser',
                JSON.stringify(this.currentUser)
              )
              this.$router.push(
                '/SchedulingSubmit/' +
                  this.currentUser._id +
                  '/schedules/' +
                  this.cells.scheduleName
              )
            }
          }
          this.invalidScheduleName = false
        } else if (res.status === 500) {
          this.invalidScheduleName = true
        }
      }
    },
    checkIfExists() {
      Api.get('/schedules').then((response) => {
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
      Api.get('/schedules').then((response) => {
        const arr = response.data.schedules
        for (let i = 0; i < arr.length; i++) {
          const element = arr[i].scheduleName
          console.log(element)
          if (this.selectScheduleName === element) {
            const cellId = arr[i]._id
            Api.get('/schedules/' + cellId).then((resCell) => {
              this.cells = resCell.data
              this.$router.push(
                '/SchedulingSubmit/' +
                  this.currentUser._id +
                  '/schedules/' +
                  this.cells.scheduleName
              )
            })
          } else {
            this.selectScheduleName = 'Schedule not found'
          }
        }
      })
    },
    async deleteSchedule() {
      Api.get('/schedules').then((response) => {
        const arr = response.data.schedules
        for (let i = 0; i < arr.length; i++) {
          const element = arr[i].scheduleName
          if (this.deleteScheduleName === element) {
            const id = arr[i]._id
            Api.delete('/users/' + this.currentUser._id + '/schedules/' + id)
            this.deleteScheduleName = ''
            console.log(this.currentUser.schedule)
            break
          } else {
            this.deleteScheduleName = 'No matching schedule'
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
input[type='SCH'],
input[type='DELSCH'],
input[type='EXSCH'] {
  width: 15%;
  min-width: 162px;
  margin: 5px 0 10px 0;
  display: inline-block;
  border: none;
}
input[type='userInfo'] {
  text-align: center;
  width: 27%;
  min-width: 100px;
  margin: 5px 0 10px 0;
  display: inline-block;
  border: none;
}
</style>
