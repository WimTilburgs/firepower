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
                this.export = app.domain;
                this.naam = voorNaam + ' ' + achterNaam;
            }
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
