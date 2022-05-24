<template>
  <el-container>
    <el-header>
      <template>
        <div style="margin-top: 20px">
          <el-select v-model="value" placeholder="please select the process you wanna see" style=" width: 15%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="paramsvalue1" placeholder="please select the params" style="width:15%; margin-left: 1%">
            <el-option
              v-for="item in paramsoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button :disabled="disabled" type="primary" :queryloading="false" style="margin-left: 1%" @click="getSpecificTime">search</el-button>

          <el-select v-model="value2" placeholder="please select the process you wanna run" style="margin-left: 26%; width: 15%">
            <el-option
              v-for="item in options"
              :key="item.value2"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="paramsvalue" placeholder="please select the params" style="margin-left: 1%; width:15%">
            <el-option
              v-for="item in paramsoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button :disabled="disabled" type="primary" :queryloading="false" style="margin-left: 1%" @click="addTimeExperiment">add</el-button>
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
      <el-dialog
        title="新增成功"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>对{{ value2 }}程序的time分析已完成</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">confirm</el-button>
        </span>
      </el-dialog>
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
      dialogVisible: false,
      paramsvalue: ' ',
      paramsvalue1: ' ',
      paramsoptions: [{
        value: ' ',
        label: 'none'
      }, {
        value: ' -n 10000 -c 100 -t 8 localhost:8000/admin',
        label: 'htstress'
      }
      ],
      options: [{
        value: '/home/wudi/Desktop/memtier_benchmark/memtier_benchmark',
        label: 'memtier_benchmark'
      }, {
        value: '/home/wudi/Desktop/mem_sta/memtier_benchmark/memtier_benchmark_static',
        label: 'memtier_benchmark_static'
      }, {
        value: '/home/wudi/Desktop/htstress/htstress',
        label: 'htstress'
      }, {
        value: '/home/wudi/Desktop/hts_sta/htstress/htstress_static',
        label: 'htstress_static'
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
      var params = { 'processname': this.value, 'params': this.paramsvalue1 }
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
      var params = { 'processname': this.value2, 'params': this.paramsvalue }
      addTime(params).then(response => {
        console.log(response)
        this.listLoading = false
        this.disabled = false
        this.dialogVisible = true
      })
    }
  }
}
</script>
