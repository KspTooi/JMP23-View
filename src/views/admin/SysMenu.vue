<template>


  <b-card style="margin: 1rem 1rem 10rem 1rem" bg-variant="light">

    <template v-slot:header>
      <h6 class="mb-0">菜单管理</h6>
    </template>

    <b-card-body class="overflow-auto">


      <b-card title="操作">

        <hr>
        <b-card-body>

          <b-row>

            <b-col cols="md-3">
              <b-input-group prepend="筛选:">
                <b-form-input v-model="table_data.filters.filter" placeholder="按名称查询"></b-form-input>
<!--                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">x</b-button>
                </b-input-group-append>-->
              </b-input-group>

            </b-col>

            <b-col cols="md-3">

              <b-btn-group>
                <b-btn variant="info" @click="onInsertBtn">添加菜单</b-btn>

                <b-btn variant="info" @click="table_data.table_control.commit = true;parentOnly=false">
                  <span class="el-icon-refresh"/>刷新
                </b-btn>

              </b-btn-group>

            </b-col>

            <b-col cols="md-3">
              <b-checkbox value="true" v-model="parentOnly">仅显示父级菜单</b-checkbox>
            </b-col>

          </b-row>

        </b-card-body>

      </b-card>


      <jmp23-table-menu ref="table" :jmp23_table_data="table_data"
                        @onUpdate="onUpdate"
                        @onRemove="onRemove"
      />


    </b-card-body>

    <jmp23-modal-request-menu ref="modal" :jmp23_modal_data="modal_data"></jmp23-modal-request-menu>

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

        filters:{
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


    onUpdate(nvar){

    }

    ,onRemove(nvar){

    }


    ,onFiltered(filterItem){
      this.rows = filterItem.length;
    },

    onInsertBtn(){
      this.$refs.modal.load();
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