///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
///<reference path="../core/user.service.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var Gebruiker = (function () {
            function Gebruiker(logger, firebaseData, Auth, Ref, $state, currentAuth) {
                this.logger = logger;
                this.firebaseData = firebaseData;
                this.Auth = Auth;
                this.Ref = Ref;
                this.$state = $state;
                this.currentAuth = currentAuth;
                this.init();
            }
            Gebruiker.prototype.init = function () {
                this.title = 'Gebruikersoverzicht';
                this.singleModel = 0;
                if (!this.currentAuth) {
                    this.$state.go('login');
                }
                this.gebruiker = this.firebaseData.getGebruiker;
                this.activate();
            };
            Gebruiker.prototype.userOpslaan = function () {
                this.Ref.child('users').child(this.currentAuth.uid).update({
                    'voorNaam': this.user.voorNaam,
                    'achterNaam': this.user.achterNaam,
                    'email': this.user.email
                });
            };
            Gebruiker.prototype.test = function () {
                this.$state.go('gebruiker.trainen');
            };
            Gebruiker.prototype.activate = function () {
                this.logger.info('Gebruikersoverzicht');
                this.gebruiker.$loaded().then(function (response) {
                    var _achterNaam = '';
                    var _email = '';
                    var _voorNaam = '';
                    var _uid = '';
                    angular.forEach(response, function (value, key) {
                        //console.log(key, value);
                        if (key == 'voorNaam') {
                            _voorNaam = value;
                        }
                        ;
                        if (key == 'achterNaam') {
                            _achterNaam = value;
                        }
                        ;
                        if (key == 'email') {
                            _email = value;
                        }
                        ;
                    });
                    Gebruiker.prototype.user = new app.domain.User(_achterNaam, _email, _voorNaam, response.$id);
                });
            };
            Gebruiker.controllerId = 'Gebruiker';
            /* @ngInject */
            Gebruiker.$inject = ['logger',
                'firebaseData',
                'Auth',
                'Ref',
                '$state',
                'currentAuth',
            ];
            return Gebruiker;
        })();
        angular
            .module('app.gebruiker')
            .controller(Gebruiker.controllerId, Gebruiker);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
