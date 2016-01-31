///<reference path="../../../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    var workouts;
    (function (workouts) {
        angular.module('app.workouts', [
            'app.core',
            'app.widgets',
            'app.firebase'
        ]);
    })(workouts = app.workouts || (app.workouts = {}));
})(app || (app = {}));
;
