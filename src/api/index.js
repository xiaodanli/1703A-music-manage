import request from '@/utils/request'

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
        del:data => request.get('/api/deletemusic',data)
    }
}

export default api