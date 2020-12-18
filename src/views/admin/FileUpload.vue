<template>

  <div>

    {{request}}

    <jmv43-file-upload
        :url="$rts.insert_file_upload"
        v-model="request.img"
    />

  </div>

</template>

<script>
import Jmv43FileUpload from "@/components/jmv33-components/general/jmv43-file-upload";
export default {
  name: "FileUpload",
  components: {Jmv43FileUpload},
  data(){
    return{

      request:{

      }

    }
  }







}

</script>

<style scoped>

</style>