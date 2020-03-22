<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" clearable placeholder="姓名" />
      </el-form-item>
      <el-form-item label="激活状态">
        <el-select v-model="formInline.isActive" placeholder="激活状态" clearable >
          <el-option label="未激活" value="0" />
          <el-option label="已激活" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="toAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      :stripe="true"
      :border="true"
      :highlight-current-row="true"
      style="width: 100%"
    >
      <el-table-column label="姓名" min-width="15%">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>爱好: {{ scope.row.hobby }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="10%">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sex==1?'男':'女' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份" min-width="10%">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.identity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出生日期" min-width="15%">
        <template slot-scope="scope">
          <span>{{ new Date(scope.row.birthday).toLocaleString().split(' ')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="爱好" min-width="20%">
        <template slot-scope="scope">
          {{ scope.row.hobby }}
        </template>
      </el-table-column>
      <el-table-column label="个人介绍" min-width="25%">
        <template slot-scope="scope">
          {{ scope.row.introduce }}
        </template>
      </el-table-column>
      <el-table-column label="是否激活" min-width="10%">
        <template slot-scope="scope">
          <el-switch :value="scope.row.isActive==1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="20%">
        <template slot-scope="scope">
          <el-button
            round
            type="primary"
            size="mini"
            @click="toEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-popconfirm
            title="确定删除该条记录吗？"
            style="margin-left: 10px"
            @onConfirm="deleteConfirm(scope.row.id)"
          >
            <el-button slot="reference" round size="mini" type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center;margin-top: 5px"
      background
      layout="sizes, prev, pager, next, ->, total"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="totalSize"
      @size-change="changeSize"
      @current-change="changeCurrPage"
    />
    <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
      <el-form ref="demoForm" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-select v-model="form.identity" placeholder="请选择身份">
            <el-option v-for="dti in identitys" :label="dti" :key="dti" :value="dti"/>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-col :span="11">
            <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期" style="width: 100%;" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"/>
          </el-col>
        </el-form-item>
        <el-form-item label="业余爱好" prop="hobbyArr">
          <el-checkbox-group v-model="hobbyArr">
            <el-checkbox v-for="h in hobbys" :label="h" :key="h">{{h}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否激活" prop="isActive">
          <el-switch v-model="form.isActive" :active-value="1" :inactive-value="0"/>
        </el-form-item>
        <el-form-item label="自我介绍" prop="introduce">
          <el-input v-model="form.introduce" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      hobbys: ['篮球', '羽毛球', '乒乓球', '游泳'],
      identitys: ['学生', '人大代表', '码农', '其他'],
      hobbyArr: [],
      formInline: {
        name: '',
        isActive: ''
      },
      form: {
        name: '',
        identity: '',
        birthday: '',
        hobby: '',
        sex: '',
        isActive: '',
        introduce: ''
      },
      formLabelWidth: '100px',
      dialogFormVisible: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalSize: 0,
      addOrEdit: ''
    }
  },
  mounted() {
    this.initData()
  },
  watch: {
    hobbyArr: function(newVal) {
      this.form.hobby = newVal.join(',')
    }
  },
  methods: {
    initData() {
      const param = Object.assign({
        size: this.pageSize,
        currPage: this.currentPage
      }, this.formInline)
      this.$store.dispatch('demo/list', param)
        .then((response) => {
          this.tableData = response.data.list
          this.totalSize = response.data.total
        })
        .catch((error) => {
          console.log('初始化demo列表错误：' + error)
        })
    },
    changeSize(size) {
      this.pageSize = size
      this.initData()
    },
    changeCurrPage(currPage) {
      this.currentPage = currPage
      this.initData()
    },
    onSubmit() {
      this.initData()
    },
    add() {
      this.$store.dispatch('demo/' + this.addOrEdit, this.form)
        .then((response) => {
          this.dialogFormVisible = false
          this.initData()
          this.$message.success('操作成功!')
        })
        .catch((error) => {
          this.$message.error('操作失败：' + error)
        })
    },
    deleteConfirm(id) {
      this.$store.dispatch('demo/del', id)
        .then((response) => {
          this.initData()
          this.$message.success('操作成功!')
        })
        .catch((error) => {
          this.$message.error('操作失败：' + error)
        })
    },
    initForm() {
      this.hobbyArr = []
      this.$refs.demoForm.resetFields()
    },
    toAdd() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.initForm()
      })
      this.addOrEdit = 'add'
    },
    toEdit(index, rowData) {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.form = Object.assign({}, rowData)
        this.hobbyArr = rowData.hobby.split(',')
        this.addOrEdit = 'edit'
      })
    }
  }
}
</script>

<style scoped>

</style>
