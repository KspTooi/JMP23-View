<template>

  <div id="editor">

  </div>



</template>

<script>
export default {

  props:{
    value:{
      type:null,
      default:()=>{
        return ""
      }
    }
  },

  name: "jmp32-editor",

  data(){
    return{
      content:this.content,

      initParm:{
        selector:"#editor",
        height: 300,
        menubar: false,
        language: 'zh_CN',
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
      }
    }
  },

  watch:{
    content:{
      handler(val){
        this.$emit("input",val);
      }
    }
  }


}
</script>

<style scoped>

</style>