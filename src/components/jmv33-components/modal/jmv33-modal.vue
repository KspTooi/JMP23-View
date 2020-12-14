<template>

  <b-modal id="modal" :title="modal_data.title" centered hide-footer>

    <b-form @submit.prevent="modal_request">

      <slot name="modal_content" v-bind="modal_data.request"/>


      <b-row style="text-align: center">

        <b-col>
          <b-btn variant="info" type="submit">保存</b-btn>
          <span style="margin: 0 10px"></span>
          <b-btn variant="danger" @click="$bvModal.hide('modal')">取消</b-btn>
        </b-col>

      </b-row>

    </b-form>


  </b-modal>

</template>

<script>
export default {

  name: "jmv33-modal"

  ,props:{

    jmv33_modal_data:{

      type:Object

      ,default: ()=>{
        return {
          title: 'JMV33模态框'
          ,reqType:"insert"
          ,insert:null
          ,update:null
          ,remove:null
          ,request:{
          }
        }

      }
    }
  }

  ,data(){
    return{

      modal_data:{

        title:this.jmv33_modal_data.title
        ,reqType:this.jmv33_modal_data.reqType
        ,insert:this.jmv33_modal_data.insert
        ,update:this.jmv33_modal_data.update
        ,remove:this.jmv33_modal_data.remove

        ,request:this.jmv33_modal_data.request

      }

    }
  }

  ,watch:{

    jmv33_modal_data:{
      deep:true
      ,handler(nvar){
        this.modal_data.reqType = nvar.reqType;
        this.modal_data.request = nvar.request;
      }
    }

  }

  ,methods:{

    //打开模态框
    load(){
      this.$bvModal.show("modal");
    }

    //打开模态框并清空所有请求数据
    ,loadClear(){
      this.modal_data.request = {};
      this.$bvModal.show("modal");
    }

/*    ,loadWithData(reqType,request){

      this.modal_data.reqType = reqType;
      this.modal_data.request = request;

      this.$bvModal.show("modal");
    }*/

    ,commitQuestion(question){

      this.$swal.fire({
        title: question,
        showCancelButton: true,
        icon:"question"
      }).then((ret) => {
        if(ret.isConfirmed){
          this.commit();
        }
      })

    }

    ,commit(){
      this.modal_request();
    }

    ,close(){
      this.$bvModal.hide("modal");
    }

    ,modal_request(){

      let url = this.modal_data.update;

      if(this.modal_data.reqType === "insert"){
        url = this.modal_data.insert;
      }

      if(this.modal_data.reqType === "update"){
        url = this.modal_data.update;
      }

      if(this.modal_data.reqType === "remove"){
        url = this.modal_data.remove;
      }

      let req = this.$rts.post(url,this.modal_data.request);

      req.then((ret)=>{

        if(ret.data.code === this.$url.code_success){
          this.$swal.fire(ret.data.msg,"","success");

          this.$bvModal.hide("modal");

          this.$emit("done")

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