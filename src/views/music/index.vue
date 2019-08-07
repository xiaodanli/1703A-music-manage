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
                    <el-table-column label="是否上架" prop="isup">
                        <template slot-scope="scope">
                            <div>
                                {{scope.row.isup === '1' ? '上架':'下架'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot="header" slot-scope="scope">
                            操作
                        </template>
                        <template slot-scope="scope">
                            <el-button
                            size="mini" @click="edit(scope.row.id)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger" @click="openDelDialog(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                
            </el-main>
        </el-container>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            @close="reset">
            <el-form :model="music" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="歌名" prop="music_name">
                    <el-input type="text" v-model="music.music_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="歌手" prop="singer_name">
                    <el-input type="text" v-model="music.singer_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上传图片" prop="pic">
                    <input type="file" @change="upload">
                    <img :src="music.pic" alt="">
                </el-form-item>
                <el-form-item label="是否上架" prop="isup">
                    <el-radio-group v-model="music.isup">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="add">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="提示"
            :visible.sync="isDel"
            width="30%"
            center>
            <span>是否要删除此歌曲？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDel = false">取 消</el-button>
                <el-button type="primary" @click="del">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>  
</template>
<script>
export default {
    data(){
        return {
            musicList: [],
            dialogVisible:false,
            music:{
                music_name:'',
                singer_name:'',
                pic:'',
                isup:'1'
            },
            editId:'',
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
            },
            isDel:false,
            delId:''
        }
    },
    created(){
        this.$api.music.getList().then(res => {
            console.log(res);
            if(res.data.code === 1){
                this.musicList = res.data.data
            }
        })
    },
    methods:{
        upload(e){
            let file = e.target.files;
            let formData = new FormData();
            formData.append('file',file[0]);
            this.$api.music.upload(formData).then(res => {
                if(res.data.code === 1){
                    this.music.pic = 'http://localhost:3000'+res.data.url
                }
            })
        },
        reset(){
            this.music = {
                music_name:'',
                singer_name:'',
                isup:'1',
                pic:''
            }
        },
        add(){
            // 1.添加歌曲  2.修改已添加的歌曲
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    if(this.editId){
                        //编辑
                        this.$api.music.edit({...this.music,id:this.editId}).then(res => {
                            if(res.data.code === 1){
                                this.$message({
                                    message: '修改',
                                    type: 'success'
                                });
                                this.dialogVisible = false;
                                let index = this.musicList.findIndex(item => item.id === this.editId);
                                this.musicList.splice(index,1,{...this.music,id:this.editId});
                                this.reset();
                            }
                        })
                    }else{
                        //添加
                        this.$api.music.add(this.music).then(res=>{
                            if(res.data.code === 1){
                                this.$message({
                                    message: '歌曲成功',
                                    type: 'success'
                                });
                                this.dialogVisible = false;
                                let target = this.music;
                                target.id = res.data.id;
                                if(this.music.isup === '1'){
                                    this.musicList.unshift(target);
                                }
                            }else if(res.data.code === 2){
                                this.$message({
                                    message: '该歌曲已经添加',
                                    type: 'warning'
                                });
                            }else{
                                this.$message({
                                    message: '添加失败',
                                    type: 'error'
                                });
                            }
                            this.reset();
                        })
                    }
                }
            })
        },
        edit(id){
            let editObj = this.musicList.find(item => item.id === id);
            this.dialogVisible = true;
            this.music.music_name = editObj.music_name;
            this.music.singer_name = editObj.singer_name;
            this.music.isup = editObj.isup;
            this.music.pic = editObj.pic;
            this.editId = editObj.id;
        },
        del(){
            this.$api.music.del({id:this.delId}).then(res => {
                if(res.data.code === 1){
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    let index = this.musicList.findIndex(item => item.id === this.delId);
                    this.musicList.splice(index,1);
                    this.isDel = false;
                }
            })
        },
        openDelDialog(id){
            this.isDel = true;
            this.delId = id;
        }
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