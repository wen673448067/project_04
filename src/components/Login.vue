<template>
    <div class="login_container">
        <div class="login_box">
        <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="" />
            </div>
        
        <!-- 登录表单区域 -->
        <el-form ref="loginFormRef" label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules">
            <!-- 用户名 -->
            <el-form-item prop="username">
            <el-input 
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
                <el-input 
                prefix-icon="iconfont icon-3702mima"
                v-model="loginForm.password" type="password"></el-input>
              </el-form-item>
              <!-- 按钮 -->
              <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
              </el-form-item>
        </el-form>
          </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 这是登录表单的数据绑定对象
            loginForm: {
                username: 'admin',
                password:'123456'
            },
            // 这是表单的验证规则对象
            loginFormRules: {
                // 验证用户名是否合法(注意是个数组)
                username: [
                    { required: true, message: '请输入登录名称', trigger: 'blur' },
                    {
                        min: 3,
                        max: 10,
                        message: '长度在3到10个字符',
                        trigger:'blur'
                    }
                ],
                // 验证用户密码是否合法
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    {
                        min: 6,
                        max: 15,
                        message: '长度在6到15个字符',
                        trigger:'blur'
                    }
                ]
            }
        }
    },
    methods: {
        // 点击重置按钮，重置登录表单
        resetLoginForm() {
          this.$refs.loginFormRef.resetFields()  
        },
        login() {
            this.$refs.loginFormRef.validate(async (valid) => {
                // valid:true或者是false
                // console.log(valid);
                if (!valid) return
                // 解构出服务器端返回的数据当中的data数据，并将其重命名为result
                const { data: result } = await this.$http.post('login', this.loginForm)
                if (result.meta.status !== 200) return this.$message.error('登录失败')
                this.$message.success('登录成功')
                // 登录成功之后，需要将后台返回的token保存到sessionStorage中
                window.sessionStorage.setItem('token', result.data.token)
                // 操作完毕之后，需要通过编程式导航（不采用路由规则的方式）跳转到/home后台主页
                this.$router.push('/home')

            })
        }
    }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}
.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding:10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.login_form{
    width: 100%;
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    padding: 0 20px;
}
.btns{
    // 弹性盒模型
    display: flex;
    // 横轴对齐；尾部对齐
    justify-content:flex-end ;
}
</style>