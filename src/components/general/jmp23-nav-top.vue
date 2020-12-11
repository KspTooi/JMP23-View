<template>

  <b-navbar type="secondary" variant="dark">

    <b-navbar-nav>



      <b-nav-item href="#">
        <router-link to="/admin/login">
          <b-btn pill variant="dark" >登录</b-btn>
        </router-link>
      </b-nav-item>


      <b-nav-item href="#">
        <router-link to="/logout">
          <b-btn pill variant="dark" href="logout">注销</b-btn>
        </router-link>
      </b-nav-item>

    </b-navbar-nav>

  </b-navbar>


</template>

<script>

export default {
  name: "jmp23-head-navigation"


}
</script>

<style scoped>

</style>