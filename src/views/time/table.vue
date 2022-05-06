<template>
  <el-container>
    <el-header>
      <template>
        <div style="margin-top: 20px">
          <el-select v-model="value" placeholder="please select the process you wanna see">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button :disabled="disabled" type="primary" :queryloading="false" style="margin-left:20px" @click="getSpecificTime">search</el-button>

          <el-select v-model="value2" placeholder="please select the process you wanna run" style="margin-left: 660px; margin-right: 20px">
            <el-option
              v-for="item in options2"
              :key="item.value2"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button :disabled="disabled" type="primary" :queryloading="false" style="float: right" @click="addTimeExperiment">add</el-button>
        </div>
      </template>
    </el-header>
    <el-main>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" prop="id" width="95">
        <!-- width="95" -->
        <!-- {{ scope.row.id }} -->
        </el-table-column>
        <el-table-column label="run date" prop="run_time" :formatter="dateFormat">
        <!--  -->
        </el-table-column>
        <el-table-column label="elf name" prop="elf_name" width="180" align="center" />
        <el-table-column label="user time(s)" align="center" prop="user_time">
        <!-- width="110" -->
        </el-table-column>
        <el-table-column label="system time(s)" align="center" prop="sys_time">
        <!-- width="110" -->
        </el-table-column>
        <el-table-column label="elapse time(s)" align="center" prop="elapse_time">
        <!-- width="110" -->
        </el-table-column>
        <el-table-column key="slot" label="user percent" align="center">
          <template #default="{row}">
            <span>{{ getrate(row.user_time, row.sys_time) }}</span>
          </template>
        <!-- width="110" -->
        </el-table-column>
        <el-table-column label="cpu percent(%)" align="center" prop="cpu_per">
        <!-- width="110" -->
        </el-table-column>
        <el-table-column align="center" prop="max_size" label="max size(kb)">
        <!-- width="200" -->
        </el-table-column>
        <el-table-column align="center" prop="page_fault" label="page fault">
        <!-- width="200" -->
        </el-table-column>
        <el-table-column align="center" prop="mpage_fault" label="minor page fault">
        <!-- width="200" -->
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { getTime, getAllTime, addTime } from '@/api/time'
import moment from 'moment'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      value: '/home/wudi/Desktop/memtier_benchmark/memtier_benchmark',
      value2: '/home/wudi/Desktop/memtier_benchmark/memtier_benchmark',
      queryloading: false,
      disabled: true,
      options: [{
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
      }],
      options2: [{
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
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      this.disabled = true
      getAllTime().then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
        this.disabled = false
        console.log(this.list)
      })
    },
    getSpecificTime() {
      this.listLoading = true
      var params = { 'processname': this.value }
      getTime(params).then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
        console.log(this.list)
      })
    },
    dateFormat(row, column) {
      var date = row[column.property]
      return moment(date).format('YY-MM-DD HH:mm:ss')
    },
    getrate(user, sys) {
      user = Number(user)
      sys = Number(sys)
      return (user / (user + sys)).toFixed(2)
    },
    addTimeExperiment() {
      this.listLoading = true
      this.disabled = true
      var params = { 'processname': this.value2 }
      addTime(params).then(response => {
        console.log(response)
        this.listLoading = false
        this.disabled = false
      })
    }
  }
}
</script>
