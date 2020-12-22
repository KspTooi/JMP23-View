<template>

  <b-navbar type="secondary" variant="dark">

    <b-navbar-nav>



<!--      <b-nav-item href="#">
        <router-link to="/admin/login">
          <b-btn pill variant="dark" >登录</b-btn>
        </router-link>
      </b-nav-item>-->


      <b-nav-item href="#">
        <router-link to="/logout">
          <b-btn pill variant="dark" href="logout">注销</b-btn>
        </router-link>
      </b-nav-item>

      <b-nav-item href="#">
        <b-btn pill variant="dark" @click="$bvModal.show('modal1')">消息({{messageCount}})</b-btn>
      </b-nav-item>

    </b-navbar-nav>

    <b-modal id="modal1" title="我的消息" centered no-enforce-focus>



<!--      :fields="fields"-->
      <b-table id="my-table"
               :items="items"
               :fields="fields"
               striped bordered hover head-variant="light" foot-variant="light"
      ></b-table>

    </b-modal>

  </b-navbar>


</template>

<script>

export default {
  name: "jmp23-head-navigation",

  data(){
    return{

      items:[
      ],
      fields:[
        {
          key:"content"
          ,label:"消息"
        }
      ],

      messageCount:0,
      websocket:null
    }
  }


  ,mounted() {


    this.websocket = new WebSocket('ws://127.0.0.1:18001/websocket/client');
    // 收到消息的回调
    //this.websocket.onmessage = this.onMessageReceive
    this.initWebSocket();

  },
  methods:{

    onMessageReceive(event){
      console.log(event);
    },

    initWebSocket () {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage

      // 连接成功
      this.websocket.onopen = this.setOnopenMessage

      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage

      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage

      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload
    },


    setOnmessageMessage (event) {

      this.messageCount++;

      let content ={
        "content":event.data
      }

      this.items.push(content);

      console.log('服务端返回：' + event.data)
    },









    setOncloseMessage () {
      console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
    },
    onbeforeunload () {
      this.closeWebSocket()
    },
    closeWebSocket () {
      this.websocket.close()
    },
    setErrorMessage () {
      console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
    },
    setOnopenMessage () {
      console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
    },

  }


}
</script>

<style scoped>

</style>