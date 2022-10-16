§<template>
  <div id="backchangewhite">
    <div class="aaa">
      <table class="table1">
        <tr>
          <th id="title">{{this.scheduleName}}</th>
          <th>1:00</th>
          <th>2:00</th>
          <th>3:00</th>
          <th>4:00</th>
          <th>5:00</th>
          <th>6:00</th>
          <th>7:00</th>
          <th>8:00</th>
          <th>9:00</th>
          <th>10:00</th>
          <th>11:00</th>
          <th>12:00</th>
          <th>13:00</th>
          <th>14:00</th>
          <th>15:00</th>
          <th>16:00</th>
          <th>17:00</th>
          <th>18:00</th>
          <th>19:00</th>
          <th>20:00</th>
          <th>21:00</th>
          <th>22:00</th>
          <th>23:00</th>
          <th>24:00</th>
        </tr>
        <tr>
          <!-- loop through cells and create a TableCell for each -->
          <!--
             0, 1, 2, ...
            [{ cellState: 0 }, { cellState: 0 }, { cellState: 0 }, ...]
          -->
          <td>Monday</td>
          <td
            v-for="cell in cells.monday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
            v-bind:style= "[cell.cellState === 1 ? {'backgroundColor': 'green'} : cell.cellState === 2 ? {'backgroundColor': 'red'} : {'backgroundColor': 'white'}]"
          >{{cell.cellState}} {{cell.string}}
        </td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td
            v-for="cell in cells.tuesday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
            v-bind:style= "[cell.cellState === 1 ? {'backgroundColor': 'green'} : cell.cellState === 2 ? {'backgroundColor': 'red'} : {'backgroundColor': 'white'}]"
          >{{cell.cellState}}
        </td>
        </tr>
        <tr>
          <td>Wednesday</td>
          <td
            v-for="cell in cells.wednesday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
          ></td>
        </tr>
        <tr>
          <td>Thursday</td>
          <td
            v-for="cell in cells.thursday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
          ></td>
        </tr>
        <tr>
          <td>Friday</td>
          <td
            v-for="cell in cells.friday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
          ></td>
        </tr>
        <tr>
          <td>Saturday</td>
          <td
            v-for="cell in cells.saturday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
          ></td>
        </tr>
        <tr>
          <td>Sunday</td>
          <td
            v-for="cell in cells.sunday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
          ></td>
        </tr>
      </table>
    </div>
    <div>
      <button @click="handlePatch()">Patch</button>
      <button @click="returnToProfile()">return</button>
      <button @click="handlePut()">Put</button>
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
        // Api.get('/users/' + this.$route.params.userId).then(resCell => {
        //   console.log(resCell + 'aaaaa')
        // }).catch(r => console.log('error' + r))
      } else {
        this.cells = response.data.cells // this works but cells must be in at the object
        this.scheduleID = response.data._id
        this.scheduleName = response.data.scheduleName
        this.owner = response.data.owner
        console.log(response.data.scheduleName)
        console.log(this.scheduleName)
      }
    })
    // console.log(this.cells)so then
    // console.log(this.scheduleName)
    // console.log(this.$route.params.userId + ' <end>')
  },
  data() {
    return {
      scheduleID: 0,
      scheduleName: '',
      owner: '',
      cells: Object,
      // currentUser: Object,
      guestName: ''
    }
  },
  methods: {
    handleClick(event, cell) {
      // figure out which cell on the row you click
      const index = event.path[0].cellIndex
      // figure out what day <console.log('path---' + cell.day)>
      const currentCell = this.findDay(cell.day, index)
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
    addStrings(currentCell) { // this.addStrings(currentCell)
      currentCell.string[currentCell.string.length] = this.guestName
    },
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
    async handleSubmet() { // delete later
      // this is one way of doing a async call
      console.log('click1', this.cells)
      const res = await Api.post('/schedules', this.data)
      console.log(res.data)
      console.log('click2')
      // this is the exact same way but syntactic sugar
      // Api.post('/schedules', this.cells).then(res => {
      //   console.log(res.data)
      // }).catch(err => {
      //   console.log(err)
      // })
      // this is how you get all the schedules
      // console.log('click')
    },
    handlePatch() {
      console.log(this.scheduleID + ' test ID')
      console.log(this.cells)
      this.cells.scheduleName = '2git ' // use an input instead
      Api.patch('/schedules/' + this.scheduleID, this.cells).then(console.log)
      this.$router.push('/SchedulingSubmit/' + this.$route.params.userId + '/schedules/' + this.cells.scheduleName)
      location.reload()
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
              this.scheduleName = resCell.data.scheduleName // test liam
              this.owner = resCell.data.owner
              console.log(this.scheduleID)
              console.log(this.scheduleName)
              console.log(this.owner)
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
th,
td {
  width: 20px;
  height: 20px;
  border: 2px solid black;
}
.table1 {
  width: 100%;
  height: 100%;
}
</style>
