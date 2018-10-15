const extname = (filename) => {
    if (filename.indexOf('.') < 1) {return ''}
    return filename.substring(filename.indexOf('.'))
}


const fibonacci = (count) => {
    var count = count * 1, //如果为其他类型，则转int型
        tailFactorial = function(curr, next, count) {
            if (count === 0) {
                return curr;
            } else {
                return tailFactorial(next, curr + next, count - 1); //尾递归采用函数，可有效解决栈溢出问题
            }
        };
    return tailFactorial(1, 1, count);
}
var a = fibonacci(2)
console.log(a)