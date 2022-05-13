<template>
  <el-container>
    <el-header>
      <template>
        <div style="margin-top: 20px">
          <el-select v-model="value" placeholder="please select the process you wanna see" style="width:15%">
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
          <el-button :disabled="disabled" type="primary" :queryloading="false" style="margin-left:1%" @click="getPerfExperiment">search</el-button>
          <el-select
            v-model="value2"
            placeholder="please select the process you wanna run"
            style="margin-left: 26%; width:15%"
          >
            <el-option
              v-for="
                item
                  in
                    options"
              :key="item.value"
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
          <el-button :disabled="disabled" type="primary" :queryloading="false" style="margin-left: 1%" @click="addPerfExperiment">add</el-button>
        </div>
      </template>
    </el-header>
    <el-main>
      <template>
        <el-table
          v-loading="listLoading"
          :data="list"
          border
          style="width: 100%"
          element-loading-text="Loading"
          fit
        >
          <el-table-column
            fixed
            prop="id"
            align="center"
            label="id"
            width="50px"
          />
          <el-table-column
            prop="elf_name"
            label="elf name"
            align="center"
            width="250px"
          />
          <el-table-column
            prop="params"
            label="params"
            align="center"
            width="250px"
          />
          <el-table-column
            prop="run_time"
            label="run time"
            align="center"
            width="250px"
            :formatter="dateFormat"
          />
          <el-table-column
            prop="cpu_utilize"
            align="center"
            label="cpu utilize"
            width="100px"
          />
          <el-table-column
            prop="instructions"
            align="center"
            label="instructions number"
            width="200px"
          />
          <el-table-column
            prop="branches"
            align="center"
            width="200px"
            label="branches number"
          />
          <el-table-column
            prop="branches_misses"
            align="center"
            width="200px"
            label="branches misses"
          />
          <el-table-column
            prop="l1_dcache"
            align="center"
            width="200px"
            label="l1 dcache"
          />
          <el-table-column
            prop="l1_dcache_misses"
            align="center"
            width="200px"
            label="l1 dcache misses"
          />
          <el-table-column
            prop="llc_cache"
            align="center"
            width="200px"
            label="llc cache"
          />
          <el-table-column
            prop="llc_cache_misses"
            align="center"
            width="200px"
            label="llc cache misses"
          />
          <el-table-column
            prop="l1_icache_misses"
            align="center"
            width="200px"
            label="l1 icache misses"
          />
          <el-table-column
            prop="dtlb_cache"
            align="center"
            width="200px"
            label="dtlb cache"
          />
          <el-table-column
            prop="dtlb_cache_misses"
            align="center"
            width="200px"
            label="dtlb cache misses"
          />
          <el-table-column
            prop="itlb_cache_misses"
            align="center"
            width="200px"
            label="itlb cache misses"
          />
        </el-table>
      </template>
      <el-dialog
        title="新增成功"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>对{{ value2 }}程序的perf分析已完成</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">confirm</el-button>
        </span>
      </el-dialog>
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
      paramsvalue: ' ',
      paramsvalue1: ' ',
      queryloading: false,
      disabled: true,
      dialogVisible: false,
      paramsoptions: [{
        value: ' ',
        label: 'none'
      }],
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
    handleClose(done) {
      this.$confirm('confirm').then(_ => {
        done()
      })
        .catch(_ => {})
    },
    dateFormat(row, column) {
      var date = row[column.property]
      return moment(date).format('YY-MM-DD HH:mm:ss')
    },
    addPerfExperiment() {
      this.listLoading = true
      this.disabled = true
      var params = { 'processname': this.value2, 'params': this.paramsvalue }
      addPerf(params).then(response => {
        console.log(response)
        this.listLoading = false
        this.disabled = false
        this.dialogVisible = true
      })
    },
    getPerfExperiment() {
      this.listLoading = true
      this.disabled = true
      var params = { 'processname': this.value, 'params': this.paramsvalue1 }
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
