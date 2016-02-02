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

        toonTrainingenGenereren: boolean = false;
        toonStap1: boolean = false;
        toonStap2: boolean = false;
        //toonMethodes: boolean = true;
        
        oefeningen: any;

        oneRepMaxen: any;
        oneRepMaxenPerOefening: any;

        trainingsMethodes: any;
        geselecteerdeTrainingsMethode: any; //hier moeten uiteraard nog klasses voor komen
        
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
            this.stap1Title = 'Stap 1: selecteer een methode.';
            this.stap2Title = 'Stap 2: bepaal je 1 rep max.'
            if (!this.currentAuth) {
                this.$state.go('login');
            }
            
            //this.oefeningen = this.fireData.getOefeningen();
            //this.oefeningen = this.fbRoot
            this.trainingsMethodes = this.fireData.getTrainingsMethodes();
            this.trainingsSchemas = this.fireData.getTrainingsSchemas();
            this.fbRoot = this.fireData.getRoot();
            this.fbRoot.$loaded().then(function(response) {
                var repmax = {};
                var repmaxen = {}
                var oefeningen = {};
                var temp = [];
                //console.log(response);
                angular.forEach(response, function(value, key) {
                    if (value.$id === 'oefeningen') {
                        Workouts.prototype.oefeningen = value;
                        oefeningen = value;
                    }
                    if (value.$id === 'oneRepMaxen') {
                        Workouts.prototype.oneRepMaxen = value;
                        repmaxen = value;
                        //Workouts.prototype.oneRepMaxenPerOefening = value;
                    }
                    //console.log(key, value.$id);
                    //Workouts.prototype.oefeningen = response[2];
                    //var temp = response[2];
                    //console.log(temp);
                })
                angular.forEach(Workouts.prototype.oefeningen,function(value,key){
                    console.log(key , value);
                    //if(value.$id === 'oefeningUid') {}
                    //console.log(value)
                    repmax = _(repmaxen).filter({ 'oefeningUid': key }).maxBy('orm');
                    temp.push(repmax);
                    //console.log(temp);
                    //Workouts.prototype.oneRepMaxenPerOefening = temp;
                })
                
            })
            this.gebruiker = this.fireData.getGebruiker(this.currentAuth);
            this.gebruiker.$loaded().then(function(response) {

                Workouts.prototype.user = app.domain.User.prototype.getUser(response);
                //Workouts.prototype.userService.getUser(response) //app.core.UserService.prototype.getUser(response);
            })
            
            //this.oneRepMaxen = this.fireData.getOneRepMaxenPerGebruiker(this.currentAuth.uid);
            //this.oneRepMaxen.$loaded().then(function (response) {
                
               
            //var result  = _(response).orderBy('percentage','desc').take(2).value();
               
            //var xoefenTemp = _.map(oefenTemp,oefenTemp.$id); 
           



            this.activate();
        }

        bekijkSchema(m): void {

            this.geselecteerdeTrainingsMethode = m;
            this.gefilterdTrainingsSchema = _.filter(this.trainingsSchemas, { 'trainingsMethodeId': this.geselecteerdeTrainingsMethode.$id })
            var people = [
                { name: 'Wim', age: 55 },
                { name: 'Sammy', age: 16 },
                { name: 'Saida', age: 51 }

            ]

        }

        selecteerTrainingsMethode(): void {
            this.toonStap1 = false;
            this.toonStap2 = true;
            this.stap1Title = "Methode = " + this.geselecteerdeTrainingsMethode.omschrijving;
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
