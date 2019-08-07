<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data(){
        return {
            ruleForm: {
                username: '',
                password: ''
            },
            //校验规则
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true,message: '请输入密码', trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        login(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$api.user.login(this.ruleForm).then(res => {
                        if(res.data.code === 1){
                            this.$message({
                                message: '恭喜你，登录成功',
                                type: 'success'
                            });
                            window.localStorage.setItem('token',res.data.token);
                            
                            this.$router.push('/music')
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>