<template>
  <div id="backchangewhite">
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
          <td>ss</td>
          <td type="button">1</td>
          <td >2</td>
          <td type="button" style="color: red;">3</td>
          <td>4</td>
          <td>5</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td><button></button></td>
          <td><button></button></td>
          <td><button style="color: red;"></button></td>
          <td class="red-box"></td>
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
      message: 'none',
      int: []
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
  button {
    width: 100%;
    height: 100%;
}
  .red-box {
  color: red;
  background-color: brown;
}
  .red-box {
  color: blue;
}
  .red-box {
  color: white;
}
</style>
