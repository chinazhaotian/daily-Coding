/**
 * Created by nailuo on 2017/10/26.
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) : (global.Qarticles = factory());

})(this, function() {
    window._t = {
        /***
         * 封装ajax函数
         * @param {string}opt.type http连接的方式，包括POST和GET两种方式
         * @param {string}opt.url 发送请求的url
         * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
         * @param {object}opt.data 发送的参数，格式为对象类型
         * @param {function}opt.success ajax发送并接收成功调用的回调函数
         * @param {function}opt.fail ajax发送失败的回调函数
         *
         *   使用方法
         *   sky.ajax({
         *       method: 'POST',
         *       url: 'test.php',
         *       data: {
         *           name1: 'value1',
         *           name2: 'value2'
         *       },
         *       success: function (res) {
         *          console.log(res)；
         *       },
         *       fail: function (res) {
         *          console.log(res)
         *       }
         *   });
         */
        ajax: function(options) {
            function empty() {}
            function obj2Url(obj) {
                if (obj && obj instanceof Object) {
                    var arr = [];
                    for (var i in obj) {
                        if (obj.hasOwnProperty(i)) {
                            if (typeof obj[i] == 'function') obj[i] = obj[i]();
                            if (obj[i] == null) obj[i] = '';
                            arr.push(escape(i) + '=' + escape(obj[i]));
                        }
                    }
                    return arr.join('&').replace(/%20/g, '+');
                } else {
                    return obj;
                }
            };
            var opt = {
                url: '', //请求地址
                sync: true, //true，异步 | false　同步，会锁死浏览器，并且open方法会报浏览器警告
                method: 'POST', //提交方法
                data: null, //提交数据
                username: null, //账号
                password: null, //密码
                dataType: null, //返回数据类型
                success: empty, //成功返回回调
                error: empty, //错误信息回调
                timeout: 0, //请求超时ms
            };
            for (var i in options)
                if (options.hasOwnProperty(i)) opt[i] = options[i];
            var accepts = {
                script: 'text/javascript, application/javascript, application/x-javascript',
                json: 'application/json',
                xml: 'application/xml, text/xml',
                html: 'text/html',
                text: 'text/plain'
            };
            var abortTimeout = null;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    xhr.onreadystatechange = empty;
                    clearTimeout(abortTimeout);
                    var result, dataType, error = false;
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
                        if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob') {
                            result = xhr.response;
                        } else {
                            result = xhr.responseText;
                            dataType = opt.dataType ? opt.dataType : xhr.getResponseHeader('content-type').split(';', 1)[0];
                            for (var i in accepts) {
                                if (accepts.hasOwnProperty(i) && accepts[i].indexOf(dataType) > -1) dataType = i;
                            }
                            try {
                                if (dataType == 'script') {
                                    eval(result);
                                } else if (dataType == 'xml') {
                                    result = xhr.responseXML
                                } else if (dataType == 'json') {
                                    result = result.trim() == '' ? null : JSON.parse(result)
                                }
                            } catch (e) {
                                opt.error(e, xhr);
                                xhr.abort();
                            }
                        }
                        opt.success(result, xhr);
                    } else {
                        opt.error(xhr.statusText, xhr);
                    }
                }
            };
            if (opt.method == 'GET') {
                var parse = opt.url.parseURL();
                opt.data = Object.assign({}, opt.data, parse.params);
                opt.url = parse.pathname + '?' + obj2Url(opt.data);
                opt.data = null;
            }
            xhr.open(opt.method, opt.url, opt.sync, opt.username, opt.password);
            if (opt.method == 'POST') xhr.setRequestHeader('Content-type', 'text/plain');
            if (opt.timeout > 0) {
                abortTimeout = setTimeout(function() {
                    xhr.onreadystatechange = empty
                    xhr.abort();
                    opt.error('timeout', xhr);
                }, opt.timeout)
            }
            xhr.send(opt.data ? obj2Url(opt.data) : null);
        },
        /**
         * 获取 id  DOM
         * @param id
         * @returns {Element}
         */
        id: function(id) {
            return document.getElementById(id);
        },
        /***
         * 序列化query
         * @returns {{}}
         */
        queryParse: function() {
            var queryObj = {}; // query对象
            var arr = [];
            var queryStr = decodeURIComponent(window.location.search).substring(1);
            if (queryStr) {
                if (queryStr.indexOf('&') > -1)
                    arr = queryStr.split('&');
                else {
                    arr.push(queryStr);
                }
                arr.forEach(function(n, i) {
                    var kv = n.split('=');
                    queryObj[kv[0]] = isNaN(kv[1] * 1) ? kv[1] : kv[1] * 1;
                });
            }
            return queryObj;
        },
        /**
         *  执行补间动画方法
         *
         * @param      {Number}    start     开始数值
         * @param      {Number}    end       结束数值
         * @param      {Number}    time      补间时间
         * @param      {Function}  callback  每帧回调
         * @param      {Function}  easing    缓动方法，默认匀速
         *  加速运动
         *  let box = document.querySelector('.box')
         *   animate(0, 500, 400, value => {
         *       box.style.transform = `translateX(${value}px)` // 将数值设置给 方块 的 css 属性 transform 属性可以控制元素在水平方向上的位移
         *   }, easeIn)
         *   function  easeIn(time) { // 接收一个当前的时间占总时间的百分比比
         *      return time ** 2
         *   }
         *   加速后抖一抖~
         *   function shake(time) {
         *       if (time < 0.6) {
         *           return (time / 0.6) ** 2
         *       } else {
         *           return Math.sin((time-0.6) * ((3 * Math.PI) / 0.4)) * 0.2 + 1
         *       }
         *   }
         *
         */
        animate: function(start, end, time, callback, easing = t => t) {
            var startTime = performance.now() // 设置开始的时间戳
            var differ = end - start // 拿到数值差值
            // 创建每帧之前要执行的函数
            function loop() {
                raf = requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
                const passTime = performance.now() - startTime // 获取当前时间和开始时间差
                var per = passTime / time // 计算当前已过百分比
                if (per >= 1) { // 判读如果已经执行
                    per = 1 // 设置为最后的状态
                    cancelAnimationFrame(raf) // 停掉动画
                }
                const pass = differ * easing(per) // 通过已过时间百分比*开始结束数值差得出当前的数值
                callback(pass)
            }
            var raf = requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
        },
        // 包装post请求data
        paramsParse: function(param) {
            var params = new URLSearchParams();
            for (var key in param) {
                params.append(key, param[key]);
            }
            return params;
        },
        /***
         * 生成假的uuid
         * @returns {string}
         */
        getUUID: function() {
            var d = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
                d += performance.now(); //use high-precision timer if available
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        },
        /***
         * 设置cookie
         * @param key
         * @param value
         * @param time
         */
        setCookie: function(key, value, time) {
            var Days = time || 7;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = key + "=" + value + ";expires=" + exp.toGMTString();
        },
        /***
         * 获取cookie
         * @param key
         * @returns {*}
         */
        getCookie: function(key) {
            var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return arr[2];
            else
                return null;
        },
        /***
         * 删除cookie
         * @param key
         */
        delCookie: function(key) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getCookie(key);
            if (cval != null)
                document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
        },
        /**
         * 去重 1
         * 字母的大小写视为一致，比如'a'和'A'，保留一个就可以了！
         * array：表示要去重的数组，必填
         * isSorted：表示函数传入的数组是否已排过序，如果为 true，将会采用更快的方法进行去重
         * iteratee：传入一个函数，可以对每个元素进行重新的计算，然后根据处理的结果进行去重
         *
         * 使用方法
         * unique(array3, false, function(item){
         *      return typeof item == 'string' ? item.toLowerCase() : item
         * })
         * */
        toLowerunique: function(array, isSorted, iteratee) {
            var res = [];
            var seen = [];

            for (var i = 0, len = array.length; i < len; i++) {
                var value = array[i];
                var computed = iteratee ? iteratee(value, i, array) : value;
                if (isSorted) {
                    if (!i || seen !== computed) {
                        res.push(value)
                    }
                    seen = computed;
                } else if (iteratee) {
                    if (seen.indexOf(computed) === -1) {
                        seen.push(computed);
                        res.push(value);
                    }
                } else if (res.indexOf(value) === -1) {
                    res.push(value);
                }
            }
            return res;
        },
        /***
         * 数组中 当保留 数字 1  与  字符串 '1' 时
         * @param array
         * @returns {Array.<T>}
         */
        stringUnique: function(array) {
            return array.concat().sort().filter(function(item, index, array) {
                return !index || item !== array[index - 1]
            })
        },
        /***
         * 去重
         * @param array
         * @returns {Array}
         */
        unique: function(array) {
            var res = [];
            for (var i = 0; i < array.length; i++) {
                var current = parseInt(array[i]);
                if (res.indexOf(current) === -1) {
                    res.push(current)
                }
            }
            return res;
        },
        /***
         * 乱序
         * @param a  数组
         * @returns {a} 乱序后的数组
         */
        shuffle: function(a) {
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
            return a;
        },
        /**
         * 上传文件 获取文件名字
         * @param pathfilename  input(value)
         * @returns {*}
         * @constructor
         */
        GetExtensionFileName: function(pathfilename) {
            var reg = /(\\+)/g;
            var pfn = pathfilename.replace(reg, "#");
            var arrpfn = pfn.split("#");
            var fn = arrpfn[arrpfn.length - 1];
            var arrfn = fn.split(".");
            return arrfn[arrfn.length - 1];
        },
        /**
         * 移动端长按事件
         * @param element fn
         * @returns {*}
         * */
        longClick: function(element, fn) {
            var timeout;
            element.addEventListener('touchstart', function(event) {
                timeout = setTimeout(fn, 800); //长按时间超过800ms，则执行传入的方法
            }, false);
            element.addEventListener('touchend', function(event) {
                clearTimeout(timeout); //长按时间少于800ms，不会执行传入的方法
            }, false);
        },
        /**
         * 时间戳转换 不带时分秒
         * @param 时间戳 e
         * */
        ts2date: function(e) {
            if (e > 0) {
                var t = new Date(1e3 * e),
                    n = t.getFullYear(),
                    r = t.getMonth() + 1,
                    u = t.getDate();
                return n + "-" + r + "-" + u
            }
            return ""
        },
        /**
         * 时间戳转换带 时分秒
         *
         * @param 时间戳 e
         * */
        ts2time: function(e) {
            if (e > 0) {
                var t = new Date(1e3 * e),
                    n = t.getFullYear(),
                    r = t.getMonth() + 1,
                    u = t.getDate(),
                    a = t.getHours(),
                    g = t.getMinutes(),
                    i = t.getSeconds();
                return a = a > 9 ? a : "0" + a, g = g > 9 ? g : "0" + g, i = i > 9 ? i : "0" + i, n + "-" + r + "-" + u + " " +
                    a + ":" + g + ":" + i
            }
            return ""
        }
    }
})