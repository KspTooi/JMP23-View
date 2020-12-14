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

      <!--动态插槽核心代码  START-->
      <!--for: https://stackoverflow.com/questions/50891858/vue-how-to-pass-down-slots-inside-wrapper-component/50892881 -->
      <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="slotScope">
        <slot :name="slotName" v-bind="slotScope"></slot>
      </template>
      <!--动态插槽核心代码  END-->

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

  name: "jmv33-table-general",

  props:{
    jmv33_table_data:{
      type:Object,
      default:()=>{
        return{
          table_data:{

            url: ""
            ,fields: ""

            //暴露参数(过滤器)
            ,filters:{
              filter: "",
              filterOn: "",
            }

          }

        }
      }
    }
  },

  watch:{

    jmv33_table_data:{

      deep:true
      ,handler(nvar){

        if(nvar.filters!=null){
          this.table_data.filters.filter = nvar.filters.filter;
          this.table_data.filters.filterOn = nvar.filters.filterOn;
        }

      }

    }


  },

  data() {
    return {

      table_data:{

        url: this.jmv33_table_data.url
        ,fields: this.jmv33_table_data.fields

        ,currentPage:1
        ,rows:0
        ,perPage:8
        ,items:[]

        //暴露参数(过滤器)
        ,filters:{
          filter: this.jmv33_table_data.filters.filter,
          filterOn: this.jmv33_table_data.filters.filter,
        }

        //表格请求参数
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