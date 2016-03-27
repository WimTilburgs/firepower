///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
///<reference path="../core/user.service.ts"/>
var app;
(function (app) {
    var controller;
    (function (controller) {
        var Gebruiker = (function () {
            function Gebruiker(logger, fireData, Auth, Ref, $state, currentAuth) {
                this.logger = logger;
                this.fireData = fireData;
                this.Auth = Auth;
                this.Ref = Ref;
                this.$state = $state;
                this.currentAuth = currentAuth;
                this.imagePath = "images/Bench Press-52.png";
                this.init();
            }
            Gebruiker.prototype.init = function () {
                this.title = 'Gebruikersoverzicht';
                if (!this.currentAuth) {
                    this.$state.go('login');
                }
                if (!this.currentAuth) {
                    return;
                }
                else {
                    var aut = this.currentAuth;
                    this.gebruikerInlog = this.currentAuth;
                    this.gebruiker = this.fireData.getGebruiker(this.currentAuth);
                    var refUser = this.Ref.child("users").child(this.currentAuth.uid).child('data');
                    refUser.on("value", function (snapshot) {
                        if (!snapshot.val()) {
                            Gebruiker.prototype.makeUser(aut, refUser);
                        }
                    }, function (errorObject) {
                        console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                        return;
                    });
                }
                this.activate();
            };
            Gebruiker.prototype.gebruikerWijzigen = function () {
                if (!this.geboorteDate || this.geboorteDate == "Invalid Date") {
                    Gebruiker.prototype.leeftijdString = "";
                    this.gebruiker.data.geboorteDatum = null;
                }
                else {
                    var datum = this.geboorteDate.getTime();
                    console.log(datum);
                    Gebruiker.prototype.leeftijdString = Gebruiker.prototype.berekenLeeftijd(datum);
                    this.gebruiker.data.geboorteDatum = datum;
                }
                this.gebruiker.$save();
            };
            Gebruiker.prototype.activate = function () {
                this.gebruiker.$loaded().then(function (response) {
                    var gdatum = response.data.geboorteDatum;
                    Gebruiker.prototype.leeftijdString = Gebruiker.prototype.berekenLeeftijd(gdatum);
                    Gebruiker.prototype.geboorteDate = new Date(gdatum);
                });
            };
            Gebruiker.prototype.gaTrainen = function () {
                this.$state.go('trainingen');
            };
            Gebruiker.prototype.gaOverzichten = function () {
                this.$state.go('overzichten');
            };
            Gebruiker.prototype.berekenLeeftijd = function (datum) {
                var today = new Date();
                var geboorteDatum = new Date(datum);
                var maandMeervoud = "maanden";
                var vandaagMaand = today.getMonth();
                var geboorteMaand = geboorteDatum.getMonth();
                var verschilMaanden = 0;
                var leeftijd = today.getFullYear() - geboorteDatum.getFullYear();
                geboorteDatum.setFullYear(today.getFullYear());
                if (today < geboorteDatum) {
                    leeftijd--;
                    verschilMaanden = 12 - geboorteMaand + vandaagMaand;
                }
                else {
                    verschilMaanden = vandaagMaand - geboorteMaand;
                }
                if (verschilMaanden == 1) {
                    maandMeervoud = "maand";
                }
                if (verschilMaanden == 0) {
                    return "Leeftijd " + leeftijd + " jaar";
                }
                return "Leeftijd " + leeftijd + " jaar en " + verschilMaanden + " " + maandMeervoud;
            };
            Gebruiker.prototype.makeUser = function (data, refUser) {
                var _achterNaam;
                var _email;
                var _voorNaam;
                var x = data;
                //alert(x.achterNaam)
                switch (x.provider) {
                    case 'password':
                        _achterNaam = '';
                        _voorNaam = '';
                        _email = x.password.email;
                        break;
                    case 'facebook':
                        _achterNaam = x.facebook.cachedUserProfile.last_name;
                        _voorNaam = x.facebook.cachedUserProfile.first_name;
                        _email = x.facebook.cachedUserProfile.email;
                        break;
                    case 'google':
                        _achterNaam = x.google.cachedUserProfile.family_name;
                        _voorNaam = x.google.cachedUserProfile.given_name;
                        _email = '';
                        break;
                    default:
                        break;
                }
                //console.log(_achterNaam,_voorNaam,_email)
                //console.log(Gebruiker.prototype.Ref);
                refUser.update({
                    'voorNaam': _voorNaam,
                    'achterNaam': _achterNaam,
                    'email': _email
                });
                //this.user = new app.domain.User(_achterNaam, _email, _voorNaam);
            };
            Gebruiker.controllerId = 'Gebruiker';
            /* @ngInject */
            Gebruiker.$inject = ['logger',
                'fireData',
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
