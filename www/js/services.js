angular.module('r1p.services', [])
        //.constant("baseURL", "http://10.0.1.86:3000/")
        //.constant("baseURL", "http://192.168.1.25:3000/")
        .constant("baseURL", "http://172.16.17.157:3000/")
        //.constant("baseURL", "http://www.read1page.com/")
        //.constant("baseURL", "http://localhost:3000/")
        .service('codeGenerationService', function () {
            this.codeGen = function () {
                var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var randomCode = '';
                for (var i = 0; i < 6; i++) {
                    var randomPoz = Math.floor(Math.random() * charSet.length);
                    randomCode += charSet.substring(randomPoz, randomPoz + 1);
                }
                return randomCode;
            };
        })
        .factory('$localStorage', ['$window', function ($window) {
            return {
                store: function (key, value) {
                    $window.localStorage[key] = value;
                },
                get: function (key, defaultValue) {
                    return $window.localStorage[key] || defaultValue;
                },
                remove: function (key) {
                    $window.localStorage.removeItem(key);
                },
                storeObject: function (key, value) {
                    $window.localStorage[key] = JSON.stringify(value);
                },
                getObject: function (key, defaultValue) {
                    return JSON.parse($window.localStorage[key] || defaultValue);
                }
            }
        }])
;