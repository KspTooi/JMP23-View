<template>

  <b-card style="margin: 1rem 1rem 10rem 1rem" bg-variant="light">


    <slot name="area-modal"/>


    <template v-slot:header>
      <h6 class="mb-0">{{title}}</h6>
    </template>


    <b-card-body class="overflow-auto">

      <b-card title="操作">
        <hr>
        <b-card-body>

          <slot name="area-table-head"/>

        </b-card-body>

      </b-card>




      <slot name="area-table"/>


    </b-card-body>




  </b-card>



</template>

<script>
export default {

  name: "jmp23-center-card",

  props:{
    title:Object
  }

}
</script>

<style scoped>

</style>