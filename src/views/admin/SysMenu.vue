<template>


  <b-card style="margin: 1rem 1rem 10rem 1rem" bg-variant="light">

    <template v-slot:header>
      <h6 class="mb-0">菜单管理</h6>
    </template>

    <b-card-body class="overflow-auto">


      <b-card title="操作">

        <hr>
        <b-card-body>

          <jmp23-table-head placeholder="按菜单名搜索" insert-btn-text="新增菜单" @onInsert="onInsert" @onRefresh="onRefresh" @onFilterChange="onFilterChange">
            <template v-slot:headExtra>
              <b-col cols="md-3">
                <b-checkbox value="true" v-model="parentOnly">仅显示父级菜单</b-checkbox>
              </b-col>
            </template>
          </jmp23-table-head>

        </b-card-body>

      </b-card>



      <jmv33-table-general ref="table" :jmv33_table_data="table_data" @onUpdate="onUpdate" @onRemove="onRemove">

        <template v-slot:cell(perms)="data">
          <span v-if="data.item.perms === null">无需权限</span>
          {{data.item.perms}}
        </template>

        <template v-slot:cell(type)="data">
          <span v-if="data.item.type === 0"><b-btn variant="primary">目录</b-btn></span>
          <span v-if="data.item.type === 1"><b-btn variant="success">菜单</b-btn></span>
          <span v-if="data.item.type === 2"><b-btn variant="danger">按钮</b-btn></span>
        </template>

      </jmv33-table-general>


    </b-card-body>


  </b-card>


</template>

<script>

import Jmp23ModalRequestMenu from "@/components/modal/jmp23-modal-request-menu";

export default{

  name: "Login"

  ,components: {Jmp23ModalRequestMenu},

  watch:{

    parentOnly:{

      handler(nvar){

        if(nvar){
          this.$refs.table.commit({parentId:"0"});
          return true;
        }

        this.$refs.table.commit();
      }

    }


  }


  ,data(){
    return{

      parentOnly:false

      ,table_data:{

        url: this.$rts.list_menu
        ,fields: this.$tf.fields_menu

        ,filters:{
          filter: null,
          filterOn: ["name"],
        }

      }

      ,modal_data:{

        reqType:"insert",

        request_url:{
          insert:this.$url.insert_user
          ,update:this.$url.update_user
          ,remove:this.$url.remove_user
        }

        ,request:{

          parents:{

          }

        }

      }

    }

  }


  ,methods:{


    onFilterChange(nvar){
      this.table_data.filters.filter = nvar;
    }

    ,onRefresh(){
      this.$refs.table.commit();
    }

    ,onInsert(){
      this.$refs.modal.loadClear();
    }

    ,onUpdate(nvar){
      this.$refs.modal.load();
    }

    ,onRemove(nvar){

    }


  }

  ,mounted(){


    let promise = this.$axios.post(this.$rts.list_menu,{parentId:0});

    promise.then((ret)=>{
      this.modal_data.request.parents = ret.data.payload;
    })

  }


}
</script>

<style scoped>

</style>