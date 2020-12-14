<template>


  <jmp23-center-card title="标签管理">



    <template v-slot:area-modal>

      <jmv33-modal></jmv33-modal>

    </template>


    <template v-slot:area-table-head>

      <jmp23-table-head insert-btn-text="添加标签" placeholder="按标签名搜索" @onFilterChange="onFilterChange" @onInsert="onInsert"/>

    </template>


    <template v-slot:area-table>

      <jmv33-table-general :jmv33_table_data="table_data" @onUpdate="onUpdate" @onRemove="onRemove">

        <template v-slot:cell(type)="data">
          <span v-if="data.item.type === 0">系统标签</span>
          <span v-if="data.item.type === 1">用户标签</span>
        </template>

        <template v-slot:cell(createTime)="data">
          <span v-if="data.item.createTime === null"><b-btn variant="success" size="sm">暂无数据</b-btn></span>
          <span v-if="data.item.createTime !== null">{{data.item.createTime}}</span>
        </template>

        <template v-slot:cell(lastUpdateTime)="data">
          <span v-if="data.item.lastUpdateTime === null"><b-btn variant="success" size="sm">暂无数据</b-btn></span>
          <span v-if="data.item.lastUpdateTime !== null">{{data.item.lastUpdateTime}}</span>
        </template>

      </jmv33-table-general>

    </template>


  </jmp23-center-card>



</template>

<script>
export default {

  name: "SysTag",


  data(){
    return{
      //表格数据
      table_data:{

        url: this.$rts.list_tag
        ,fields: this.$tf.fields_tag

        ,filters:{
          filter: '',
          filterOn: "name",
        },

        request:{

        }

      }
    }
  },

  methods:{

    onFilterChange(val){
      this.table_data.filters.filter = val;
    },

    onInsert(){

    },

    onUpdate(val){

    },

    onRemove(val){

    }


  }


}


</script>

<style scoped>

</style>