<template>
    <el-container class="music-wrap">
        <el-header>
            <span>欢迎：xxx</span>
            <el-button size="mini">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>
                <el-button @click="dialogVisible = true">添加</el-button>
                <el-table
                    :data="musicList"
                    style="width: 100%;margin-top:10px;">
                    <el-table-column label="序号">
                        <template slot-scope="scope">
                            <div>
                                {{scope.$index+1}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="歌名" prop="music_name"></el-table-column>
                    <el-table-column label="歌手" prop="singer_name"></el-table-column>
                    <el-table-column label="图片" prop="pic">
                        <template slot-scope="scope">
                            <img :src="scope.row.pic" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column label="是否上架" prop="isup"></el-table-column>
                    <el-table-column>
                        <template slot="header" slot-scope="scope">
                            操作
                        </template>
                        <template slot-scope="scope">
                            <el-button
                            size="mini">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                
            </el-main>
        </el-container>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form :model="music" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="歌名" prop="music_name">
                    <el-input type="text" v-model="music.music_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="歌手" prop="singer_name">
                    <el-input type="password" v-model="music.singer_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上传图片" prop="pic">
                    <input type="file">
                </el-form-item>
                <el-form-item label="是否上架" prop="isup">
                    <el-radio-group v-model="music.isup">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">添加</el-button>
            </span>
            </el-dialog>
    </el-container>  
</template>
<script>
export default {
    data(){
        return {
            musicList: [],
            dialogVisible:true,
            music:{
                music_name:'',
                singer_name:'',
                pic:'',
                isup:'是'
            },
            rules:{
                music_name: [
                    {required: true, message: '请输入歌名', trigger: 'blur'}
                ],
                singer_name: [
                    {required: true,message: '请输入歌手', trigger: 'blur'}
                ],
                pic: [
                    {required: true,message: '请选择图片', trigger: 'blur'}
                ]
            }
        }
    },
    created(){
        this.$api.music.getList().then(res => {
            console.log(res);
            if(res.data.code === 1){
                this.musicList = res.data.data
            }
        })
    }
}
</script>
<style lang="scss" scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: right;
  }

  .el-header{
      text-align: right;
  }

  .music-wrap{
    height:100%;
  }
</style>