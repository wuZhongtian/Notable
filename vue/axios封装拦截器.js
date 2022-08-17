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