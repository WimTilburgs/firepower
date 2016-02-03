///<reference path="../../../../typings/lodash/lodash.d.ts"/>

module app.domain {

    export interface IOefeningen {

        omschrijving: string;
        afkorting: string;
        barbellGewicht: number;
        sqlId: number;
    }

    export class Oefeningen implements IOefeningen {

        constructor(

            public omschrijving: string,
            public afkorting: string,
            public barbellGewicht: number,
            public sqlId: number

        ) { }
    }
}