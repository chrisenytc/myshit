angular.module('starter.services', [])

.factory('History', function($window) {
    return {
        all: function() {
            return JSON.parse($window.localStorage.getItem('history') || '[]');
        }
    };
})

.factory('$localStorage', ['$window',
    function($window) {
        return {
            set: function(key, value) {
                $window.localStorage.setItem(key, value);
            },
            get: function(key, defaultValue) {
                return $window.localStorage.getItem(key) || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage.setItem(key, JSON.stringify(value));
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage.getItem(key) || '{}');
            },
            updateObject: function(key, object) {
                var currentData = JSON.parse($window.localStorage.getItem(key) || '[]');
                currentData.push(object);
                $window.localStorage.setItem(key, JSON.stringify(currentData));
                return true;
            },
            clearDatabase: function() {
                $window.localStorage.clear();
                return true;
            }
        };
    }
]);
