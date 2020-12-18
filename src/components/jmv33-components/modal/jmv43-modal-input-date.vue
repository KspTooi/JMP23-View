<template>

  <jmv43-modal-slot :label="label">

    <b-form-input size="sm" v-model="inputValue" type="date" required></b-form-input>

  </jmv43-modal-slot>

</template>

<script>
export default {

  name: "jmv43-modal-input",

  props:{
    value:"",
    label:{
      type:String,
      default:"JMV43-MODAL-#槽位"
    }
  },

  data(){
    return{
      inputValue:this.value
    }
  },

  watch:{

    inputValue:{
      handler(val){
        this.$emit("input",val);
      }
    }

  }

}


</script>

<style scoped>

</style>