<template>
  <div>
    {{data.reqType}}
  </div>
</template>

<script>


export default {


  name: "jmp23-test",

  props:{
    req_data:Object
  },


  data(){
    return{
      data : this.req_data
    }
  }

}
</script>

<style scoped>

</style>