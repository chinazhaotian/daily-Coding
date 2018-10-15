/**
 * Created by Administrator on 2017/2/12.
 */
var http = require("https"); //http 请求
//var https = require("https"); //https 请求
var querystring = require("querystring");
function request(path,param,callback) {
    console.log(param.length)
    var options = {
        hostname: 'api.wxapp.quiztop.net',
        path: path,
        port: 9090,
        method: 'POST',
        headers: {
            'Accept':'*/*',
            'Accept-Encoding':'gzip, deflate, br',
            'Cache-Control':'no-cache',
            'Connection':'keep-alive',
            'Content-Length':param.length,
            'content-type':'application/json',
            'Host':'api.wxapp.quiztop.net',
            'Origin':'http://127.0.0.1:39487',
            'Pragma':'no-cache',
            'Referer':'https://servicewechat.com/wx6824af3c2adb682b/devtools/page-frame.html',
            'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 wechatdevtools/1.02.1808101 MicroMessenger/6.5.7 Language/zh_CN webview/ token/980432892b51565441ef87159b22ee0e'
        }//伪造请求头
    };

    var req = http.request(options, function (res) {

        var json = ""; //定义json变量来接收服务器传来的数据
        console.log(res.statusCode);
        //res.on方法监听数据返回这一过程，"data"参数表示数数据接收的过程中，数据是一点点返回回来的，这里的chunk代表着一条条数据
        res.on("data", function (chunk) {
            json += chunk; //json由一条条数据拼接而成
        })
        //"end"是监听数据返回结束，callback（json）利用回调传参的方式传给后台结果再返回给前台
        res.on("end", function () {
            callback(json);
        })
    })

    req.on("error", function (err) {
        console.log(err)
    })
//这是前台参数的一个样式，这里的参数param由后台的路由模块传过来，而后台的路由模块参数是前台传来的
//    var obj = {
//        query: '{"function":"newest","module":"zdm"}',
//        client: '{"gender":"0"}',
//        page: 1
//}
    req.write(querystring.stringify(param)); //post 请求传参
    req.end(); //必须要要写，

}
var params = querystring.stringify({
    length:24,
    start_idx:0,
    '3rd_session':'wxmini-c2a432b4-bb0c-11e8-adcc-0242ac15b904'
})
var path = '/api/quiz/list'
request(path,params,function (res) {
    console.log(res)
})