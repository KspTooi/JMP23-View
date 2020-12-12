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


      <template v-slot:cell(perms)="data">
        <span v-if="data.item.perms === null">无需权限</span>
        {{data.item.perms}}
      </template>

      <template v-slot:cell(type)="data">
        <span v-if="data.item.type === 0"><b-btn variant="primary">目录</b-btn></span>
        <span v-if="data.item.type === 1"><b-btn variant="success">菜单</b-btn></span>
        <span v-if="data.item.type === 2"><b-btn variant="danger">按钮</b-btn></span>
      </template>

      <template v-slot:cell(createTime)="data">

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


        if(nvar.table_control.commit === true){
          this.refreshTable();
          nvar.table_control.commit = false;
        }

        if(nvar.table_control.commit[0]===true){
          this.refreshTable(nvar.table_control.commit[1]);
          nvar.table_control.commit[0] = false;
          nvar.table_control.commit[1] = {};
        }

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
        ,fields: this.$tf.fields_menu
        ,items:[]

        ,filters:{
          filter: null,
          filterOn: null,
        }

        ,table_control:{
          commit:false,
          request:[]
        }

      }

    }
  }

  ,methods:{

    //过滤器数据重载
    onFiltered(filterItem){
      this.table_data.rows = filterItem.length;
    },

    //通过一个请求加载列数据
    refreshTable(request){

      this.$axios.post(this.$url.menu_list,request).then((ret)=>{
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