(function () {
    'use strict';

    angular
        .module('app.core')
        .service('blogic', blogic);

    blogic.$inject = ['_'];
    function blogic(_) {
        var service = {
            getRecords: getRecords,
            getOpenstaandeWorkouts: getOpenstaandeWorkouts
        };
        return service;

        function getRecords(trainingen, oefeningen, uid) {
            var geg = trainingen;
            var records = [];
            geg = _.filter(geg, { 'fireUid': uid, 'realisatie': true, 'repsFree': true });
            var OefeningenSqlId = _.map(oefeningen, 'sqlId');
            _.forEach(OefeningenSqlId, function (value, key) {
                var gegPerOefening = _.filter(geg, { 'oefeningId': value });
                gegPerOefening = _.orderBy(gegPerOefening, ['gewicht', 'aantalReps'], ['desc', 'desc']);
                var gewichtenPerOefening = _.chain(gegPerOefening).orderBy(['gewicht'], ['desc']).map(function (o) { return o.gewicht }).uniq().value();
                //console.log(gewichtenPerOefening);
                _.forEach(gewichtenPerOefening, function (value, key) {
                    var gegPerOefening2 = _.filter(gegPerOefening, { 'gewicht': value });

                    records.push(gegPerOefening2[0]);
                    //console.log(value);
                    //console.log(gegPerOefening2);
                });
            });
            return records;
        }

        function getOpenstaandeWorkouts(trainingen, oefeningen, uid) {
            var openWorkouts = [];
            var openWorkoutsKlaar = [];
            var geg = trainingen;
            //filter de trainingen voor de huidige gebruiker ook de niet actieve selecteren
            geg = _.filter(geg, { 'fireUid': uid, 'realisatie': false });
            
            //Haal de oefeningen 
            //Hier zit nog een probleem als er geen openstaande oefeningen zijn
            //var uniekeOefeningen = _.chain(geg).map(function (o) { return o.oefeningOmschrijving }).uniq().value();
            var uniekeWorkoutNummers = _.chain(geg).sortBy('workoutNummer').map(function (o) { return o.workoutNummer }).uniq().value();
            var OefeningenSqlId = _.map(oefeningen, 'sqlId');

            _.forEach(OefeningenSqlId, function (value, key) {
                var oef = _.filter(oefeningen, { 'sqlId': value });
                var oefeningOmschrijving = oef[0].omschrijving;
                //console.log(oefeningOmschrijving);
                _.forEach(uniekeWorkoutNummers, function (value, key) {
                    var nieuw = [];
                    nieuw = _.filter(geg, { 'oefeningOmschrijving': oefeningOmschrijving, 'workoutNummer': value });
                    var sqlId = _.map(nieuw, 'oefeningId')
                    //console.log(sqlId[0]);
                    var a = { oefeningId: sqlId[0], workoutNummer: value, oefeningOmschrijving: oefeningOmschrijving, aantal: nieuw.length };
                    if (nieuw.length > 0) {
                        openWorkouts.push(a);
                    }

                });
            });
           
            //Deze loop pakt van elke openstaande workout de eerste
            if (openWorkouts.length > 0) {
                _.forEach(OefeningenSqlId, function (value, key) {
                    var temp = _.filter(openWorkouts, { 'oefeningId': value });
                    openWorkoutsKlaar.push(temp[0]);
                    openWorkoutsKlaar = _.orderBy(openWorkoutsKlaar, ['workoutNummer', 'oefeningOmschrijving']);
                });
            }
            return openWorkoutsKlaar;
        }

    }
})();
