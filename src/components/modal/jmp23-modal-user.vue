<template>

  <div>

    <span v-if="success">{{jmp23_modal_data.reqType}}</span>

  </div>

</template>

<script>
export default {

  name: "jmp23-modal-user",

  props:{
    jmp23_modal_data:Object,
    callback: Function,
  },



  watch: {

    jmp23_modal_data:{
      deep:true,
      immediate: true,

      handler (val) {
        this.modal_data = val;
        this.success = true;
      }

    }

  },


  data(){
    return{

      success:false,

      modal_data :{
        reqType:"insert",
        userId:null,
        username:null,
        password:null,
        mobile:null,
        email:null,
        status:1,
        role:5,
      }
    }
  }

}
</script>

<style scoped>

</style>