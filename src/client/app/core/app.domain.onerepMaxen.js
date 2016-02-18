///<reference path="../../../../typings/lodash/lodash.d.ts"/>
var app;
(function (app) {
    var domain;
    (function (domain) {
        var OneRepMaxen = (function () {
            function OneRepMaxen(oefeningUid, oefeningOmschrijving, gebruikerUid, gebruikerNaam, datum, orm, uid) {
                this.oefeningUid = oefeningUid;
                this.oefeningOmschrijving = oefeningOmschrijving;
                this.gebruikerUid = gebruikerUid;
                this.gebruikerNaam = gebruikerNaam;
                this.datum = datum;
                this.orm = orm;
                this.uid = uid;
            }
            /**
             * Deze functie geeft de Onerepmax van deze gebruiker met de meest
             * actuele datum per oefening.
             */
            OneRepMaxen.prototype.getActueleOneRepMaxen = function (repMaxen) {
                var maxen = [];
                angular.forEach(repMaxen, function (value, key) {
                    //var max = new app.domain.OneRepMaxen(value.oefeningUid, value.oefeningOmschrijving, '', '', value.datum, value.orm, key);
                    maxen.push(value);
                });
                var oefeningen = _.map(maxen, 'oefeningUid');
                oefeningen = _.uniq(oefeningen);
                var returnMax = [];
                angular.forEach(oefeningen, function (value, key) {
                    var repmax = _(maxen).filter({ 'oefeningUid': value }).maxBy('datum');
                    if (repmax) {
                        returnMax.push(new OneRepMaxen(repmax.oefeningUid, repmax.oefeningOmschrijving, '', '', repmax.datum, repmax.orm, ''));
                    }
                });
                return returnMax;
            };
            return OneRepMaxen;
        })();
        domain.OneRepMaxen = OneRepMaxen;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
