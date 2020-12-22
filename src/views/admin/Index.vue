<template>

  <div>

    <jmp23-center-card title="首页 - 仪表盘">


      <template v-slot:area-table-head>
        <v-chart class="my-chart" :options="options"/>
      </template>

      <template v-slot:area-table>



      </template>


    </jmp23-center-card>



  </div>


</template>

<script>
export default {

  name: "Index"

  ,data(){
    return{

      options: {
        borderRadius: 5,
        backgroundColor:'rgba(239,239,239,0.5)',
        title: {
          text: "标签点击率图标"
        },
        tooltip: {},
        legend: {
          data: ["点击率"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  },

  methods:{

  },

  mounted() {

    let promise = this.$axios.post(this.$rts.list_tag);

    promise.then((ret)=>{

      let data = ret.data.payload;

      let names = [];

      let series = [
        {
          name: "销量",
          type: "bar",
          data: []
        }
      ];

      for(let item of data){
        names.push(item.name);
        series[0].data.push(item.clickCount);
      }

      this.options.xAxis.data = names;
      this.options.series = series;






    });



  }


}
</script>

<style scoped>

</style>