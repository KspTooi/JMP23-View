<template>
  <div>

    <el-upload
        name="files"
        :limit="1"
        :multiple="false"
        :action="url"
        :on-success="onSuccess"
    >

      <el-button>
        <b-btn variant="success">上传</b-btn>
      </el-button>

    </el-upload>

  </div>
</template>

<script>
export default {

  name: "jmv43-file-upload",

  props:{
    url:String
  },

  methods:{


    onSuccess(ret,file,fileList){
      this.$emit("input",ret.payload[0]);
    }

  }


}
</script>

<style scoped>

</style>