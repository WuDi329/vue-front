<template>
  <el-container>
    <el-header>
      <template>
        <div style="margin-top: 20px">
          <el-select v-model="value" placeholder="please select the process you wanna see" style="margin-right: 20px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button :disabled="disabled" type="primary" :queryloading="false" @click="getPerfExperiment">search</el-button>
          <el-select v-model="value2" placeholder="please select the process you wanna run" style="margin-left: 660px; margin-right: 20px">
            <el-option
              v-for="item in options2"
              :key="item.value2"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button :disabled="disabled" type="primary" :queryloading="false" style="float: right" @click="addPerfExperiment">add</el-button>
        </div>
      </template>
    </el-header>
    <el-main>
      <template>
  <el-table
    :data="list"
    border
    style="width: 100%"
    fit>
    <el-table-column
      fixed
      prop="id"
      align="center"
      label="id"
      width="50px">
    </el-table-column>
    <el-table-column
      prop="elf_name"
      label="elf name"
      align="center"
      width="250px">
    </el-table-column>
    <el-table-column
      prop="params"
      label="params"
      align="center"
      width="250px">
    </el-table-column>
    <el-table-column
      prop="run_time"
      label="run time"
      align="center"
      width="250px"
      :formatter="dateFormat">
    </el-table-column>
    <el-table-column
      prop="cpu_utilize"
      align="center"
      label="cpu utilize"
      width="100px">
    </el-table-column>
    <el-table-column
      prop="instructions"
      align="center"
      label="instructions number"
      width="200px">
    </el-table-column>
    <el-table-column
      prop="branches"
      align="center"
      width="200px"
      label="branches number">
    </el-table-column>
    <el-table-column
      prop="branches_misses"
      align="center"
      width="200px"
      label="branches misses">
    </el-table-column>
    <el-table-column
      prop="l1_dcache"
      align="center"
      width="200px"
      label="l1 dcache">
    </el-table-column>
    <el-table-column
      prop="l1_dcache_misses"
      align="center"
      width="200px"
      label="l1 dcache misses">
    </el-table-column>
    <el-table-column
      prop="llc_cache"
      align="center"
      width="200px"
      label="llc cache">
    </el-table-column>
    <el-table-column
      prop="llc_cache_misses"
      align="center"
      width="200px"
      label="llc cache misses">
    </el-table-column>
    <el-table-column
      prop="l1_icache_misses"
      align="center"
      width="200px"
      label="l1 icache misses">
    </el-table-column>
    <el-table-column
      prop="dtlb_cache"
      align="center"
      width="200px"
      label="dtlb cache">
    </el-table-column>
    <el-table-column
      prop="dtlb_cache_misses"
      align="center"
      width="200px"
      label="dtlb cache misses">
    </el-table-column>
    <el-table-column
      prop="itlb_cache_misses"
      align="center"
      width="200px"
      label="itlb cache misses">
    </el-table-column>
  </el-table>
</template>
    </el-main>
  </el-container>
</template>

<script>
import { addPerf, getAllPerf, getPerf } from '@/api/perf'
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
      getAllPerf().then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
        this.disabled = false
        console.log(this.list)
      })
    },
    dateFormat(row, column) {
      var date = row[column.property]
      return moment(date).format('YY-MM-DD HH:mm:ss')
    },
    addPerfExperiment() {
      this.listLoading = true
      this.disabled = true
      var params = { 'processname': this.value2 }
      addPerf(params).then(response => {
        console.log(response)
        this.listLoading = false
        this.disabled = false
      })
    },
    getPerfExperiment() {
      this.listLoading = true
      this.disabled = true
      var params = { 'processname': this.value }
      getPerf(params).then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
        this.disabled = false
      })
    }
  }
}
</script>
