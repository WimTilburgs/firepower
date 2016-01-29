///<reference path="../../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../../../typings/lodash/lodash.d.ts"/>
///<reference path="../../core/app.domain.ts"/>
///<reference path="../../core/user.service.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var OneRepMaxen = (function () {
            function OneRepMaxen(logger, firebaseData, Auth, Ref, $state, currentAuth, userService, _) {
                this.logger = logger;
                this.firebaseData = firebaseData;
                this.Auth = Auth;
                this.Ref = Ref;
                this.$state = $state;
                this.currentAuth = currentAuth;
                this.userService = userService;
                this._ = _;
                this.gridOneRepMaxen = {};
                this.toonButtonNieuw = true;
                this.init();
            }
            OneRepMaxen.prototype.init = function () {
                this.title = 'Onderhoud OneRepMaxen voor ';
                if (!this.currentAuth) {
                    this.$state.go('login');
                }
                this.gebruiker = this.firebaseData.getGebruiker;
                this.oefeningen = this.firebaseData.getOefeningen;
                this.oneRepMaxen = this.firebaseData.getOneRepMaxenPerGebruiker(this.currentAuth.uid);
                this.filteredOneRepMaxen = this.oneRepMaxen;
                this.activate();
            };
            OneRepMaxen.prototype.oefeningSelecteren = function (m) {
                this.oefening = m;
                this.filteredOneRepMaxen = _.filter(this.oneRepMaxen, { 'oefeningUid': m.$id });
                this.oneRepMax = null;
            };
            OneRepMaxen.prototype.oneRepMaxSelecteren = function (m) {
                //this.oneRepMax.datum 
                this.oneRepMax = m;
                this.oneRepMax.datum = new Date(m.datum);
                //tempOefening = oefening;
                //vm.geselecteeedeOnRepMax.oefeningOmschrijving = vm.geselecteerdeOefening.omschrijving;
                this.toonButtonNieuw = false;
            };
            OneRepMaxen.prototype.oneRepMaxOpslaan = function () {
                if (this.oefening === undefined) {
                    this.logger.error('selecteer een oefening!');
                    return;
                }
                var orm = new app.domain.OneRepMax(this.oefening.$id, this.oefening.omschrijving, this.user.uid, this.user.voorNaam + ' ' + this.user.achterNaam, this.oneRepMax.datum.getTime(), this.oneRepMax.orm, null);
                //console.log(orm);
                this.oneRepMaxen.$add(orm);
                this.filteredOneRepMaxen = this.oneRepMaxen;
                this.oneRepMax = null;
            };
            OneRepMaxen.prototype.activate = function () {
                this.logger.info('OnerepMax view');
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
                    OneRepMaxen.prototype.user = new app.domain.User(_achterNaam, _email, _voorNaam, response.$id);
                });
            };
            OneRepMaxen.controllerId = 'OneRepMaxen';
            /* @ngInject */
            OneRepMaxen.$inject = ['logger',
                'firebaseData',
                'Auth',
                'Ref',
                '$state',
                'currentAuth',
                'userService',
                '_'
            ];
            return OneRepMaxen;
        })();
        angular
            .module('app.stamgegevens')
            .controller(OneRepMaxen.controllerId, OneRepMaxen);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
