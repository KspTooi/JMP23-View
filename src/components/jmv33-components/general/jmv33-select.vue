<template>


  <div>

    <b-select v-model="currentValue" size="sm">

      <b-select-option value="0" v-if="showZeroValue">无</b-select-option>

      <b-select-option v-for="(item,i) of select_data" :key="i" :value="item[field_value]" >
        {{item[field_text]}}
      </b-select-option>

    </b-select>
  </div>


</template>

<script>

export default {

  props:{
    value:{
      default:()=>{
        return 0;
      }
    },
    url:null,
    payload:null,
    field_value:null,
    field_text:null,
    showZeroValue:{
      default:()=>{
        return false;
      }
    }
  },

  name: "jmv33-select"

  ,data(){
    return{

      //总数居(通过调用接口获取)
      select_data:null,

      //当前选择的值
      currentValue:this.value

    }
  }

  ,watch:{
    currentValue:{
      handler(val){
        this.$emit('input',val);
      }
    }
  }

  ,methods:{


    //刷新数据
    refresh(){

      let request = this.$axios.post(this.url,this.payload);

      request.then((ret)=>{
        this.select_data = ret.data.payload;
      })

    }
  }

  ,mounted(){
    this.refresh();
  }


}
</script>




<style scoped>

</style>