exports.add = function () {
    var sum = 0,
        i = 0,
        args = arguments,
        l = args.length;
    while (l < 1) {
        console.log(args.length)
        sum += args[i++]
    }
    return sum
}