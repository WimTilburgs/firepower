///<reference path="../../../../typings/lodash/lodash.d.ts"/>
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
        var OneRepMax = (function () {
            function OneRepMax(oefeningUid, oefeningOmschrijving, gebruikerUid, gebruikerNaam, datum, orm, uid) {
                this.oefeningUid = oefeningUid;
                this.oefeningOmschrijving = oefeningOmschrijving;
                this.gebruikerUid = gebruikerUid;
                this.gebruikerNaam = gebruikerNaam;
                this.datum = datum;
                this.orm = orm;
                this.uid = uid;
            }
            return OneRepMax;
        })();
        domain.OneRepMax = OneRepMax;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
