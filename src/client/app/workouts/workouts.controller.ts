///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../../typings/lodash/lodash.d.ts"/>
///<reference path="../core/app.domain.ts"/>
///<reference path="../core/user.service.ts"/>
///<reference path="../core/firebase.data.ts"/>
module app.controller {

    class Workouts {
        static controllerId = 'Workouts';
        stap1Title: string;
        stap2Title: string;

        user: app.domain.IUser;
        fbRoot: any;
        gebruiker: any;
        toonMethodes: boolean = true;
        toonTrainingenGenereren: boolean = false;
        kijkSchema: boolean = false;
        toon1Rm: boolean = false;
        //toonMethodes: boolean = true;
        
        oefeningen: any;

        tempOneRepMaxen: any;
        oneRepMaxen: app.domain.OneRepMax[];
        oneRepMaxenPerOefening: app.domain.OneRepMax[];

        trainingsMethodes: any;
        geselecteerdeTrainingsMethode: any; //hier moeten uiteraard nog klasses voor komen
        schemaGegroepeerdPerWorkout: any;
        trainingsSchemas: any;
        gefilterdTrainingsSchema: any;
       
       
       
        /* @ngInject */
        static $inject = ['logger',
            '$state',
            'currentAuth',
            '_',
            'fireData',
            'userService'

        ];
        constructor(

            private logger: any,
            private $state: any,
            private currentAuth: any,
            private _: any,
            private fireData: app.core.FireData

        ) {
            this.init();
        }
        private init() {

            if (!this.currentAuth) {
                this.$state.go('login');
            }
            this.trainingsMethodes = this.fireData.haalTrainingsMethodes();
            //this.trainingsSchemas = this.fireData.getTrainingsSchemas();
            this.trainingsMethodes.$loaded(function(response) {
                console.log(response)
            })

            //           this.fbRoot = this.fireData.getRoot();
            //             this.fbRoot.$loaded().then(function(response) {
            //                 var repmax = {};
            //                 var temp = [];
            // 
            //                 angular.forEach(response, function(value, key) {
            // 
            //                     if (value.$id === 'oefeningen') {
            //                         Workouts.prototype.oefeningen = value;
            //                     }
            //                     // if (value.$id === 'oneRepMaxen') {
            //                     //     Workouts.prototype.oneRepMaxen = value;
            //                     // }
            // 
            //                 })
            //                 //                 angular.forEach(Workouts.prototype.oefeningen, function(value, key) {
            //                 //                     repmax = _(Workouts.prototype.oneRepMaxen).filter({ 'oefeningUid': key }).maxBy('orm');
            //                 //                     if (repmax) {
            //                 //                         temp.push(repmax);
            //                 //                     }
            //                 // 
            //                 //                     Workouts.prototype.oneRepMaxenPerOefening = temp;//.filter({currentAuth.uid});
            //                 //                 })
            // 
            //             })
            // if (!this.currentAuth) {
            //     return;
            // }
            this.gebruiker = this.fireData.getGebruiker(this.currentAuth);

            this.gebruiker.$loaded().then(function(response) {

                Workouts.prototype.user = app.domain.User.prototype.getUser(response);
                //console.log(response)
                angular.forEach(response, function(value, key) {

                    if (key === 'oneRepMaxen') {
                        var temp = [];
                        //console.log(value);
                        //Workouts.prototype.tempOneRepMaxen = value;
                        angular.forEach(value, function(val, key) {
                            //console.log(key);
                            //console.log(val.orm);
                            temp.push(val);
                            
                            //console.log(temp)
                        })
                        var oefeningen = _.map(temp, 'oefeningUid');
                        oefeningen = _.sortedUniq(oefeningen);
                        //console.log(oefeningen);
                        //var groupTemp = _.chain(temp).groupBy("oefeningUid").value();
                        //console.log(groupTemp);
                        Workouts.prototype.tempOneRepMaxen = temp;
                        var tijdelijk = []
                        angular.forEach(oefeningen, function(value, key) {
                            //console.log(value);
                            //console.log(key);
                            
                            var repmax = _(temp).filter({ 'oefeningUid': value }).maxBy('orm');
                            if (repmax) {
                                tijdelijk.push(repmax);
                            }

                            //.filter({currentAuth.uid});
                        })
                        //console.log(tijdelijk)
                        Workouts.prototype.oneRepMaxenPerOefening = tijdelijk;
                    }
                })
                //console.log(response[0].oneRepMaxen);
                //Workouts.prototype.oneRepMaxen = 
                //Workouts.prototype.userService.getUser(response) //app.core.UserService.prototype.getUser(response);
            })

            this.activate();
        }
        
        //schemaGegroepeerdPerWorkout: any = {}
        bekijkSchema(m): void {
            this.kijkSchema = true;
            // this.geselecteerdeTrainingsMethode = m;
            // console.log(this.geselecteerdeTrainingsMethode);
            // this.gefilterdTrainingsSchema = _.filter(this.trainingsSchemas, { 'trainingsMethodeId': this.geselecteerdeTrainingsMethode.$id })
            // this.schemaGegroepeerdPerWorkout = _.chain(this.gefilterdTrainingsSchema)
            //     .groupBy("workoutNummer")
            //     .value();
            // console.log(this.gefilterdTrainingsSchema);
            // console.log(this.schemaGegroepeerdPerWorkout);
            // console.log(m);
            var temp = [];
            console.log(m.trainingsSchemas);
            angular.forEach(m.trainingsSchemas, function(value, key) {
                temp.push(value);
                            

                //.filter({currentAuth.uid});
            })
            console.log(temp);
             this.schemaGegroepeerdPerWorkout = _.chain(temp)
                .groupBy("workoutNummer")
                .value();
        }

        selecteerTrainingsMethode(methode): void {
            this.toonMethodes = false;
            this.toon1Rm = true;
            this.stap1Title = "Geselecteerde methode = " + methode.omschrijving;
        }

        anuleerTrainingsMethode(): void {
            this.gefilterdTrainingsSchema = {};
        }

        activate(): void {
            this.logger.info('Workouts');

        }
    }

    angular
        .module('app.workouts')
        .controller(Workouts.controllerId, Workouts);
}
