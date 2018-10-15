// class Routers {
//     constructor() {
//         this.routes = {};
//
//         this.currentUrl = '';
//
//         this.refresh = this.refresh.bind(this);
//
//         window.addEventListener('load', this.refresh, false)
//         window.addEventListener('hashchange', this.refresh, false)
//     }
//
//     route(path, callback) {
//         this.routes[path] = callback || function () {}
//     }
//
//     refresh() {
//         console.log(JSON.stringify(location.hash.slice));
//         this.currentUrl = location.hash.slice(1) || '/';
//
//         this.routes[this.currentUrl]();
//     }
// }

// function Routers() {
//     this.routes = {};
//     this.currentUrl = '';
//     this.refresh = this.refresh.bind(this);
//     window.addEventListener('load', this.refresh, false)
//     window.addEventListener('hashchange', this.refresh, false)
// }
// Routers.prototype.route = function (path, callback) {
//     this.routes[path] = callback || function () {}
// };
// Routers.prototype.refresh = function () {
//     this.currentUrl = location.hash.slice(1) || '/';
//     console.log(this.name)
//     this.routes[this.currentUrl]();
// }

// function Routers() {
//     this.routes = {}
//     this.currentUrl = ''
//     this.refresh = this.refresh.bind(this)
//
//     window.addEventListener('load', this.refresh, false)
//     window.addEventListener('hashchange', this.refresh, false)
// }
// Routers.prototype.route = function (path, callback) {
//     this.routes[path] = callback || function () {}
// }
//
// Routers.prototype.refresh = function () {
//     this.currentUrl = location.hash.slice(1) || '/';
//     this.routes[this.currentUrl]();
// }


















function Routers() {
    this.routes = {}
    this.currentUrl = ''
    this.refresh = this.refresh.bind(this)
    window.addEventListener('load', this.refresh, false)
    window.addEventListener('hashchange', this.refresh, false)
}

Routers.prototype.route = function (path, callback) {
    this.routes[path] = callback || function () {}
}

Routers.prototype.refresh = function () {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl]()
}