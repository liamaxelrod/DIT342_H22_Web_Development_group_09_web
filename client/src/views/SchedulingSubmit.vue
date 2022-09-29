<template>
  <div>
    <div id='table'>
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
          <td>1</td>
          <td type="button" class="buttons"></td>
          <td></td>
          <td>qqq</td>
          <td>qqqqq</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
    <div>
      <button>submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedulingSubmit',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    changeColor() {

    }
  }
}
</script>

<style>
  table, th, td {
  border:2px solid black;
}
  .buttons {
  display:inline-block;
  width: 100%;
  min-width: 99%;
  min-height: 99%;
  height: 100%;
}
  table_box_busy {
  color: red;
}
  table_box_available {
  color: blue;
}
  table_box_undecided {
  color: white;
}
</style>
