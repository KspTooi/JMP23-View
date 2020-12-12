<template>

  <div>
    <b-table id="my-table"
             :items="table_data.items"
             :fields="table_data.fields"
             striped bordered hover head-variant="light" foot-variant="light"
             :per-page="table_data.perPage"
             :current-page="table_data.currentPage"
             :filter=table_data.filters.filter
             :filter-included-fields="table_data.fields.filterOn"
             sticky-header="400px"
             @filtered="onFiltered"
    >


      <template v-slot:cell(status)="data">
        <span v-if="data.item.status === 1"><b-btn variant="success" size="sm">正常</b-btn></span>
        <span v-if="data.item.status === 0"><b-btn variant="danger" size="sm">封禁</b-btn></span>
      </template>

      <template v-slot:cell(options)="data">

        <b-btn variant="info" size="sm" @click="$emit('onUpdate',data)">
          <i class="el-icon-edit"></i>
        </b-btn>

        <span style="margin: 0 2px"></span>

        <b-btn variant="danger" size="sm" @click="$emit('onRemove',data)">
          <i class="el-icon-delete"></i>
        </b-btn>

      </template>

    </b-table>


    <b-pagination
        v-model="table_data.currentPage"
        :total-rows="table_data.rows"
        :per-page="table_data.perPage"
        aria-controls="my-table"
    />

  </div>

</template>

<script>
export default {

  name: "jmp23-table-menu",

  props:{
    jmp23_table_data:Object
  },

  watch:{

    jmp23_table_data:{

      deep:true
      ,handler(nvar){
        this.table_data.filters.filter = nvar.filters.filter;
        this.table_data.filters.filterOn = nvar.filters.filterOn;
      }

    }


  },

  data() {
    return {

      table_data:{

        currentPage:1
        ,rows:0
        ,perPage:8
        ,fields: this.$tf.fields_user
        ,url: this.$rts.list_user
        ,items:[]

        //暴露参数
        ,filters:{
          filter: null,
          filterOn: null,
        }

        ,request:[]

      }

    }
  }

  ,methods:{


    //刷新表格
    commit(request){
      this.refreshTable(request);
    }

    //过滤器数据重载
    ,onFiltered(filterItem){
      this.table_data.rows = filterItem.length;
    },

    //通过一个请求加载列数据
    refreshTable(request){

      this.$axios.post(this.table_data.url,request).then((ret)=>{
        this.table_data.items = ret.data.payload;
        this.table_data.rows = ret.data.payload.length;
      });

    }


  }
  ,mounted() {
    this.refreshTable();
  }


}
</script>




<style scoped>

</style>