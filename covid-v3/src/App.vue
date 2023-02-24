<template>
  <div class="box" :style="{ background: `url(${bg})` }">
    <div class="box-left" style="color:white">
      <div class="box-left-card">
        <section>
          <div>较上日+ {{store.chinaAdd.localConfirmH5}}</div>
          <div>{{store.ChinaTotal.localConfirm}}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.nowConfirm}}</div>
          <div>{{store.ChinaTotal.nowConfirm}}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.confirm}}</div>
          <div>{{store.ChinaTotal.confirm}}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.noInfect}}</div>
          <div>{{store.ChinaTotal.noInfect}}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.importedCase}}</div>
          <div>{{store.ChinaTotal.importedCase}}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+ {{store.chinaAdd.dead}}</div>
          <div>{{store.ChinaTotal.dead}}</div>
          <div>累计死亡</div>
        </section>
      </div>
      <div class="box-left-pie"></div>
      <div class="box-left-line"></div>

    </div>
    <div id="china" class="box-center"></div>
    <div style="color:white" class="box-right">
      <table cellspacing='0' border="1" class="table">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group enter-active-class="animate__animated animate__flipInY" tag="tbody">
          <tr :key="item.name" v-for="item in store.item">
            <td align="center">{{item.name}}</td>
            <td align="center">{{item.today.confirm}}</td>
            <td align="center">{{item.total.confirm}}</td>
            <td align="center">{{item.total.heal}}</td>
            <td align="center">{{item.total.dead}}</td>
          </tr>

        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import bg from './assets/1.jpg'
import { useStore } from './stores'
import { onMounted} from 'vue';
import * as echarts from 'echarts'// echarts5
import './assets/china'
import { geoCoordMap } from './assets/geoMap'
import 'animate.css'
const store = useStore()

store.getList()

onMounted(async () => {
  await store.getList()
  initCharts()
  initPie()
  initline()
})



const initCharts = () => {
  const city = store.list.diseaseh5Shelf.areaTree[0].children;
  store.item = city[2].children
  const data = city.map(v => {
    //console.log(v.name, geoCoordMap[v.name].concat(v.total.nowConfirm));
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children,
    }
  })


  const charts = echarts.init(document.querySelector('#china') as HTMLElement)

  charts.setOption({

    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "120%",
      itemStyle: {
        //  normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 12,
        opacity: 0.5,
        //  },

      }, emphasis: {
        areaColor: "#0f5d9d",
      },

      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            // normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            // },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        selectedMode: "multiple",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "120%",
        zoom: 1, //当前视角的缩放比例
        //roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 16,
        },
        itemStyle: {
          // normal: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
          //  },

        }, emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: 'pin',
        symbolSize: [45, 45],
        label: {
          //   normal: {
          show: true,
          color: '#fff',
          formatter(value: any) {

            return value.data.value[2]
          }
          //    }
        },
        itemStyle: {
          //   normal: {
          color: '#D8BC37', //标志颜色
          //   }
        },
        data: data,
      },
    ],
  })
  charts.on('click', (e: any) => {
    store.item = e.data.children
    //console.log(e.data.children);
  })
}

const initPie = () => {
  const charts = echarts.init(document.querySelector('.box-left-pie') as HTMLElement)

  console.log(store.cityDetail);


  charts.setOption({
    backgroundColor: '#223651',
    title:{
      text:'每日新增饼图'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15'
          }
        },

        data: store.cityDetail.map(v => {
          return {
            name: v.city,
            value: v.local_confirm_add
          }
        })
      }
    ]

  })
}

const initline = () => {
  const charts = echarts.init(document.querySelector('.box-left-line') as HTMLElement)
  charts.setOption({
    backgroundColor: '#223651',
    title:{
      text:'每日新增线型图',
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: store.cityDetail.map(v => v.city),
      axisLine: {
        linieStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        linieStyle: {
          color: '#fff'
        }
      }
    },
    label: {
      show: true
    },
    series: [
      {
        data: store.cityDetail.map(v => v.local_confirm_add),
        type: 'line',
        smooth: true
      }
    ]
  });
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}

@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;

.table {
  width: 100%;
  background-color: #212028;

  tr {
    th {
      padding: 2px 2px;
      width: 100px;
      white-space: nowrap;
    }
  }
}

html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

.box {
  height: 100%;
  display: flex;
  overflow: hidden;

  &-left {
    width: 425px;

    &-line {
      height: 320px;
      margin-top: 20px;
    }

    &-pie {
      height: 350px;
      width: 425px;
      margin-top: 20px;
    }

    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;

      section {
        background: @itemBg;
        border: 1px solid @itemBorder;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        div:nth-child(2) {
          color: @itemColor;
          padding: 10px 0;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }

  &-center {
    flex: 1;
  }

  &-right {
    width: 400px;
  }
}
</style>