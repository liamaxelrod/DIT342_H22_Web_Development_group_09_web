<template>
  <div v-if="show" class="modalBg">
    <div class="center-modal">
      <div class="modalBox">
        <div id="slots">
          <slot name="slot1" class="header"></slot>
          <slot name="slot2" class="top"></slot>
          <slot name="slot3" class="mid"> </slot>
          <slot name="slot4" class="bottom">
            <button id="cancelbtn" @click="$emit('cancel')">CANCEL</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
}
</script>

<style>
.modalBg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}
.center-modal {
  display: table-cell;
  vertical-align: middle;
}
.modalBox {
  width: 40vw;
  margin: 0px auto;
  padding: 20px;
  background-color: white;
  border-radius: 2px;
}
#removebtn {
  height: 40px;
  background-color: rgb(100, 0, 0);
  color: rgb(225, 225, 225);
  margin-bottom: 10px;
}
#removebtn:hover {
  background-color: rgb(200, 0, 0);
}
#cancelbtn {
  margin-top: 5px;
  height: 40px;
  background-color: rgb(0, 0, 75);
  color: rgb(225, 225, 225);
}
#cancelbtn:hover {
  background-color: rgb(0, 0, 125);
}
#uploadbtn {
  width: 100%;
  height: 40px;
  color: rgb(225, 225, 225);
  background-color: rgb(0, 75, 0);
  cursor: pointer;
  display: inline-block;
  padding: 7px;
}
#uploadbtn:hover {
  background-color: rgb(0, 125, 0);
}
#slots {
  margin: 5px;
}
</style>
