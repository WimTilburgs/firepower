///<reference path="../../../../typings/lodash/lodash.d.ts"/>
///<reference path="../core/app.domain.trainingsSchemas.ts"/>
///<reference path="../core/app.domain.oefeningen.ts"/>
///<reference path="../core/app.domain.onerepMaxen.ts"/>
var app;
(function (app) {
    var domain;
    (function (domain) {
        var User = (function () {
            function User(achterNaam, email, voorNaam, uid) {
                this.achterNaam = achterNaam;
                this.email = email;
                this.voorNaam = voorNaam;
                this.uid = uid;
                this.naam = voorNaam + ' ' + achterNaam;
            }
            User.prototype.getUser = function (gebruiker) {
                var _achterNaam;
                var _email;
                var _voorNaam;
                angular.forEach(gebruiker, function (value, key) {
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
                return new User(_achterNaam, _email, _voorNaam, gebruiker.$id);
            };
            return User;
        })();
        domain.User = User;
        var TrainingsMethodes = (function () {
            function TrainingsMethodes(omschrijving) {
                this.omschrijving = omschrijving;
            }
            return TrainingsMethodes;
        })();
        domain.TrainingsMethodes = TrainingsMethodes;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
