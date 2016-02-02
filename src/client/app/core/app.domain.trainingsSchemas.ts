///<reference path="../../../../typings/lodash/lodash.d.ts"/>

module app.domain {
   
    export interface ITrainingsSchemas {
        
        workoutNummer: number;
        setNummer: number;
        percentage: number;
        aantalReps: number;
        amrap: boolean;
    }
    
    export class TrainingsSchemas implements ITrainingsSchemas {
        
        constructor(
            
        public workoutNummer: number,
        public setNummer: number,
        public percentage: number,
        public aantalReps: number,
        public amrap: boolean
        ){}
    }    
}