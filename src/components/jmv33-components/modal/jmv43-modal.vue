<template>

  <b-modal id="modal" :title="title" centered hide-footer no-enforce-focus>

    <b-form @submit.prevent="modal_request">

      <slot name="modal_content" v-bind="request"/>


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

    title:{
      type: String,
      default:"JMV43模态框"
    },
    reqType:{
      type: String,
      default:"insert"
    },
    insert:{
      type: String,
      default:""
    },
    update:{
      type: String,
      default:""
    },
    remove:{
      type: String,
      default:""
    },
    request:{
      type: Object,
      default:{}
    },
    requestDone:{
      type: Function,
      default:null
    }

  }

  ,data(){
    return{

    }
  }

  ,watch:{

/*    jmv33_modal_data:{
      deep:true
      ,handler(nvar){
        this.modal_data.reqType = nvar.reqType;
        this.modal_data.request = nvar.request;
      }
    }*/

  }

  ,mounted() {

/*    this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
      this.$emit("onModalCreate");
    })

    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      this.$emit("onModalClose");
    })*/

  }

  ,methods: {

    //打开模态框
    load() {
      this.$bvModal.show("modal");
    }

    //打开模态框并清空所有请求数据
    , loadClear() {
      this.request = {};
      this.$bvModal.show("modal");
    }

    /*    ,loadWithData(reqType,request){

      this.modal_data.reqType = reqType;
      this.modal_data.request = request;

      this.$bvModal.show("modal");
    }*/

    , commitQuestion(question) {

      this.$swal.fire({
        title: question,
        showCancelButton: true,
        icon: "question"
      }).then((ret) => {
        if (ret.isConfirmed) {
          this.commit();
        }
      })

    }


    , commit() {
      this.modal_request();
    }

    , close() {
      this.$bvModal.hide("modal");
    }

    , modal_request() {

      let url = this.update;

      if (this.reqType === "insert") {
        {
          url = this.insert;
        }

        if (this.reqType === "update") {
          url = this.update;
        }

        if (this.reqType === "remove") {
          url = this.remove;
        }

        let req = this.$rts.post(url, this.request);

        req.then((ret) => {

          if (ret.data.code === this.$url.code_success) {
            this.$swal.fire(ret.data.msg, "", "success");

            this.$bvModal.hide("modal");

            this.requestDone();

            return true;
          }

          this.$swal.fire(ret.data.msg, "", "error");

        })

      }

    }


  }

}
</script>

<style scoped>

</style>