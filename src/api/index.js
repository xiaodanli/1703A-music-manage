import request from '@/utils/request'
import {commonParam,options} from './config'
import jsonp from '@/utils/jsonp'

// 专门管理接口

let api = {
    user:{
        registry:data => request.post('/api/registry',data),
        login:data => request.post('/api/login',data),
        userinfo:() => request.get('/api/userinfo')
    },
    music:{
        getList:data => request.get('/api/querymusic',data),
        upload:data => request.post('/api/upload',data),
        add:data => request.post('/api/addmusic',data),
        edit:data => request.post('/api/updatemusic',data),
        del:data => request.get('/api/deletemusic',data),
        singer:() => {
            let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
            let data = Object.assign({},commonParam,{
                hostUin: 0,
                needNewCode: 0,
                platform: 'yqq',
                order: 'listen',
                begin: 0,
                num: 80,
                songstatus: 1,
                singermid: '0025NhlN2yWrP4'
            })
            return jsonp(url,data,options)
        }
    }
}


export default api