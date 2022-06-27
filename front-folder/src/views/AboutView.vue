<template>
  <div class="register">
    <el-form ref="registerForm" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="form.password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="form.checkPassword" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="submit('registerForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import userApi from '../api/user'
export default {
  data() {
    let validatorPass = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请输入密码'))
      } else {
        if (!!this.form.checkPassword) {
          this.$refs.registerForm.validateField('checkPassword')
        }
        callback()
      }
    }
    let validatorPass2 = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次秘密输入不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        password: '',
        checkPassword: '',
      },
      rules: {
        name: [{ required: true, message: '请输入账号' }],
        password: [
          { required: true, validator: validatorPass, trigger: 'blur' },
        ],
        checkPassword: [
          { required: true, validator: validatorPass2, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userApi
            .registerUser({
              name: this.form.name,
              password: this.form.password,
            })
            .then((res) => {
              this.$message.success('新增成功')
              this.$router.push('/')
            }).catch(err => {
              this.$message.error(err.response.data.data)
            })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss">
.register {
  width: 500px;
  margin: auto;
}
</style>
