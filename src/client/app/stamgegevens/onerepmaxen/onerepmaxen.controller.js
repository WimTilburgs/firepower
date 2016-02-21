///<reference path="../../../../../typings/tsd.d.ts"/>
///<reference path="../../core/app.domain.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var OneRepMaxen = (function () {
            function OneRepMaxen(logger, fireData, $state, currentAuth, _) {
                this.logger = logger;
                this.fireData = fireData;
                this.$state = $state;
                this.currentAuth = currentAuth;
                this._ = _;
                this.toonButtonNieuw = true;
                this.toonInvoerScherm = false;
                this.init();
            }
            OneRepMaxen.prototype.init = function () {
                this.title = 'Onderhoud OneRepMaxen voor ';
                if (!this.currentAuth) {
                    this.$state.go('login');
                }
                this.gebruiker = this.fireData.getGebruiker(this.currentAuth);
                this.gebruiker.$loaded().then(function (response) {
                    OneRepMaxen.prototype.user = app.domain.User.prototype.getUser(response);
                });
                this.oefeningen = this.fireData.haalOefeningen();
                this.oefeningen.$loaded(function (response) {
                    alert(response[0].omschrijving);
                });
                this.oneRepMaxen = this.fireData.getOneRepMaxenPerGebruiker(this.currentAuth.uid);
                //this.filteredOneRepMaxen = this.oneRepMaxen;
                this.oefening = null;
                this.activate();
            };
            OneRepMaxen.prototype.oefeningSelecteren = function (m) {
                this.oefening = m;
                this.filteredOneRepMaxen = _.filter(this.oneRepMaxen, { 'oefeningUid': this.oefening.$id });
                this.filteredOneRepMaxen = _.orderBy(this.filteredOneRepMaxen, ['datum'], ['desc']);
                this.oneRepMax = null;
                this.toonButtonNieuw = true;
                this.toonInvoerScherm = true;
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
                this.oneRepMaxWegschrijven('nieuw');
            };
            OneRepMaxen.prototype.oneRepMaxWijzigen = function () {
                this.oneRepMaxWegschrijven('wijzigen');
            };
            OneRepMaxen.prototype.oneRepMaxVerwijderen = function () {
                this.oneRepMaxWegschrijven('verwijderen');
            };
            OneRepMaxen.prototype.oneRepMaxOpslaanTonen = function () {
                this.toonButtonNieuw = true;
                this.oneRepMax = null;
            };
            OneRepMaxen.prototype.oneRepMaxWegschrijven = function (actie) {
                var orm = new app.domain.OneRepMaxen(this.oefening.$id, this.oefening.omschrijving, this.user.uid, this.user.voorNaam + ' ' + this.user.achterNaam, this.oneRepMax.datum.getTime(), this.oneRepMax.orm, null);
                switch (actie) {
                    case 'nieuw':
                        //alert(actie);
                        this.oneRepMaxen.$add(orm);
                        break;
                    case 'wijzigen':
                        //alert(actie);
                        this.oneRepMaxen.$save(orm).then(function () {
                        });
                        this.toonButtonNieuw = true;
                        break;
                    case 'verwijderen':
                        this.oneRepMaxen.$remove(this.oneRepMax);
                        this.toonButtonNieuw = true;
                        break;
                    default:
                        break;
                }
                this.oneRepMax = null;
                this.filteredOneRepMaxen = this.oneRepMaxen;
            };
            OneRepMaxen.prototype.activate = function () {
                this.logger.info('OnerepMax view');
            };
            OneRepMaxen.controllerId = 'OneRepMaxen';
            /* @ngInject */
            OneRepMaxen.$inject = ['logger',
                'fireData',
                '$state',
                'currentAuth',
                '_'
            ];
            return OneRepMaxen;
        })();
        angular
            .module('app.stamgegevens')
            .controller(OneRepMaxen.controllerId, OneRepMaxen);
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
