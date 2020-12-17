<template>

  <b-row style="margin: 1rem 3rem">

    <b-col sm="4">
      <label>{{label}}</label>
    </b-col>

    <b-col sm="8">
      <slot></slot>
    </b-col>

  </b-row>

</template>

<script>
export default {
  name: "jmv43-modal-input",
  props:{
    label:{
      type:String,
      default:"JMV43-MODAL-#槽位"
    }
  }
}
</script>

<style scoped>

</style>