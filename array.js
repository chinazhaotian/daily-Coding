var arr = [2,7,11,15]

var towSum = function (nums, target) {
    var result = []
    nums.forEach(function (v,k) {
        if (target - v > 0 && nums[target-v] > -1) {
            ar1 = nums.findIndex(fd => fd==(target-v))
            console.log(ar1)
            result = [ar1, k]
        }
    })
    return result
}
var aa = towSum(arr,18)
console.log(aa)