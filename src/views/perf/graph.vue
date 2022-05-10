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
          { text: 'text_length', textAlign: 'center', left: '25%', top: '45%' },
          { text: 'data_length', left: '75%', top: '45%', textAlign: 'center' },
          { text: 'bss_length', textAlign: 'center', left: '25%', top: '90%' },
          { text: 'total_length', textAlign: 'center', left: '75%', top: '90%' }
        ],
        legend: {},
        tooltip: {},
        dataset: {
          source: []
        },
        series: [
          {
            type: 'pie',
            radius: '20%',
            center: ['25%', '30%'],
            title: {
              text: 'lalalalla',
              left: '%20',
              top: '%25'
            },
            label: {
              normal: {
                formatter: '{d}%',
                textStyle: {
                  fontSize: 18
                }
              }
            }
          },
          {
            type: 'pie',
            radius: '20%',
            center: ['75%', '30%'],
            encode: {
              itemName: '',
              value: ''
            },
            label: {
              normal: {
                formatter: '{d}%',
                textStyle: {
                  fontSize: 18
                }
              }
            }
          },
          {
            type: 'pie',
            radius: '20%',
            center: ['25%', '75%'],
            encode: {
              itemName: '',
              value: ''
            },
            label: {
              normal: {
                formatter: '{d}%',
                textStyle: {
                  fontSize: 18
                }
              }
            }
          },
          {
            type: 'pie',
            radius: '20%',
            center: ['75%', '75%'],
            encode: {
              itemName: '',
              value: ''
            },
            label: {
              normal: {
                formatter: '{d}%',
                textStyle: {
                  fontSize: 18
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
        this.options1.series[1].encode.itemName = key_list[0]
        this.options1.series[1].encode.value = key_list[2]
        this.options1.series[2].encode.itemName = key_list[0]
        this.options1.series[2].encode.value = key_list[3]
        this.options1.series[3].encode.itemName = key_list[0]
        this.options1.series[3].encode.value = key_list[4]
        this.options1.dataset.source = data_set
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
