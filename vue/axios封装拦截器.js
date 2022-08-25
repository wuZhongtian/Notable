import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1/',
    timeout: 5000
})
instance.interceptors.request.use(config => {
    // 在发送请求之前执行，打印请求的配置信息
    console.log(config);
    if (xxx) {
        // 当符合条件时，返回空值即 拦截要发送请求
        return "";
    }
    // 返回config，则发送请求
    return config
}), err => {
    return Promise.reject(err)
}
instance.interceptors.response.use(res => {
    // 在接受到响应信息之前执行,打印服务器响应的信息
    console.log(res);
    // 可以对返回的数据进行处理，再返回出去
    return res;
}), err => {
    return Promise.reject(err)
};
// 向外暴露instance
export default instance;



// import Vue from 'vue'
// import axios from 'axios'
// import store from '@/store'
// import { message, Modal, notification } from 'ant-design-vue' /// es/notification
// import { VueAxios } from './axios'

// // 创建 axios 实例
// const service = axios.create({
//   baseURL: '/edge/automatic-warehouse', // api base_url
//   // timeout: 6000 // 请求超时时间
// })

// const err = (error) => {
//   if (error.response) {
//     const data = error.response.data
//     // const token = Vue.ls.get(ACCESS_TOKEN)

//     if (error.response.status === 403) {
//       console.log('服务器403啦，要重新登录！')
//       notification.error({
//         message: 'Forbidden',
//         description: data.message
//       })
//     }
//     if (error.response.status === 500) {
//       if (data.message.length > 0) {
//         message.error(data.message)
//       }
//     }
//     if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
//       notification.error({
//         message: 'Unauthorized',
//         description: 'Authorization verification failed'
//       })
//     }
//   }
//   return Promise.reject(error)
// }

// service.interceptors.request.use(config => {
//   /* if (token) {
//      config.headers['Authorization'] = 'Bearer ' + token
//      config.headers['appid'] =appid
//    }*/
//   let result = {}
//   result.initUrl = location.href.split('?')[0]
//   location.search.slice(1).split('&').forEach((item) => {
//     var temKey = item.split('=')[0];
//     var temVal = item.split('=')[1];
//     result[temKey] = temVal
//   })
//   config.headers['token'] = result.token
//   history.replaceState(null, null, result.initUrl);

//   if (config.method === 'post') {
//     config.data.id = new Date().getTime()
//     config.data.client = {
//       token: 'gURW0fztfw',
//       userId: 'U9EXEXeaniDzCpju4Geuuh',
//       userName: 'wendy',
//       orgId: 'SnSQeqbwQsSQ8AmCRugNBi'
//     }
//   }
//   return config
// }, err)


// service.interceptors.response.use((response) => {
//   if (response.request.responseType === 'blob') {
//     return response
//   }
//   const code = response.data.code
//   if (code === 1011006 || code === 1011007 || code === 1011008 || code === 1011009) {
//     Modal.error({
//       title: '提示：',
//       content: response.data.message,
//       okText: '重新登录',
//       onOk: () => {
//         //Vue.ls.remove(ACCESS_TOKEN)
//         window.location.reload()
//       }
//     })
//   } else if (code === 1013002 || code === 1016002 || code === 1015002) {
//     message.error(response.data.message)
//     return response.data
//   } else {
//     return response.data
//   }
// }, err)

// const installer = {
//   vm: {},
//   install(Vue) {
//     Vue.use(VueAxios, service)
//   }
// }
// export {
//   installer as VueAxios,
//   service as axios
// }
