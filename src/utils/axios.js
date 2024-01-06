import axios from "axios";
import { showToast, showFailToast } from "vant";
import router from "@/router";

console.log('import.meta.env',import.meta.env);
axios.defaults.baseURL = import.meta.env.MODE == 'development' ? '//backend-api-01.newbee.ltd/api/v1' : '//backend-api-01.newbee.ltd/api/v1';

//跨域请求是要不要携带cookie
axios.defaults.withCredentials = true;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
//判断用户登陆状态通过token来实现
axios.defaults.headers['token'] = localStorage.getItem('token') || '';

//post请求时，发送json的形式的数据包
axios.defaults.headers.post['Content-Type'] = 'application/json'

//interceptor是拦截器 每个请求都会经过这个拦截器，返回的数据可以通过拦截处理后返回
axios.interceptors.response.use((res)=>{
    if(typeof res.date !== 'object'){
        showToast('服务器异常！');
        return Promise.reject(red);
    }
    if(res.data.resultCode != 200){
        if(res.data.message){
            showFailToast(res.data.message);
        }
        if(res.data.resultCode == 416){
            router.push({
                path:'/login'
            })
        }
        if(res.data.data && window.location.hash == '#/login'){
            localStorage.setItem('token',res.data.data);
            axios.defaults.headers['token'] = res.data.data;
        }

        return Promise.reject(res.data)
    }

    return res.data;
})

export default axios;