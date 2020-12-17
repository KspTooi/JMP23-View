<template>

  <jmp23-center-card>


    <template v-slot:area-modal>

      <jmv43-modal ref="modal"
                   title="资讯管理"
                   :insert="$rts.insert_article"
                   :update="$rts.update_article"
                   :remove="$rts.remove_article"
                   :req-type="modal_data.reqType"
                   :request="modal_data.request"
                   :request-done="()=>{$refs.table.commit()}"
      >

        <template v-slot:modal_content>


          <jmv43-modal-input label="标题:" v-model="modal_data.request.title"/>

          <jmv43-modal-input label="来源:" v-model="modal_data.request.source"/>

          <jmv43-modal-input label="摘要:" v-model="modal_data.request.summary"/>


          <jmv43-modal-slot label="主图">

            <jmv33-files-upload
                :url="$rts.insert_file_upload"
                :show="$rts.get_file_image+'/'+modal_data.request.coverPic"
                :replace="changeCoverImg"
                :limit="1"
                field="files"
                :on-success="fileUploadSuccess"
            />

          </jmv43-modal-slot>


          <editor v-model="modal_data.request.content"
                  :init="{
            height: 300,
            menubar: false,
            language: 'zh_CN',
            images_upload_handler: imageUploadHandler,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount image'
                ],
                toolbar:
                'undo redo | formatselect | bold italic backcolor | \a\
                lignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help | image' }"

          />

          <hr>

        </template>


      </jmv43-modal>

    </template>


    <template v-slot:area-table-head>

      <jmp23-table-head insert-btn-text="添加资讯"
                        placeholder="搜索资讯"
                        :on-insert="onInsert"
                        :on-refresh="()=>{$refs.table.commit()}"
                        :on-filter-change="onFilterChange"
      />

    </template>


    <template v-slot:area-table>

      <jmv33-table-general ref="table"
                           :on-update="onUpdate"
                           :on-remove="onRemove"
                           :url="$rts.list_article"
                           :fields="$tf.fields_article"
                           :filter="table_data.filter"
                           :filter-on="table_data.filterOn"
      >

        <template v-slot:cell(coverPic)="data">

          <img :src="$rts.get_file_image+'/'+data.item.coverPic" style="width: 80px" alt="暂无图片">

        </template>

      </jmv33-table-general>

    </template>


  </jmp23-center-card>



</template>

<script>
import Jmv33FilesUpload from "@/components/jmv33-components/general/jmv33-files-upload";
export default {
  name: "Article",
  components: {Jmv33FilesUpload},
  data(){
    return{

      createEditor:false,

      fileList:[],

      content:'',

      changeCoverImg:false,

      modal_data:{
        reqType:"insert"
        ,request:{
        }
      },

      table_data:{
        filter: "",
        filterOn: ["title"],
      }

    }
  },

  methods:{

    imageUploadHandler(blobInfo, success, failure){

      let formdata = new FormData();

      formdata.append('files',blobInfo.blob())

      this.$axios.post(this.$rts.insert_file_upload,formdata).then((ret)=>{

        if(ret.data.code === 200){
          success(this.$rts.get_file_image+ret.data.payload[0]);
          return true;
        }

        failure('上传失败!');

      })
    },



    //文件上传成功
    fileUploadSuccess(ret, file, fileList){

      if(ret.code === 200){
        this.modal_data.request.coverPic = ret.payload[0];
      }

    },

    onFilterChange(val){
      this.table_data.filter = val;
    },

    onUpdate(val){

      this.changeCoverImg = false;
      this.modal_data.reqType="update"
      this.modal_data.request = val.item;
      this.$refs.modal.load();

    },

    onInsert(val){

      this.changeCoverImg = true;
      this.modal_data.reqType="insert"
      this.modal_data.request = {};

      this.$refs.modal.load();

    },

    onRemove(val){
      this.modal_data.request = val.item;
      this.modal_data.reqType="remove"
      this.$refs.modal.commitQuestion("是否要删除这条资讯?");
    }


  }


}
</script>

<style scoped>

</style>