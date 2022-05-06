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

        <el-button :disabled="disabled" type="primary" :queryloading="false" style="margin-left:20px" @click="getData">search</el-button>
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
      data_key_list: [],
      data_value1: [],
      data_value2: [],
      options: {
        title: {
          text: 'titletiletitle'
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
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
  mounted() {
    // get the chart dom
    this.chartInit()
  },
  methods: {
    getData() {
      this.disabled = true
      var params = { 'processname': this.value }
      getAvgTime(params).then(response => {
        console.log(response)
        const pname = response.elf_name

        var key_list = Object.keys(response.data[0])
        var value_list1 = Object.values(response.data[0])
        var value_list2 = Object.values(response.data[0])
        key_list.unshift('shuxing')
        value_list1.unshift('pname')
        value_list2.unshift(pname + '_static')

        console.log(key_list)
        console.log(value_list1)
        console.log(value_list2)
        this.instance.setOption({
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              key_list,
              value_list1,
              value_list2
            ]
          },
          xAxis: { type: 'category' },
          yAxis: { type: 'log' },
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [{ type: 'bar', seriesLayoutBy: 'row' }, { type: 'bar', seriesLayoutBy: 'row' }]
        })
        this.disabled = false
      })
    },
    chartInit() {
      // get the dom of chart
      const dom = this.$refs.hbar
      // new the echarts instance
      this.instance = echarts.init(dom, this.theme)
      // save the configurations
      this.instance.setOption(this.options)
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
