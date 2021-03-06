///<reference path="../../../../typings/tsd.d.ts"/>

module app.domain {

    export interface ITrainingen {

        workoutNummer: number;
        setNummer: number;
        datum: string;
        percentage: number;
        aantalReps: number;
        oefeningOrm: number;
        gewicht: number;
        repsFree: boolean;
        realisatie: boolean;
        oefeningId: string;
        oefeningOmschrijving: string;
        userId: string;
        userVoornaam: string;
        userAchternaam: string;
        trainingsMethodeId: string;
        trainingsMethodeOmschrijving: string;
    }

    export class Trainingen implements ITrainingen {
        //gewicht: number
        constructor(

            public workoutNummer: number,
            public setNummer: number,
            public datum: any,
            public percentage: number,
            public aantalReps: number,
            public oefeningOrm: number,
            public gewicht: number,
            public repsFree: boolean,
            public realisatie: boolean,
            public oefeningId: string,
            public oefeningOmschrijving: string,
            public userId: string,
            public userVoornaam: string,
            public userAchternaam: string,
            public trainingsMethodeId: string,
            public trainingsMethodeOmschrijving: string,
            public uid?: string
        ) { 
            //this.gewicht = this.oefeningOrm*this.percentage/100
        }
    }
}