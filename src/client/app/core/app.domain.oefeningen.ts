///<reference path="../../../../typings/lodash/lodash.d.ts"/>

module app.domain {

    export interface IOefeningen {

        omschrijving: string;
        afkorting: string;
        barbellGewicht: number;
        sqlId: number;
        ophoogGewicht: number;
    }

    export class Oefeningen implements IOefeningen {

        constructor(

            public omschrijving: string,
            public afkorting: string,
            public barbellGewicht: number,
            public sqlId: number,
            public ophoogGewicht: number,
            public uid?: string
        ) { }
    }
}