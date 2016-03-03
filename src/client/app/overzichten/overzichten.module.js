///<reference path="../../../../typings/angularjs/angular.d.ts"/>
var app;
(function (app) {
    var overzichten;
    (function (overzichten) {
        angular.module('app.overzichten', [
            'app.core',
            'app.widgets',
            'app.firebase'
        ]);
    })(overzichten = app.overzichten || (app.overzichten = {}));
})(app || (app = {}));
;
