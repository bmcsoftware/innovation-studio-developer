(function () {
    'use strict';

    angular.module('com.example.samplelibrary.home').config(function ($stateProvider) {
        $stateProvider.state('bx.home', {
            url: '/home',
            templateUrl: 'scripts/home/home.view.html',
            controller: 'HomeController'
        });
    });
})();
