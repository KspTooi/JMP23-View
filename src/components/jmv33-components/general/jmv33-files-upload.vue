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

    onSuccess:{
      type:Function,
      default:null
    },

    url:{
      type:String,
      default:""
    },

    show:{
      type:String,
      default:""
    },

    limit:{
      type:Number,
      default:1
    },

    field:{
      type:String,
      default:'file'
    },

    replace:{
      type:Boolean,
      default:false
    }

  },
  data(){
    return{
      file_upload_data:{
        url:this.url
        ,imgUrl:this.show
        ,limit:this.limit
        ,field:this.field
        ,replace:this.replace
      }
    }
  },

  methods:{

    //上传成功的回调方法
    onUploadSuccess(ret, file, fileList){
      this.onSuccess(ret, file, fileList);
    }

  }



}
</script>

<style scoped>

</style>