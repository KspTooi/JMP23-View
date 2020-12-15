<template>

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

          <el-menu-item index="/admin/sysMenu">
            <i class="el-icon-menu"/>菜单管理
          </el-menu-item>

          <el-menu-item index="/admin/sysSql">
            <i class="el-icon-menu"/>SQL监控
          </el-menu-item>

          <el-menu-item index="/admin/sysTag">
            <i class="el-icon-menu"/>标签管理
          </el-menu-item>

          <el-menu-item index="/admin/article">
            <i class="el-icon-menu"/>资讯管理
          </el-menu-item>

          <el-menu-item index="/admin/carMake">
            <i class="el-icon-menu"/>品牌管理
          </el-menu-item>

        </el-menu-item-group>


      </el-submenu>




      <el-submenu index="200">

        <template slot="title">
          <i class="el-icon-cpu"></i>不可用的操作
        </template>

        <el-submenu v-for="(item1,i1) of nav_data" :key="i1" :index="i1+1" v-if="item1.parentId===0">

          <template v-slot:title>
            <i class="el-icon-cpu"></i>{{item1.name}}
          </template>


          <el-menu-item :index="item2.url" v-for="(item2,i2) of nav_data" v-if="item2.parentId === item1.menuId" >
            <i class="el-icon-menu"/>{{item2.name}}
          </el-menu-item>

        </el-submenu>



<!--        <el-submenu :index="''+item.menuId" v-for="(item,i1) of nav_data" v-if="item.parentId===0" :key="i1">

          <template slot="title">
            <i class="el-icon-cpu"></i>{{item.name}}
          </template>

          <el-menu-item :index="item2.url" v-for="(item2,i2) of nav_data" v-if="item2.parentId===item.menuId" :key="i2">
            <i class="el-icon-menu"/>{{item2.name}}
          </el-menu-item>

        </el-submenu>-->

      </el-submenu>




    </el-menu>


  </el-aside>



</template>

<script>
export default {

  name: "jmp23-nav-side-left",


  data(){
    return{
      nav_data:{

      }
    }
  },

  mounted() {


    this.$axios.post(this.$rts.list_menu).then((ret)=>{
      this.nav_data = ret.data.payload;
    });


  }


}

</script>

<style scoped>

</style>