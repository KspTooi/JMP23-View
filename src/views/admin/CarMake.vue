<template>

  <jmp23-center-card>


    <template v-slot:area-modal>

      <jmv43-modal ref="modal"
                   title="品牌管理"
                   :insert="$rts.insert_make"
                   :update="$rts.update_make"
                   :remove="$rts.remove_make"
                   :req-type="modal_data.reqType"
                   :request="modal_data.request"
                   :request-done="()=>{$refs.table.commit()}"
      >




        <template v-slot:modal_content>


          <jmv43-modal-input label="品牌名称:" v-model="modal_data.request.brandName"/>

          <jmv43-modal-slot label="LOGO:">

            <jmv33-files-upload :url="$rts.insert_file_upload"
                                field="files"
                                :limit='1'
                                :replace="file_upload_data.replace"
                                :show="file_upload_data.imgUrl"
                                :on-success="onUploadSuccess"/>


          </jmv43-modal-slot>

          <hr>

        </template>

      </jmv43-modal>

    </template>


    <template v-slot:area-table-head >

      <jmp23-table-head insert-btn-text="添加品牌"
                        placeholder="按品牌名搜索"
                        :on-insert="onInsert"
                        :on-refresh="()=>{$refs.table.commit()}"
                        :on-filter-change="onFilterChange"
      />

    </template>


    <template v-slot:area-table>

      <jmv33-table-general ref="table"
                           :on-update="onUpdate"
                           :on-remove="onRemove"
                           :url="$rts.list_make"
                           :fields="$tf.fields_car_make"
                           :filter="table_data.filter"
                           :filter-on="table_data.filterOn"
      >

        <template v-slot:cell(logoUrl)="data">

          <img :src="$rts.get_file_image+'/'+data.item.logoUrl" style="width: 80px" alt="暂无图片">

        </template>

      </jmv33-table-general>

    </template>


  </jmp23-center-card>


</template>

<script>
import Jmv33FilesUpload from "@/components/jmv33-components/general/jmv33-files-upload";
export default {

  name: "brandManager",
  components: {Jmv33FilesUpload},
  data(){
    return{


      file_upload_data:{
        imgUrl:""
        ,replace:false
      },

      table_data:{
        filter: "",
        filterOn: ["brandName"],
      },

      modal_data:{
        reqType:"insert"
        ,request:{
        }
      }
    }
  },

  methods:{


    onUploadSuccess(ret, file, fileList){
      if(ret.code === 200){
        this.modal_data.request.logoUrl = ret.payload[0];
      }
    },

    fileUploadSuccess(ret, file, fileList){
      if(ret.code === 200){
        this.modal_data.request.logoUrl = ret.payload[0];
      }
    },


    onFilterChange(val){
      this.table_data.filters.filter = val;
    },


    onInsert(){

      this.modal_data.reqType = "insert";

      this.file_upload_data.replace=true;

      this.modal_data.request={}

      this.$refs.modal.load();

    },

    onUpdate(val){

      this.modal_data.reqType = "update";

      this.modal_data.request = val.item;

      this.file_upload_data.imgUrl = this.$rts.get_file_image+val.item.logoUrl;

      this.file_upload_data.replace=false;

      this.$refs.modal.load();
    },

    onRemove(val){

      this.modal_data.reqType = "remove";
      this.modal_data.request = val.item;
      this.$refs.modal.commitQuestion("确认要移除该品牌吗?");

    }

  }


}
</script>

<style scoped>

</style>