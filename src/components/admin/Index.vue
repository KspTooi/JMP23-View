<template>

  <div>

    <h1>首页内容</h1>

    <b-table striped hover :items="item"></b-table>

    <b-button @click="pushTable" variant="danger">PUSH</b-button>

  </div>


</template>

<script>
export default {

  name: "Index"

  ,data(){
    return{

      item:[
        {
          name:"KspTooi"
          ,phone:"123456"
        }
      ]

    }
  }

  ,methods:{

    foo () {
      console.log(this) // Vue instance
    }

  }

}
</script>

<style scoped>

</style>