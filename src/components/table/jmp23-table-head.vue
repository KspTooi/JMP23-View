<template>
  <b-row>

    <b-col cols="md-3">

      <b-input-group prepend="筛选:">
        <b-form-input v-model="filter" :placeholder="placeholder"></b-form-input>
        <!--                <b-input-group-append>
                          <b-button :disabled="!filter" @click="filter = ''">清除</b-button>
                        </b-input-group-append>-->
      </b-input-group>
    </b-col>

    <b-col cols="md-3">

      <b-btn-group>

        <b-btn variant="info" @click="$emit('onInsert')">{{insertBtnText}}</b-btn>

        <b-btn variant="info" @click="$emit('onRefresh')">
          <span class="el-icon-refresh"/>刷新
        </b-btn>

      </b-btn-group>



    </b-col>


    <slot name="headExtra">

    </slot>


  </b-row>
</template>

<script>
export default {

  name: "jmp23-table-head"

  ,props:{

    placeholder:{
      default:()=>{
        return "请输入内容"
      }
    },

    insertBtnText:{
      default:()=>{
        return "新增"
      }
    },


  }

  ,data(){
    return{
      filter:""
    }
  }
  ,watch:{

    filter:{
      deep:true,
      handler(nvar){
        this.$emit("onFilterChange",nvar);
      }
    }

  }

  ,methods:{

  }


}
</script>

<style scoped>

</style>