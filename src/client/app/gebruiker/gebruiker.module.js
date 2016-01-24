///<reference path="../../../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    var gebruiker;
    (function (gebruiker) {
        angular.module('app.gebruiker', [
            'app.core',
            'app.widgets',
            'app.firebase'
        ]);
    })(gebruiker = app.gebruiker || (app.gebruiker = {}));
})(app || (app = {}));
;
