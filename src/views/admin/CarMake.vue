<template>

  <jmp23-center-card>


    <template v-slot:area-modal>

      <jmv33-modal ref="modal" :jmv33_modal_data="modal_data" @done="$refs.table.commit()">

        <template v-slot:modal_content>

          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>品牌名称:</label>
            </b-col>

            <b-col sm="8">
              <b-form-input size="sm" v-model="modal_data.request.brandName" required></b-form-input>
            </b-col>

          </b-row>

          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>LOGO:</label>
            </b-col>


            <b-col sm="8">

              <jmv33-files-upload :jmv33_files_upload_data="file_upload_data" @onUploadSuccess="onUploadSuccess"/>

<!--              <img :src="$rts.get_file_image+'/'+modal_data.request.logoUrl" style="width: 80px" alt="暂无图片" v-if="!changeCoverImg">

              <b-btn size="sm" variant="success" @click="changeCoverImg=true" v-if="!changeCoverImg" style="margin-left: 20px">更换图片</b-btn>

              <el-upload v-if="changeCoverImg"
                         :action="$rts.insert_file_upload"
                         :multiple=false
                         :limit=1
                         name="files"
                         list-type="picture"
                         :on-success="fileUploadSuccess"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>-->
            </b-col>

          </b-row>

          <hr>

<!--          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>品牌英文名:</label>
            </b-col>

            <b-col sm="8">
              <b-form-input size="sm" v-model="modal_data.request.englishName" required></b-form-input>
            </b-col>

          </b-row>

          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>联系方式:</label>
            </b-col>

            <b-col sm="8">
              <b-form-input size="sm" v-model="modal_data.request.phone" required></b-form-input>
            </b-col>

          </b-row>

          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>网站:</label>
            </b-col>

            <b-col sm="8">
              <b-form-input size="sm" v-model="modal_data.request.website" required></b-form-input>
            </b-col>

          </b-row>-->

        </template>

      </jmv33-modal>

    </template>


    <template v-slot:area-table-head >
      <jmp23-table-head insert-btn-text="添加品牌" placeholder="按品牌名搜索" @onFilterChange="onFilterChange" @onInsert="onInsert" @onRefresh="$refs.table.commit()"/>
    </template>


    <template v-slot:area-table>

      <jmv33-table-general ref="table" :jmv33_table_data="table_data" @onUpdate="onUpdate" @onRemove="onRemove" >

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


      changeCoverImg:false,

      file_upload_data:{
        url:this.$rts.insert_file_upload
        ,imgUrl:""
        ,limit:1
        ,field:"files"
        ,replace:false
      },


      table_data:{

        url: this.$rts.list_make
        ,fields: this.$tf.fields_car_make

        //暴露参数(过滤器)
        ,filters:{
          filter: "",
          filterOn: "brandName",
        }

      },

      modal_data:{

        title: '品牌管理'
        ,reqType:"insert"
        ,insert:this.$rts.insert_make
        ,update:this.$rts.update_make
        ,remove:this.$rts.remove_make
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
      this.changeCoverImg = true;

      this.file_upload_data.replace=true;

      this.$refs.modal.load();

    },

    onUpdate(val){

      this.modal_data.reqType = "update";
      this.changeCoverImg = false;

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