<template>



  <b-card style="margin: 1rem 10rem 10rem 10rem">

    <template v-slot:header>
      <h6 class="mb-0">用户登录</h6>
    </template>

    <div>
      <b-form @submit.prevent="req_UserLogin" @reset="onReset" v-if="show">

        <b-form-group
            id="input-group-1"
            label="用户名:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
        >

<!--          type="email"-->
          <b-form-input
              id="input-1"
              v-model="req_data.username"
              required
              placeholder="username"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="密码:" label-for="input-2">
          <b-form-input
              id="input-2"
              v-model="req_data.password"
              required
              placeholder="password"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4">
          <b-form-checkbox-group v-model="req_data.checked" id="checkboxes-4">
            <b-form-checkbox value="me">Check me out</b-form-checkbox>
            <b-form-checkbox value="that">Check that out</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-button type="submit" variant="info">Submit</b-button>
        <span style="margin: 0 0.5rem"></span>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ req_data }}</pre>
      </b-card>
    </div>


  </b-card>





</template>

<script>

export default {

  name: "Login"

  ,data() {
    return {

      req_data:{
        username:"",
        password:"",
        checked: []
      },


      show: true
    }
  }
  ,methods: {



    req_UserLogin(){

      let req = this.$rts.post(this.$rts.admin_account_login,this.req_data);

      req.then((ret)=>{

        if(ret.data.code === this.$rts.code_success){

          this.$swal.fire(ret.data.msg,"","success").then(()=>{
            this.$router.push("/");
          });

          //存储token
          sessionStorage.setItem("jToken",ret.data.payload);

          return true;
        }

        this.$swal.fire(ret.data.msg,"","error");

      })


    },




    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.req_data))
    },





    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.req_data.username = ''
      this.req_data.password = ''
      this.req_data.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }


}
</script>

<style scoped>

</style>