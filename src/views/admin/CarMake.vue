<template>

  <jmp23-center-card>



    <template v-slot:area-table-head >

      <jmp23-table-head insert-btn-text="添加品牌" placeholder="按品牌名搜索" @onFilterChange="onFilterChange"/>

    </template>


    <template v-slot:area-table>

      <jmv33-table-general :jmv33_table_data="table_data">
        
      </jmv33-table-general>

    </template>


  </jmp23-center-card>


</template>

<script>
export default {

  name: "brandManager",

  data(){
    return{
      table_data:{

        url: this.$rts.list_make
        ,fields: this.$tf.fields_car_make

        //暴露参数(过滤器)
        ,filters:{
          filter: "",
          filterOn: "brandName",
        }

      },

      modal_data:{

      }
    }
  },

  methods:{

    onFilterChange(val){
      this.table_data.filters.filter = val;
    },

  }


}
</script>

<style scoped>

</style>