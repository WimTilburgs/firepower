var app;
(function (app) {
    var domain;
    (function (domain) {
        var User = (function () {
            function User(achterNaam, email, geboorteDatum, geslacht, voorNaam) {
                this.achterNaam = achterNaam;
                this.email = email;
                this.geboorteDatum = geboorteDatum;
                this.geslacht = geslacht;
                this.voorNaam = voorNaam;
                this.export = app.domain;
                this.nam = voorNaam + ' ' + achterNaam;
            }
            return User;
        })();
        domain.User = User;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
