<template>

  <editor v-model="content"
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

</template>

<script>
export default {

  name: "jmv43-editor",

  props:{
    value:null
  },

  data(){
    return{
      content:this.value
    }
  },

  watch:{
    content:{
      handler(val){
        this.$emit("input",val);
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
    }
  }



}
</script>

<style scoped>

</style>