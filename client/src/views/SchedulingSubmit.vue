§<template>
  <div id="backchangewhite">
    <div class="aaa">
      <table class="table1">
        <tr>
          <th id="title">{{this.scheduleName}}</th>
          <th class="th1">1:00</th>
          <th class="th1">2:00</th>
          <th class="th1">3:00</th>
          <th class="th1">4:00</th>
          <th class="th1">5:00</th>
          <th class="th1">6:00</th>
          <th class="th1">7:00</th>
          <th class="th1">8:00</th>
          <th class="th1">9:00</th>
          <th class="th1">10:00</th>
          <th class="th1">11:00</th>
          <th class="th1">12:00</th>
          <th class="th1">13:00</th>
          <th class="th1">14:00</th>
          <th class="th1">15:00</th>
          <th class="th1">16:00</th>
          <th class="th1">17:00</th>
          <th class="th1">18:00</th>
          <th class="th1">19:00</th>
          <th class="th1">20:00</th>
          <th class="th1">21:00</th>
          <th class="th1">22:00</th>
          <th class="th1">23:00</th>
          <th class="th1">24:00</th>
        </tr>
        <tr>
          <td class="td1">Monday</td>
          <td class="td1"
            v-for="cell in cells.monday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
            v-bind:style= "[cell.cellState === 1 ? {'backgroundColor': 'green'} : cell.cellState === 2 ? {'backgroundColor': 'red'} : {'backgroundColor': 'white'}]"
          >
        </td>
        </tr>
        <tr>
          <td class="td1">Tuesday</td>
          <td class="td1"
            v-for="cell in cells.tuesday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
            v-bind:style= "[cell.cellState === 1 ? {'backgroundColor': 'green'} : cell.cellState === 2 ? {'backgroundColor': 'red'} : {'backgroundColor': 'white'}]"
          >
        </td>
        </tr>
        <tr>
          <td class="td1">Wednesday</td>
          <td class="td1"
            v-for="cell in cells.wednesday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
            v-bind:style= "[cell.cellState === 1 ? {'backgroundColor': 'green'} : cell.cellState === 2 ? {'backgroundColor': 'red'} : {'backgroundColor': 'white'}]"
          >
        </td>
        </tr>
        <tr>
          <td class="td1">Thursday</td>
          <td class="td1"
            v-for="cell in cells.thursday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
            v-bind:style= "[cell.cellState === 1 ? {'backgroundColor': 'green'} : cell.cellState === 2 ? {'backgroundColor': 'red'} : {'backgroundColor': 'white'}]"
          >
        </td>
        </tr>
        <tr>
          <td class="td1">Friday</td>
          <td class="td1"
            v-for="cell in cells.friday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
            v-bind:style= "[cell.cellState === 1 ? {'backgroundColor': 'green'} : cell.cellState === 2 ? {'backgroundColor': 'red'} : {'backgroundColor': 'white'}]"
          >
        </td>
        </tr>
        <tr>
          <td class="td1">Saturday</td>
          <td class="td1"
            v-for="cell in cells.saturday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
            v-bind:style= "[cell.cellState === 1 ? {'backgroundColor': 'green'} : cell.cellState === 2 ? {'backgroundColor': 'red'} : {'backgroundColor': 'white'}]"
          >
        </td>
        </tr>
        <tr>
          <td class="td1">Sunday</td>
          <td class="td1"
            v-for="cell in cells.sunday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
            v-bind:style= "[cell.cellState === 1 ? {'backgroundColor': 'green'} : cell.cellState === 2 ? {'backgroundColor': 'red'} : {'backgroundColor': 'white'}]"
          >
        </td>
        </tr>
      </table>
    </div>
    <div>
      <br><input type="text" id="getNewSchedule" v-model="makeNewScheduleName" placeholder="new schedule name"/><br/>
      <button @click="handlePatch()" class="btnUser">Update Name</button>
      <button @click="returnToProfile()" class="btnUser">Return</button>
      <button @click="handlePut()" class="btnUser">Save Changes</button>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'schedulingSubmit',
  mounted() {
    console.log('hi') // testing purposes
    Api.get('/users/' + this.$route.params.userId + '/schedules/' + this.$route.params.scheduleName).then(response => {
      if (response.data === '') {
        this.useThisSchedule(this.$route.params.scheduleName)
      } else {
        this.cells = response.data.cells // this works but cells must be in at the object
        this.scheduleID = response.data._id
        this.scheduleName = response.data.scheduleName
        this.owner = response.data.owner
      }
    })
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.guestUsername = this.currentUser.username
  },
  data() {
    return {
      nameList: 'a', // test
      currentUser: {},
      scheduleID: 0,
      scheduleName: '',
      makeNewScheduleName: '',
      owner: '',
      cells: Object,
      // currentUser: Object,
      guestUsername: ''
    }
  },
  methods: {
    handleClick(event, cell) {
      // figure out which cell on the row you click
      const index = event.path[0].cellIndex
      // figure out what day <console.log('path---' + cell.day)>
      const currentCell = this.findDay(cell.day, index)
      // this.addStrings(currentCell)
      // change the color of the cell
      if (currentCell.cellState === 0) {
        // event.target.style.backgroundColor = 'green'
        currentCell.cellState = 1
      } else if (currentCell.cellState === 1) {
        // event.target.style.backgroundColor = 'red'
        currentCell.cellState = 2
      } else {
        // event.target.style.backgroundColor = 'white'
        currentCell.cellState = 0
      }
    },
    // addStrings(currentCell) { // this.addStrings(currentCell) // add to scope allow individual names //
    //   console.log(currentCell.string.length)
    //   let noMatch = true
    //   for (let i = 0; i < currentCell.string.length; i++) {
    //     const currentName = currentCell.string[i]
    //     console.log('hi1')
    //     if (currentName === this.guestUsername) {
    //       noMatch = false
    //     }
    //   }
    //   if (noMatch) {
    //     currentCell.string[currentCell.string.length] = this.guestUsername
    //     this.presentName(currentCell)
    //   }
    // },
    findDay(day, index) {
      let currentCell = {}
      index = index - 1 // it works
      if (day === 1) {
        currentCell = this.cells.monday.cellsRo[index]
      } else if (day === 2) {
        currentCell = this.cells.tuesday.cellsRo[index]
      } else if (day === 3) {
        currentCell = this.cells.wednesday.cellsRo[index]
      } else if (day === 4) {
        currentCell = this.cells.thursday.cellsRo[index]
      } else if (day === 5) {
        currentCell = this.cells.friday.cellsRo[index]
      } else if (day === 6) {
        currentCell = this.cells.saturday.cellsRo[index]
      } else if (day === 7) {
        currentCell = this.cells.sunday.cellsRo[index]
      }
      return currentCell
    },
    handlePatch() {
      Api.get('/schedules').then(response => {
        const arr = response.data.schedules
        for (let i = 0; i < arr.length; i++) {
          const element = arr[i].scheduleName
          console.log(this.makeNewScheduleName)
          console.log(element)
          if (this.makeNewScheduleName === element) {
            this.makeNewScheduleName = 'Already exist'
            break
          } else if (this.makeNewScheduleName === '') {
            this.makeNewScheduleName = 'Cannot be empty'
            break
          } else {
            if (this.guestUsername === this.owner) {
              this.cells.scheduleName = this.makeNewScheduleName // use an input instead
              // Api.patch('/schedules/' + this.scheduleID, this.cells)
              // this.$router.push('/SchedulingSubmit/' + this.$route.params.userId + '/schedules/' + this.cells.scheduleName)
              // this.$router.push('/profile')
            } else {
              this.makeNewScheduleName = 'You are not the owner'
            }
          }
        }
      })
    },
    handlePut() {
      console.log(this.scheduleID + ' test ID')
      Api.put('/schedules/' + this.scheduleID, {
        owner: this.owner,
        scheduleName: this.scheduleName,
        cells: this.cells
      }).then(console.log)
    },
    async useThisSchedule(scheduleName) {
      Api.get('/schedules').then(response => {
        const arr = response.data.schedules
        for (let i = 0; i < arr.length; i++) {
          const element = arr[i].scheduleName
          if (scheduleName === element) {
            const cellId = arr[i]._id
            console.log(cellId)
            Api.get('/schedules/' + cellId).then(resCell => {
              this.cells = resCell.data.cells
              this.scheduleID = resCell.data._id
              this.scheduleName = resCell.data.scheduleName
              this.owner = resCell.data.owner
            })
          }
        }
      })
    },
    returnToProfile() {
      this.$router.push('/profile')
    }
  }
}
</script>

<style>
.table1,
.th1,
.td1 {
  width: 20px;
  height: 20px;
  border: 2px solid black;
}
.table1 {
  width: 100%;
  height: 100%;
}
</style>
