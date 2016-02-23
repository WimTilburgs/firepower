///<reference path="../../../../typings/tsd.d.ts"/>

module app.domain {

    export interface ITrainingen {

        workoutNummer: number;
        setNummer: number;
        datum: string;
        percentage: number;
        aantalReps: number;
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

        constructor(

            public workoutNummer: number,
            public setNummer: number,
            public datum: string,
            public percentage: number,
            public aantalReps: number,
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
        ) { }
    }
}