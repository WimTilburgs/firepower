///<reference path="../../../../typings/lodash/lodash.d.ts"/>

module app.domain {

    export interface IOneRepMaxen {
        oefeningUid: string;
        oefeningOmschrijving: string;
        gebruikerUid: string;
        gebruikerNaam: string;
        datum: any;
        orm: number;
        uid?: string;
    }

    export class OneRepMaxen implements IOneRepMaxen {
        constructor(
            public oefeningUid: string,
            public oefeningOmschrijving: string,
            public gebruikerUid: string,
            public gebruikerNaam: string,
            public datum: any,
            public orm: number,
            public uid?: string
        ) { }
        
        /**
         * Deze functie geeft de Onerepmax van deze gebruiker met de meest
         * actuele datum per oefening.
         */
        getActueleOneRepMaxen(repMaxen) : IOneRepMaxen[] {    

                var maxen = [];
                angular.forEach(repMaxen, function(value, key) {
                    //var max = new app.domain.OneRepMaxen(value.oefeningUid, value.oefeningOmschrijving, '', '', value.datum, value.orm, key);
                    maxen.push(value);
                })
               var oefeningen = _.map(maxen, 'oefeningUid');
                oefeningen = _.uniq(oefeningen);
                var returnMax  = [];
                angular.forEach(oefeningen, function(value, key) {
                    var repmax = _(maxen).filter({ 'oefeningUid': value }).maxBy('datum');
                    if (repmax) {
                        returnMax.push(new OneRepMaxen(repmax.oefeningUid, repmax.oefeningOmschrijving, '', '', repmax.datum, repmax.orm,''));

                        //var returnMax = new OneRepMaxen(repmax.oefeningUid, repmax.oefeningOmschrijving, '', '', repmax.datum, repmax.orm,'');
                        //repMaxen.push(returnMax)
                    }

                })
                return returnMax;
          
        }
    }
}