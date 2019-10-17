var cookieApp = angular.module("cookie", []);

cookieApp.factory("FactCookieJar", function() {
    return { qty: 0 };
});

cookieApp.factory("FactOvens", function() {
    return { 
        qty: 1,
        cost: 10
    };
});

cookieApp.factory("FactGrandmas", function() {
    return {
        qty: 0,
        cost: 100
    };
});

cookieApp.factory("FactFactories", function() {
    return {
        qty: 0,
        cost: 1000
    };
});


cookieApp.controller("cookieJar", function($scope, FactCookieJar, FactOvens) {
    $scope.cookies = FactCookieJar;
    $scope.ovens = FactOvens;

    $scope.addCookie = function() {
        $scope.cookies.qty += $scope.ovens.qty;
    }
});

cookieApp.controller("ovens", function($scope, FactCookieJar, FactOvens) {
    $scope.ovens = FactOvens;

    $scope.buyOven = function() {
        if(FactCookieJar.qty >= $scope.ovens.cost)
        {
            FactCookieJar.qty -= $scope.ovens.cost;
            $scope.ovens.qty += 1;
            $scope.ovens.cost += 10;
        }
    };
});


cookieApp.controller("grandmas", function($scope, $interval, FactCookieJar, FactGrandmas) {
    $scope.grandmas = FactGrandmas;
    $scope.cookies = FactCookieJar;

    $scope.buyGrandma = function() {
        if($scope.cookies.qty >= $scope.grandmas.cost)
        {
            $scope.cookies.qty -= $scope.grandmas.cost;
            $scope.grandmas.qty += 1;
            $scope.grandmas.cost += 100;
        }
    };

    var update = $interval(function() {
        $scope.cookies.qty += $scope.grandmas.qty;
    }, 1000); //every second
});

cookieApp.controller("factories", function($scope, $interval, FactCookieJar, FactFactories, FactOvens) {
    $scope.factories = FactFactories;
    $scope.ovens = FactOvens;
    $scope.cookies = FactCookieJar;

    $scope.buyFactory = function() {
        if($scope.cookies.qty >= $scope.factories.cost)
        {
            $scope.cookies.qty -= $scope.factories.cost;
            $scope.factories.qty += 1;
            $scope.factories.cost += 1000;
        }
    };

    var update = $interval(function() {
        $scope.ovens.qty += $scope.factories.qty;
    }, 1000); //every second
});

