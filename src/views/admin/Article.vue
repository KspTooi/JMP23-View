<template>

  <jmp23-center-card>


    <template v-slot:area-modal>

      <jmv33-modal ref="modal" :jmv33_modal_data="modal_data" @done="$refs.table.commit()" >

        <template v-slot:modal_content>

          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>标题:</label>
            </b-col>

            <b-col sm="8">
              <b-form-input size="sm" v-model="modal_data.request.title" required></b-form-input>
            </b-col>

          </b-row>

          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>来源:</label>
            </b-col>

            <b-col sm="8">
              <b-form-input size="sm" v-model="modal_data.request.source" required></b-form-input>
            </b-col>

          </b-row>

          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>摘要:</label>
            </b-col>

            <b-col sm="8">
              <b-form-input size="sm" v-model="modal_data.request.summary" required></b-form-input>
            </b-col>

          </b-row>

          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>主图:</label>
            </b-col>


            <b-col sm="8">

              <img :src="$rts.get_file_image+'/'+modal_data.request.coverPic" style="width: 80px" alt="暂无图片" v-if="!changeCoverImg">

              <b-btn size="sm" variant="success" @click="changeCoverImg=true" v-if="!changeCoverImg" style="margin-left: 20px">更换图片</b-btn>

              <el-upload v-if="changeCoverImg"
                  :action="$rts.insert_file_upload"
                  :file-list="fileList"
                  :multiple=false
                  :limit=1
                  name="files"
                  list-type="picture"
                  :on-success="fileUploadSuccess"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </b-col>

          </b-row>


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


      </jmv33-modal>
    </template>


    <template v-slot:area-table-head>
      <jmp23-table-head insert-btn-text="添加资讯" placeholder="搜索资讯" @onFilterChange="onFilterChange" @onInsert="onInsert" @onRefresh="$refs.table.commit()"/>
    </template>


    <template v-slot:area-table>


      <jmv33-table-general ref="table" :jmv33_table_data="table_data" @onUpdate="onUpdate" @onRemove="onRemove">

        <template v-slot:cell(coverPic)="data">

          <img :src="$rts.get_file_image+'/'+data.item.coverPic" style="width: 80px" alt="暂无图片">

        </template>

      </jmv33-table-general>

    </template>


  </jmp23-center-card>



</template>

<script>
export default {
  name: "Article",

  data(){
    return{

      createEditor:false,

      fileList:[],

      content:'',

      changeCoverImg:false,

      modal_data:{
        title: '资讯管理'
        ,reqType:"insert"
        ,insert:this.$rts.insert_article
        ,update:this.$rts.update_article
        ,remove:this.$rts.remove_article
        ,request:{
        }
      },

      table_data:{

        url: this.$rts.list_article
        ,fields: this.$tf.fields_article

        //暴露参数(过滤器)
        ,filters:{
          filter: "",
          filterOn: "title",
        }

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
      this.table_data.filters.filter = val;
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