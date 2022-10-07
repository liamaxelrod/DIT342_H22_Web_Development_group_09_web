<template>
  <div>
    <div class="aaa">
      <table>
        <tr>
          <th></th>
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
            [{ state: 0 }, { state: 0 }, { state: 0 }, ...]
          -->
          <td>Monday</td>
          <td
            v-for="cell in cells.monday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
          ></td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td
            v-for="cell in cells.tuesday.cellsRo"
            :key="cell.id"
            :cell="cell"
            @click="handleClick($event, cell)"
          ></td>
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
      <button @click="handleSubmet()">submit</button>
      <button @click="handlePatch()">Patch</button>
      <button @click="handlePut()">put</button>
      <button @click="handleGitAll()">GitAll</button>
      <button @click="handleGitOne()">GitOne</button>
      <button @click="handleDelete()">delete</button>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'schedulingSubmit',
  data() {
    return {
      cells: {
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
    handleClick(event, cell) {
      // figure out which cell on the row you click
      const index = event.path[0].cellIndex
      // figure out what day <console.log('path---' + cell.day)>
      const currentCell = this.findDay(cell.day, index)
      // change the color of the cell
      if (currentCell.state === 0) {
        event.target.style.backgroundColor = 'green'
        currentCell.state = 1
      } else if (currentCell.state === 1) {
        event.target.style.backgroundColor = 'red'
        currentCell.state = 2
      } else {
        event.target.style.backgroundColor = 'white'
        currentCell.state = 0
      }
    },
    findDay(day, index) {
      let currentCell = {}
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
    handleSubmet() {
      Api.post('/schedules', this.cells)
      console.log('click')
    },
    handlePatch() {
      Api.patch('/schedules', this.cells)// ??
      console.log('click')
    },
    handlePut() {
      Api.put('/schedules', this.cells)// ??
      console.log('click')
    },
    handleGitAll() {
      Api.get('/schedules', this.cells)// ??
      console.log('click')
    },
    handleGitOne() {
      Api.git('/schedules', this.cells)// ??
      console.log('click')
    },
    handleDelete() {
      Api.delete('/schedules', this.cells)// ??
      console.log('click')
    }
  }
}
</script>

<style>
table,
th,
td {
  width: 20px;
  height: 20px;
  border: 2px solid black;
}
table {
  width: 100%;
  height: 100%;
}
</style>
