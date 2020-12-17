<template>
  <div>

    <img :src="file_upload_data.imgUrl" style="width: 80px" alt="暂无图片" v-if="!file_upload_data.replace">

    <b-btn size="sm" variant="success" @click="file_upload_data.replace=true" v-if="!file_upload_data.replace" style="margin-left: 20px">更换图片</b-btn>

    <el-upload v-if="file_upload_data.replace"
               :action=file_upload_data.url
               :multiple=false
               :limit=file_upload_data.limit
               :name=file_upload_data.field
               list-type="picture"
               :on-success="onUploadSuccess"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {

  name: "jmv33-files-upload",

  props:{
    jmv33_files_upload_data:{
      type:Object,
      default:()=>{
        return{
          url:""
          ,imgUrl:""
          ,limit:1
          ,field:"files"
          ,replace:false
        }
      }
    }
  },
  data(){
    return{
      file_upload_data:{
        url:this.jmv33_files_upload_data.url
        ,imgUrl:this.jmv33_files_upload_data.imgUrl
        ,limit:this.jmv33_files_upload_data.limit
        ,field:this.jmv33_files_upload_data.field
        ,replace:this.jmv33_files_upload_data.replace
      }
    }
  },

  watch:{

    jmv33_files_upload_data:{
      deep:true,
      immediate: true,
      handler(val){
        this.file_upload_data.imgUrl = val.imgUrl;
        this.file_upload_data.replace = val.replace;
      }
    },

  },

  methods:{

    //上传成功
    onUploadSuccess(ret, file, fileList){
      this.$emit("onUploadSuccess",ret,file,fileList);
    }



  }



}
</script>

<style scoped>

</style>