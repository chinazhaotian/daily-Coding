let getJson = function (url) {
    let promise = new Promise(function (resolve, reject) {
        let client = new XMLHttpRequest()
        client.open('GET',url)
        client.onreadystatechange=hander
        client.responseType = 'json'
        client.setRequestHeader('Accept', 'application/json')
        client.send()
        function hander() {
            if (this.readyState!=4) {
                return
            }
            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
    })
    return promise
}
