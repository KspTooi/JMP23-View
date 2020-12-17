<template>

  <jmp23-center-card>


    <template v-slot:area-modal>

      <jmv33-modal ref="modal" :jmv33_modal_data="modal_data" @done="$refs.table.commit()" >

        <template v-slot:modal_content>

          <b-row style="margin: 1rem 3rem">

            <b-col sm="4">
              <label>厂商名称:</label>
            </b-col>

            <b-col sm="8">
              <b-form-input size="sm" v-model="modal_data.request.manufacturerName" required></b-form-input>
            </b-col>

          </b-row>


        </template>

      </jmv33-modal>

    </template>


    <template v-slot:area-table-head>

      <jmp23-table-head insert-btn-text="新增厂商" placeholder="搜索厂商" @onFilterChange="onFilterChange" @onInsert="onInsert" @onRefresh="$refs.table.commit()"/>

    </template>



    <template v-slot:area-table>

      <jmv33-table-general ref="table" :jmv33_table_data="table_data" @onUpdate="onUpdate" @onRemove="onRemove">


      </jmv33-table-general>

    </template>

  </jmp23-center-card>


</template>

<script>
export default {

  name: "CarManufacturer",

  data(){
    return{

      table_data:{

        url: this.$rts.list_carmanufacturer
        ,fields: this.$tf.fields_car_manufacturer

        //暴露参数(过滤器)
        ,filters:{
          filter: "",
          filterOn: "title",
        }

      },

      modal_data:{
        title: '厂商管理'
        ,reqType:"insert"
        ,insert:this.$rts.insert_carmanufacturer
        ,update:this.$rts.update_carmanufacturer
        ,remove:this.$rts.remove_carmanufacturer
        ,request:{
        }
      },

    }
  },

  methods:{

    onFilterChange(val){
      this.table_data.filters.filter = val;
    },

    onInsert(val){

      this.modal_data.reqType="insert"

      this.modal_data.request = {};

      this.$refs.modal.load();

    },

    onUpdate(val){

      this.modal_data.reqType="update"
      this.modal_data.request = val.item;
      this.$refs.modal.load();

    },

    onRemove(val){
      this.modal_data.request = val.item;
      this.modal_data.reqType="remove"
      this.$refs.modal.commitQuestion("是否要删除这条记录?");
    }



  }


}
</script>

<style scoped>

</style>