var data = { name: 'yck'};
observe(data)
let name = data.name
data.name = 'yyy';
function observe(obj) {
    if (!obj || typeof obj !== 'object') {
        return
    }
    Object.keys(obj).forEach(key => {
        defineReactive(data, key, obj[key])
    })
}

function defineReactive(obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return val
        },
        set: function (newVal) {
            console.log(newVal)
            val = newVal
        }
    })
}

