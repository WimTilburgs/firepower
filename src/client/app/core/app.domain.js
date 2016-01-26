var app;
(function (app) {
    var domain;
    (function (domain) {
        var User = (function () {
            function User(achterNaam, email, voorNaam) {
                this.achterNaam = achterNaam;
                this.email = email;
                this.voorNaam = voorNaam;
                this.export = app.domain;
                this.naam = voorNaam + ' ' + achterNaam;
            }
            return User;
        })();
        domain.User = User;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
