import request from '@/utils/request'

// 专门管理接口

let api = {
    user:{
        registry:data => request.post('/api/registry',data),
        login:data => request.post('/api/login',data)
    },
    music:{
        getList:() => request.get('/api/querymusic')
    }
}

export default api