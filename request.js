var request = require('request');
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'test'
})
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

var url="https://api.wxapp.quiztop.net/api/quiz/list";
var requestData={
    length:24,
    start_idx:0,
    '3rd_session':'wxmini-1441dc34-bbe9-11e8-a3fd-0242ac15ff04'
};
function req() {
    console.log(999)
    request({
        url: url,
        method: "POST",
        json: true,
        form: requestData
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // 请求成功的处理逻辑
            if (body.length <= 1) {
                console.log('爬取完毕')
                connection.end()
            }
            var arr = []
            body.forEach((v,k) => {
                var item = [v.id,v.title,v.skip_intro,v.share_mp_url,v.image,v.description,v.integration_questions]
                arr.push(item)
            })
            console.log(requestData.start_idx)
            addsql(arr)
            requestData.start_idx+=24
            req()
        }else {
            console.log('爬取完毕')
            connection.end()
        }
        // console.log('error'+error)
        // console.log('response'+response)
        // console.log('body'+body)
    });

}
function addsql(params) {
var  addSql = 'INSERT INTO ceshi(Id,title,skip_intro,share_mp_url,image,description,integration_questions) VALUES ?';
var  addSqlParams = params
connection.query(addSql,[addSqlParams],function (err, result) {
    if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
    }
});
}
req()
