<template>

<div>

  <!--    MODAL DIALOG 模态框区域-->
  <b-modal id="modal" title="编辑用户" centered hide-footer>

    <b-form @submit.prevent="modal_request">

      <b-row style="margin: 1rem 3rem">

        <b-col sm="3">
          <label>用户名:</label>
        </b-col>

        <b-col sm="9">
          <b-form-input size="sm" v-model="modal_data.username" required></b-form-input>
        </b-col>

      </b-row>

      <b-row style="margin: 1rem 3rem">

        <b-col sm="3">
          <label>密码:</label>
        </b-col>

        <b-col sm="9">
          <b-form-input type="password" size="sm" v-model="modal_data.password" required></b-form-input>
        </b-col>

      </b-row>

      <b-row style="margin: 1rem 3rem">

        <b-col sm="3">
          <label>手机号:</label>
        </b-col>

        <b-col sm="9">
          <b-form-input size="sm" v-model="modal_data.mobile" required></b-form-input>
        </b-col>

      </b-row>

      <b-row style="margin: 1rem 3rem">

        <b-col sm="3">
          <label>邮箱:</label>
        </b-col>

        <b-col sm="9">
          <b-form-input size="sm" v-model="modal_data.email" required></b-form-input>
        </b-col>

      </b-row>

      <b-row style="margin: 1rem 3rem">

        <b-col sm="3">
          <label>状态:</label>
        </b-col>

        <b-col sm="9">
          <b-radio-group size="sm" v-model="modal_data.status" required>
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
          <b-select v-model="modal_data.role" size="sm" required>
            <b-select-option value="5">管理员</b-select-option>
            <b-select-option value="6">测试人员</b-select-option>
          </b-select>
        </b-col>

      </b-row>

      <b-row style="text-align: center">

        <b-col>
          <b-btn variant="info" type="submit">保存</b-btn>
          <span style="margin: 0 10px"></span>
          <b-btn variant="danger" @click="$bvModal.hide('edit-user-modal')">取消</b-btn>
        </b-col>

      </b-row>
    </b-form>

  </b-modal>

</div>



</template>

<script>
export default {

  name: "jmp23-modal-request-user",

  props:{
    jmp23_modal_data:Object
    ,done:Function
  },

  data(){
    return{
      modal_data:this.jmp23_modal_data
    }
  },

  watch:{

    jmp23_modal_data:{

      deep:true

      ,handler(val){


        if(val.load_modal === true){
          this.$bvModal.show("modal");
          val.load_modal = false;
        }

        this.modal_data = val;
      }

    }

  },

  methods:{

    modal_request(){

      let url = this.$url.user_update;

      if(this.modal_data.reqType === "insert"){
        url = this.$url.user_insert;
      }

      if(this.modal_data.reqType === "update"){
        url = this.$url.user_update;
      }

      if(this.modal_data.reqType === "remove"){
        url = this.$url.user_remove;
      }

      let req = this.$rts.post(url,this.modal_data);

      req.then((ret)=>{


        if(ret.data.code === this.$url.code_success){
          this.$swal.fire(ret.data.msg,"","success");
          this.$bvModal.hide("modal");


          if(this.done !== undefined){
            this.done();
          }

          return true;
        }

        this.$swal.fire(ret.data.msg,"","error");

      })

    }



  }



}
</script>

<style scoped>

</style>