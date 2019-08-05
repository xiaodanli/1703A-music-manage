<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="registry">注册</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data(){
         var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPassword !== '') {
                    this.$refs.ruleForm.validateField('checkPassword');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                username: '',
                password: '',
                checkPassword: ''
            },
            //校验规则
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true,validator: validatePass, trigger: 'blur'}
                ],
                checkPassword: [
                    {required: true, validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        registry(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$api.user.registry({username:this.ruleForm.username,password:this.ruleForm.password}).then(res => {
                        if(res.data.code === 1){
                            this.$message({
                                message: '恭喜你，注册成功',
                                type: 'success'
                            });
                            this.$router.push('/login')
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