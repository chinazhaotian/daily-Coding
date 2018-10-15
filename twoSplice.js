var binarySearch = function (arr, item) {
    var low = 0;
    var high = arr.length-1;
    var mid;
    var element;
    while (low<high) {
        mid = Math.floor((low+high)/2);
        element = arr[mid];
        if (element<item) {
            low=mid+1;
        } else if (element>item) {
            high=mid-1;
        } else {
          return mid;
        }
    }
    return -1;
};

var bindIndex = function (arr, item) {
    for(var i=0;i<arr.length;i++) {
        if(arr[i] == item) {
            return i
        }
    }
    return -1
}
var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]

console.log(typeof(null));