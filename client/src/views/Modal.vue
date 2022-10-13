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
