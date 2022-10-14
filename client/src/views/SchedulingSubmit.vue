<template>
  <div id="backchangewhite">
    <div class="aaa">
      <table class="table1">
        <tr>
          <th id="title">{{title}}</th>
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
      <div>
        <button @click="handleSubmet()">submit</button>
      <p></p>
      </div>
      <button @click="handlePatch()">Patch</button>
      <button @click="handleGetAll()">GetAll</button>
      <div>
        <br><input type="text" id="getNewSchedule" v-model="getNewSchedule" placeholder="schedule name"/><br/>
        <button @click="handleGetOne()">GetOne</button>
        <p></p>
      </div>
      <div>
        <button @click="returnToProfile()">return</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'schedulingSubmit',
  mounted() {
    console.log('hi')
    // Api.get('/schedules').then(response => {
    //   const arr = response.data.schedules
    //   for (let i = 0; i < arr.length; i++) {
    //     const element = arr[i].scheduleName
    //     if (this.$route.params.name === element) {
    //       const cellId = arr[i]._id
    //       Api.get('/schedules/' + cellId).then(resCell => {
    //         this.cells = resCell.data.cells
    //         console.log(resCell.data.cells)
    //         // location.reload()
    //         // this.$router.push('/SchedulingSubmit')
    //       }
    //       )
    //     }
    //   }
    // })
  },
  data() {
    return {
      getNewSchedule: '',
      cells: {
        owner: '',
        GuestName: 'jason',
        scheduleName: '',
        monday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: '',
            day: 1,
            color: null
          }))
        },
        tuesday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: '',
            day: 2
          }))
        },
        wednesday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: '',
            day: 3
          }))
        },
        thursday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: '',
            day: 4
          }))
        },
        friday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: '',
            day: 5
          }))
        },
        saturday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: '',
            day: 6
          }))
        },
        sunday: {
          cellsRo: Array.from({ length: 24 }, (_, i) => ({
            cellState: 0,
            id: i,
            string: '',
            day: 7
          }))
        }
      }
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
    colorChange() {
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
    async handleSubmet() {
      // this is one way of doing a async call
      console.log('click1', this.cells)
      const res = await Api.post('/schedules', this.cells)
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
      Api.patch('/schedules', this.cells)// ??
      console.log('click')
    },
    handleGetAll() {
      const response = Api.get('/schedules').then(res => {
        return res.data
      })
      console.log(response)
      // pending promise
    },
    async handleGetOne() {
      Api.get('/schedules').then(response => {
        const arr = response.data.schedules
        for (let i = 0; i < arr.length; i++) {
          const element = arr[i].scheduleName
          if (this.getNewSchedule === element) {
            const cellId = arr[i]._id
            Api.get('/schedules/' + cellId).then(resCell => {
              this.cells = resCell.data.cells
              console.log(resCell.data.cells)
              // location.reload()
              // this.$router.push('/SchedulingSubmit')
            })
          }
        }
      })
    },
    returnToProfile() {
      this.$router.push('/profile')
    }
  },
  computed: {
    title: function () {
      return this.cells.scheduleName
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
