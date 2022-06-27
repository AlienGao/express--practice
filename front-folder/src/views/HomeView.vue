<template>
  <div class="home">
    <el-form ref="login" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-form-item label="验证码" prop="code" class="code">
        <el-input v-model="form.code"></el-input>
        <div v-html="codeImg" @click="getCode"></div>
      </el-form-item>
      <el-form-item>
        <el-button round type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src
import userApi from '@/api/user'

export default {
  data() {
    return {
      form: {
        name: undefined,
        password: undefined,
        code: undefined,
      },
      rules: {
        name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          },
        ],
      },
      codeImg: null,
    }
  },
  name: 'HomeView',
  components: {},
  created() {
    this.getCode()
    userApi.getUser().then((res) => {
      console.log(res)
    })
  },
  mounted() {},
  methods: {
    getCode() {
      userApi.getCode().then((res) => {
        this.codeImg = res
      })
    },
    onSubmit() {
      this.$refs.login.validate((valid, object) => {
        if (valid) {
          userApi
            .login({
              name: this.form.name,
              password: this.form.password,
              code: this.form.code,
            })
            .then((res) => {
              this.$message.success('登录成功')
              this.$store.dispatch('storeToken', res.token)
              localStorage.token = res.token
            })
            .catch((e) => {
              this.$message.error(e.response.data.data)
              this.getCode()
            })
        }
      })
    },
  },
}
</script>

<style lang="scss">
.home {
  width: 500px;
  height: auto;
  margin: auto;
  .code {
    .el-form-item__content {
      display: flex;
      div {
        height: 40px;
      }
      svg {
        display: inline-block;
        height: 40px;
      }
    }
  }
}
</style>
