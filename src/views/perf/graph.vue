<template>
  <el-container>
    <el-header>
      <div style="margin-top: 20px">
        <el-select v-model="value" placeholder="please select the process you wanna see" style="margin-left:40%">
          <el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="paramsvalue" placeholder="please select the params" style="margin-left: 1%">
          <el-option
            v-for="item in paramsoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button :disabled="disabled" type="primary" :queryloading="false" style="margin-left:1%" @click="changeData">search</el-button>
        <el-button :disabled="disabled" type="primary" :queryloading="false" style="margin-left:1%" @click="callback">change</el-button>
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
import { getAvgPerf } from '@/api/perf'

export default {
  data() {
    return {
      key: 0,
      instance: null,
      theme: 'light',
      disabled: false,
      value: 'memtier_benchmark',
      data_set: [],
      options: [],
      paramsoptions: [{
        value: ' ',
        label: 'none'
      }],
      paramsvalue: ' ',
      titles: ['123', '456', '789', '101'],
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
      options1: {
        title: [
          { text: 'branches miss percents', left: '15%', top: '35%', textAlign: 'center' },
          { text: 'instructions', textAlign: 'center', left: '83%', top: '75%' },
          { text: 'l1dcache miss percents', textAlign: 'center', left: '35%', top: '35%' },
          { text: 'llcdcache miss percents', textAlign: 'center', left: '59%', top: '35%' },
          { text: 'dtlb miss percents', textAlign: 'center', left: '15%', top: '83%' },
          { text: 'itlb misses', textAlign: 'center', left: '35%', top: '83%' },
          { text: 'l1icache misses', textAlign: 'center', left: '59%', top: '83%' }
        ],
        legend: {},
        tooltip: {},
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
      var params = { 'processname': this.value, 'params': this.paramsvalue }
      getAvgPerf(params).then(response => {
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

        var key_list2 = ['instructions', 'branches_miss_percents', 'l1dcache miss percents', 'llcdcache miss percents', 'dtlb miss percents', 'itlb misses', 'l1icache misses']
        key_list2.unshift('leibie')
        // var value_list11 = [value_list1[1], value_list1[3]/value_list1[2], value_list1[5]/value_list1[4], value_list1[7]/value_list1[6], value_list1[10]/value_list1[9], value_list1[11], value_list1[8]]
        // var value_list22 = [value_list2[1], value_list2[3]/value_list2[2], value_list2[5]/value_list2[4], value_list2[7]/value_list2[6], value_list2[10]/value_list2[9], value_list2[11], value_list2[8]]
        var value_list11 = [value_list1[3] / value_list1[2], value_list1[1], value_list1[5] / value_list1[4], value_list1[7] / value_list1[6], value_list1[10] / value_list1[9], value_list1[11], value_list1[8]]
        var value_list22 = [value_list2[3] / value_list2[2], value_list2[1], value_list2[5] / value_list2[4], value_list2[7] / value_list2[6], value_list2[10] / value_list2[9], value_list2[11], value_list2[8]]
        value_list11.unshift(pname)
        value_list22.unshift(pname + '_static')

        console.log(key_list)
        console.log(value_list1)
        console.log(value_list2)
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        console.log(key_list2)
        console.log(value_list11)
        console.log(value_list22)

        this.options1.series[1].encode.itemName = key_list2[0]
        this.options1.series[1].encode.value = key_list2[2]
        this.options1.series[2].encode.itemName = key_list2[0]
        this.options1.series[2].encode.value = key_list2[3]
        this.options1.series[3].encode.itemName = key_list2[0]
        this.options1.series[3].encode.value = key_list2[4]
        this.options1.series[4].encode.itemName = key_list2[0]
        this.options1.series[4].encode.value = key_list2[5]
        this.options1.series[5].encode.itemName = key_list2[0]
        this.options1.series[5].encode.value = key_list2[6]
        this.options1.series[6].encode.itemName = key_list2[0]
        this.options1.series[6].encode.value = key_list2[7]
        this.options1.dataset.source = [key_list2, value_list11, value_list22]
        this.key = 0
        this.drawEcharts(this.options0)
        this.disabled = false
      })
    },

    callback() {
      console.log('this is callback')
      console.log(this.options0.dataset.source)
      console.log(this.key)
      this.instance.clear()
      this.drawEcharts(this.options[1 - this.key])
      this.key = 1 - this.key
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
