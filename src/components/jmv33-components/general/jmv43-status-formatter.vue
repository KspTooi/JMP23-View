<template>

  <div>


    <span v-for="(val1, key, index) of condition" v-if="key==value">

      <span v-if="btn==null">
        {{val1}}
      </span>

      <span v-if="btn!==null && key==value" v-for="(val2, key, index) of btn">
        <b-btn size="sm" :variant="val2">{{val1}}</b-btn>
      </span>

    </span>

  </div>

</template>

<script>
export default {

  name: "jmv43-status-formatter",

  props:{

    value:{
      type:null,
      default:"0",
    },

    condition:{
      type:Object,
      default:()=>{
        return{
          0:"正常",
          1:"异常"
        }
      }
    },
    btn:{
      type:Object,
      default:null
    }
  }


}
</script>

<style scoped>

</style>