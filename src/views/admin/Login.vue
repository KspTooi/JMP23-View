<template>

  <b-container style="padding-top: 15vw">

    <b-row>

      <b-col cols="3"></b-col>


      <b-col cols="6">

        <b-card>

          <template v-slot:header>
            <h6 class="mb-0">用户登录</h6>
          </template>

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
                  type="password"
                  id="input-2"
                  v-model="req_data.password"
                  required
                  placeholder="password"
              ></b-form-input>
            </b-form-group>


            <b-form-row>
              <b-col>
                <b-form-group label="验证码:" label-for="input-2">
                  <b-form-input
                      type="text"
                      id="input-2"
                      v-model="req_data.kaptcha"
                      required
                      placeholder="kaptcha"
                  ></b-form-input>
                </b-form-group>
              </b-col>

              <b-col>

                <img style="margin-top: 30px" :src="kaptchaImg" @click="refreshCaptcha">

              </b-col>

            </b-form-row>






<!--            <b-form-group id="input-group-4">
              <b-form-checkbox-group v-model="req_data.checked" id="checkboxes-4">
                <b-form-checkbox value="me">Check me out</b-form-checkbox>
                <b-form-checkbox value="that">Check that out</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>-->

            <b-button type="submit" variant="info">登录</b-button>
            <span style="margin: 0 0.5rem"></span>
            <b-button type="reset" variant="danger">重置</b-button>
          </b-form>
<!--          <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ req_data }}</pre>
          </b-card>-->


        </b-card>

      </b-col>

      <b-col cols="3"></b-col>


    </b-row>


  </b-container>

</template>

<script>

export default {

  name: "Login"

  ,data() {
    return {

      kaptchaImg:"",

      req_data:{
        username:"",
        password:"",
        kaptcha:"",
        kaptcha_key:"",
      },


      show: true
    }
  },

  mounted() {
    this.refreshCaptcha();
  }

  ,methods: {

    refreshCaptcha(){
      this.$axios.post(this.$rts.get_kaptcha).then((ret)=>{

        this.kaptchaImg = "data:image/jpeg;base64,"+ret.data.payload.img;
        this.req_data.kaptcha_key = ret.data.payload.key;

      })
    },

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
      this.req_data.kaptcha = ''
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