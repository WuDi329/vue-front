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

          <el-button :disabled="disabled" type="primary" :queryloading="false" style="margin-left: 1%" @click="getSizeExperiment">search</el-button>
          <el-select v-model="value2" placeholder="please select the process you wanna run" style="margin-left: 58%; width: 15%">
            <el-option
              v-for="item in options"
              :key="item.value2"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button :disabled="disabled" type="primary" :queryloading="false" style="margin-left: 1%" @click="addSizeExperiment">add</el-button>
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
        <el-table-column label="elf name" prop="elf_name" align="center" />
        <el-table-column label="text length" align="center" prop="text_length">
        <!--  -->
        </el-table-column>
        <el-table-column label="data length" align="center" prop="data_length">
        <!-- width="110" -->
        </el-table-column>
        <el-table-column label="bss length" align="center" prop="bss_length">
        <!-- width="110" -->
        </el-table-column>
        <el-table-column label="total length" align="center" prop="dec_length">
        <!-- width="110" -->
        </el-table-column>
      </el-table>
      <el-dialog
        title="新增成功"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>对{{ value2 }}程序的size分析已完成</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">confirm</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import { addSize, getAllSize, getSize } from '@/api/size'

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
      dialogVisible: false,
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
      getAllSize().then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
        this.disabled = false
        console.log(this.list)
      })
    },
    addSizeExperiment() {
      this.listLoading = true
      this.disabled = true
      var params = { 'processname': this.value2 }
      addSize(params).then(response => {
        console.log(response)
        this.listLoading = false
        this.disabled = false
        this.dialogVisible = true
      })
    },
    getSizeExperiment() {
      this.listLoading = true
      this.disabled = true
      var params = { 'processname': this.value }
      getSize(params).then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
        this.disabled = false
      })
    }
  }
}
</script>
