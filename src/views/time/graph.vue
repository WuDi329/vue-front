<template>
  <el-container>
    <el-header>
      <div style="margin-top: 20px; float: right">
        <el-select v-model="value" placeholder="please select the process you wanna see">
          <el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>

        <el-button :disabled="disabled" type="primary" :queryloading="false" style="margin-left:20px" @click="changeData">search</el-button>
        <el-button :disabled="disabled" type="primary" :queryloading="false" style="margin-left:20px" @click="callback">change</el-button>
      </div>
    </el-header>
    <el-main>
      <div class="container">
        <template>
          <div ref="hbar" class="chart-container" />
        </template>
      </div>
    </el-main>
  </el-container></template>

<script>
import * as echarts from 'echarts'
import { getAvgTime } from '@/api/time'

export default {
  data() {
    return {
      instance: null,
      theme: 'light',
      disabled: false,
      value: 'memtier_benchmark',
      key: 0,
      options: [],
      options0: {
        legend: {},
        tooltip: {},
        dataset: {
          source: []
        },
        xAxis: { type: 'category' },
        yAxis: { type: 'log' },
        series: [{ type: 'bar', seriesLayoutBy: 'row' }, { type: 'bar', seriesLayoutBy: 'row' }]
      },
      data_set: [],

      options1: {
        legend: {},
        tooltip: {},
        title: [
          { text: 'user time(s)', textAlign: 'center', left: '15%', top: '35%' },
          { text: 'sys time(s)', left: '35%', top: '37%', textAlign: 'center' },
          { text: 'cpu percent(%)', textAlign: 'center', left: '59%', top: '35%' },
          { text: 'elapse time(s)', textAlign: 'center', left: '15%', top: '83%' },
          { text: 'max size(KB)', textAlign: 'center', left: '83%', top: '75%' },
          { text: 'page fault(times)', textAlign: 'center', left: '37%', top: '83%' },
          { text: 'minor page fault(times)', textAlign: 'center', left: '59%', top: '83%' }
        ],
        dataset: {
          source: []
        },
        series: [
          {
            type: 'pie',
            radius: '18%',
            center: ['15%', '22%'],
            label: {
              normal: {
                formatter: '{d}%',
                textStyle: {
                  fontSize: 15
                }
              }
            }
          },
          {
            type: 'pie',
            radius: '18%',
            center: ['37%', '22%'],
            encode: {
              itemName: '',
              value: ''
            },
            label: {
              normal: {
                formatter: '{d}%',
                textStyle: {
                  fontSize: 15
                }
              }
            }
          },
          {
            type: 'pie',
            radius: '18%',
            center: ['59%', '22%'],
            encode: {
              itemName: '',
              value: ''
            },
            label: {
              normal: {
                formatter: '{d}%',
                textStyle: {
                  fontSize: 15
                }
              }
            }
          },
          {
            type: 'pie',
            radius: '18%',
            center: ['15%', '70%'],
            encode: {
              itemName: '',
              value: ''
            },
            label: {
              normal: {
                formatter: '{d}%',
                textStyle: {
                  fontSize: 15
                }
              }
            }
          },
          {
            type: 'pie',
            radius: '45%',
            center: ['83%', '46%'],
            encode: {
              itemName: '',
              value: ''
            },
            label: {
              normal: {
                formatter: '{d}%',
                textStyle: {
                  fontSize: 15
                }
              }
            }
          },
          {
            type: 'pie',
            radius: '18%',
            center: ['37%', '70%'],
            encode: {
              itemName: '',
              value: ''
            },
            label: {
              normal: {
                formatter: '{d}%',
                textStyle: {
                  fontSize: 15
                }
              }
            }
          },
          {
            type: 'pie',
            radius: '18%',
            center: ['59%', '70%'],
            encode: {
              itemName: '',
              value: ''
            },
            label: {
              normal: {
                formatter: '{d}%',
                textStyle: {
                  fontSize: 15
                }
              }
            }
          }
        ]
      },
      option: [{
        value: '/home/wudi/Desktop/memtier_benchmark/memtier_benchmark',
        label: 'memtier_benchmark'
      }, {
        value: '/home/wudi/Desktop/mem_sta/memtier_benchmark/memtier_benchmark_static',
        label: 'memtier_benchmark_static'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  created() {
    this.getData()
    this.options = [this.options0, this.options1]
  },
  mounted() {
  },
  methods: {
    changeData() {
      this.disabled = true
      this.instance.clear()
      this.getData()
      this.disabled = false
    },
    getData() {
      this.disabled = true
      var params = { 'processname': this.value }
      getAvgTime(params).then(response => {
        console.log('getresponseeeee')
        console.log(response)
        const pname = response.elf_name

        var key_list = Object.keys(response.data[0])
        var value_list1 = Object.values(response.data[0])
        var value_list2 = Object.values(response.data[1])

        key_list.unshift('leibie')
        value_list1.unshift(pname)
        value_list2.unshift(pname + '_static')
        var data_set = [key_list, value_list1, value_list2]
        this.options0.dataset.source = data_set
        this.options1.series[1].encode.itemName = key_list[0]
        this.options1.series[1].encode.value = key_list[2]
        this.options1.series[2].encode.itemName = key_list[0]
        this.options1.series[2].encode.value = key_list[3]
        this.options1.series[3].encode.itemName = key_list[0]
        this.options1.series[3].encode.value = key_list[4]
        this.options1.series[4].encode.itemName = key_list[0]
        this.options1.series[4].encode.value = key_list[5]
        this.options1.series[5].encode.itemName = key_list[0]
        this.options1.series[5].encode.value = key_list[6]
        this.options1.series[6].encode.itemName = key_list[0]
        this.options1.series[6].encode.value = key_list[7]
        this.options1.dataset.source = data_set
        this.key = 0
        this.drawEcharts(this.options0)
        this.disabled = false
      })
    },
    callback() {
      this.disabled = true
      this.instance.clear()
      this.drawEcharts(this.options[1 - this.key])
      this.key = 1 - this.key
      this.disabled = false
    },
    drawEcharts(option) {
      debugger
      console.log('option init')
      console.log(option)
      // get the dom of chart
      const dom = this.$refs.hbar
      if (dom) {
        console.log('aaaaaaa')
        // new the echarts instance
        this.instance = echarts.init(dom, this.theme)
        console.log(this.instance)
        console.log('here is instanceeeeee')
        // save the configurations
        this.instance.setOption(option)
      }
    }
  }
}
</script>

<style>
.container{
  height: 80vh;
  width: 80vw
}
.chart-container{
     height: 100%;
     width: 100%
}
</style>
