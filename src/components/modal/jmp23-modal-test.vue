<template>

  <div>
    {{modal_data.reqType}}
  </div>

</template>

<script>
export default {

  name: "jmp23-modal-user",

  props:{
    modal_data:Object
  },

  watch:{


    modal_data:{

      deep:true,

      handler(val){
        console.log(val);
      }

    }

  }


}


</script>

<style scoped>

</style>