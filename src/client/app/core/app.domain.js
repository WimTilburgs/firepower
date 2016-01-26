var app;
(function (app) {
    var domain;
    (function (domain) {
        var User = (function () {
            function User(achterNaam, voorNaam) {
                this.achterNaam = achterNaam;
                this.voorNaam = voorNaam;
                this.export = app.domain;
                this.naam = voorNaam + ' ' + achterNaam;
            }
            return User;
        })();
        domain.User = User;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
