<template>

<div>

  <!--MODAL DIALOG 模态框区域-->

  <jmv33-modal ref="modal" :jmv33_modal_data="modal_data">

    <template v-slot:modal_content="data">

      <b-row style="margin: 1rem 3rem">

        <b-col sm="3">
          <label>用户名:</label>
        </b-col>

        <b-col sm="9">
          <b-form-input size="sm" v-model="data.username" required></b-form-input>
        </b-col>

      </b-row>

      <b-row style="margin: 1rem 3rem">

        <b-col sm="3">
          <label>密码:</label>
        </b-col>

        <b-col sm="9">
          <b-form-input type="password" size="sm" v-model="data.password" required></b-form-input>
        </b-col>

      </b-row>

      <b-row style="margin: 1rem 3rem">

        <b-col sm="3">
          <label>手机号:</label>
        </b-col>

        <b-col sm="9">
          <b-form-input size="sm" v-model="data.mobile" required></b-form-input>
        </b-col>

      </b-row>

      <b-row style="margin: 1rem 3rem">

        <b-col sm="3">
          <label>邮箱:</label>
        </b-col>

        <b-col sm="9">
          <b-form-input size="sm" v-model="data.email" required></b-form-input>
        </b-col>

      </b-row>

      <b-row style="margin: 1rem 3rem">

        <b-col sm="3">
          <label>状态:</label>
        </b-col>

        <b-col sm="9">
          <b-radio-group size="sm" v-model="data.status" required>
            <b-radio value="1">启用</b-radio>
            <b-radio value="0">禁用</b-radio>
          </b-radio-group>
        </b-col>

      </b-row>

      <b-row style="margin: 1rem 3rem">

        <b-col sm="3">
          <label>角色:</label>
        </b-col>

        <b-col sm="9">
          <b-select v-model="data.role" size="sm" required>
            <b-select-option value="5">管理员</b-select-option>
            <b-select-option value="6">测试人员</b-select-option>
          </b-select>
        </b-col>

      </b-row>

    </template>

  </jmv33-modal>

</div>



</template>

<script>
import Jmv33Modal from "@/components/jmv33-components/modal/jmv33-modal";
export default {

  name: "jmp23-modal-request-user",
  components: {Jmv33Modal},
  props:{
    jmp23_modal_data:Object
  },

  watch:{

    jmp23_modal_data:{
      deep:true
      ,handler(nvar){
        console.log(nvar)
        this.modal_data.reqType = nvar.reqType;
        this.modal_data.request = nvar.request;
      }
    }

  }

  ,data(){
    return{

      modal_data:{

        title: '用户管理'
        ,insert:this.$url.insert_user
        ,update:this.$url.update_user
        ,remove:this.$url.remove_user

        ,request:{}

/*        reqType:"insert",
        load_modal:false,

        //提交请求
        commit:false,

        request_url:{
          insert:this.$url.insert_user
          ,update:this.$url.update_user
          ,remove:this.$url.remove_user
        }

        ,request:{
          userId:null,
          username:null,
          password:null,
          mobile:null,
          email:null,
          status:1,
          role:5,
        }*/

      }

    }
  },


  methods:{

    load(){
      this.modal_data.request = {};
      this.$refs.modal.load();
    }

    ,loadWithData(reqType,request){

      this.modal_data.reqType = reqType;
      this.modal_data.request = request;

      this.$bvModal.show("modal");
    }

    ,commit(){
      this.$refs.modal.modal_request();
    }

    ,close(){
      this.$refs.modal.close();
    }



  }



}
</script>

<style scoped>

</style>