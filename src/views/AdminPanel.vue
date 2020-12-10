<template>



  <el-container class="warp">

    <el-aside style="width: 220px;height: 100%" >

      <el-menu :default-openeds="['1', '2']"
               :default-active="this.$route.path"
               :router="true"
               background-color="rgba(52, 64, 88)"
               text-color="white">


        <b-btn block variant="se" style="margin-top: 1vw" >
          <div style="width: 30px;height: 30px;background-color: #4bb4bd;border-radius: 50px;float: left;margin-left: 1vw"></div>
          <div style="margin-top: 0.1vw;font-size: 18px;color: #c1c7cd;float: left;margin-left: 1vw">管理控制台</div>
        </b-btn>


        <div style="clear: both"></div>



        <el-menu-item-group title="">
          <el-menu-item index="/admin">
            <i class="el-icon-cpu"></i>首页
          </el-menu-item>
        </el-menu-item-group>




        <el-submenu index="1">



          <template slot="title">
            <i class="el-icon-cpu"></i>可用的操作
          </template>

          <el-menu-item-group title="数据管理">

            <el-menu-item index="/admin/sysUser">
              <i class="el-icon-menu"/>用户管理
            </el-menu-item>

            <el-menu-item index="3-3">
              <i class="el-icon-menu"/>角色管理
            </el-menu-item>

            <el-menu-item index="3-3">
              <i class="el-icon-menu"/>菜单管理
            </el-menu-item>

          </el-menu-item-group>


        </el-submenu>



      </el-menu>

    </el-aside>


    <el-container>

      <el-header style="padding: 0;z-index: 0;margin-bottom: 10px;margin-left: -5px" >

        <b-navbar type="secondary" variant="dark">

          <b-navbar-nav>



              <b-nav-item href="#">
                <router-link to="/admin/login">
                  <b-btn pill variant="dark" >登录</b-btn>
                </router-link>
              </b-nav-item>


            <b-nav-item href="#">
              <router-link to="/admin/logout">
                <b-btn pill variant="dark" href="logout">注销</b-btn>
              </router-link>
            </b-nav-item>

          </b-navbar-nav>

        </b-navbar>

      </el-header>


      <el-main style="padding: 0">

        <router-view></router-view>

      </el-main>


    </el-container>




  </el-container>


</template>




<script>

    export default {

      name: "GeneralLogin"

      ,data() {
        return {
          containerHeight: {
            height: ""
          }
        };
      },
      created() {
        //动态调整左侧菜单栏高度
        var docHeight = document.documentElement.clientHeight;
        this.containerHeight.height = docHeight - 20 + "px";
      }
    }

</script>



<style scoped>

</style>