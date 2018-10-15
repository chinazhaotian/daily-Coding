function longClick(element, fn) {
    element.addEventListener('touchstart', function(event) {
        console.log(1)
        timeout = setTimeout(fn, 800);  //长按时间超过800ms，则执行传入的方法
    }, false);
    element.addEventListener('touchend', function(event) {
        clearTimeout(timeout);  //长按时间少于800ms，不会执行传入的方法
    }, false);
}
