<template>
  <div style="margin-right: 10px">
    <el-image style="width: 50px; height: 50px;top: 5px" :lazy='true' :src="logoImgPath" fit="fit"></el-image>
    <span style="font-size: 30px;color: yellow;margin-left: 20px">XXX分局执法办案中心信息化系统</span>
    <el-dropdown class="dropdownItem">
      <span class="el-dropdown-link">
        <i class="el-icon-s-custom"></i>
        {{userName}}<i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>历史通知</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-badge :value="12" class="badgeItem">
      <el-button size="small" class="el-icon-message-solid">通 知</el-button>
    </el-badge>
  </div>
</template>

<script>
import logJpg from '@/assets/img/logo.jpg'
export default {
  name: 'Header',
  data() {
    return {
      logoImgPath: logJpg,
      userName: '張三風'
    }
  }
}
</script>

<style scoped>
  .dropdownItem {
    margin-top: 15px;
    float: right;
  }

  .badgeItem {
    margin-top: 15px;
    margin-right: 30px;
    float: right;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: yellow;
    font-size: 18px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
    margin-top: 15px;
  }
</style>
