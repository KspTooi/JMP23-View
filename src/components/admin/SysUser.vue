<template>


  <b-card style="margin: 1rem 1rem 10rem 1rem" bg-variant="light">

    <template v-slot:header>
      <h6 class="mb-0">用户管理</h6>
    </template>


    <b-card-body class="overflow-auto">


      <b-row cols-md="2">
        <b-col>
          <b-input-group size="sm">
            <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>

      </b-row>


      <b-table id="my-table" fil :items="userList" :fields="fields" striped bordered hover head-variant="light" foot-variant="light" :per-page="perPage" :current-page="currentPage"></b-table>

      <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
      ></b-pagination>
<!--      <p class="mt-3">Current Page: {{ currentPage }}</p>-->

    </b-card-body>


  </b-card>





</template>

<script>

export default {


  name: "Login"

  ,data(){
    return{
      perPage: 8,
      currentPage: 1,
      rows:0,
      fields: [

        {
          key:"userId"
          ,label:"用户ID"
        },
        {
          key:"username"
          ,label:"用户名"
        },
        {
          key:"email"
          ,label:"邮箱"
        },
        {
          key:"mobile"
          ,label:"手机号"
        },
        {
          key:"status"
          ,label:"状态"
        },
        {
          key:"createTime"
          ,label:"创建时间"
        }


      ],
      userList: []
    }
  }

  ,methods:{

  }


  ,mounted() {

    let userList = this.userList;

    this.$axios.post(this.$url.userList).then((ret)=>{
      this.userList = ret.data.payload;
      this.rows = ret.data.payload.length;
    });


  }


}
</script>

<style scoped>

</style>