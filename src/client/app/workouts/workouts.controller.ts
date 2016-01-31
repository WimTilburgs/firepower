///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../../typings/lodash/lodash.d.ts"/>
///<reference path="../core/app.domain.ts"/>
///<reference path="../core/user.service.ts"/>
module app.controller {
   
    class Workouts {
        static controllerId = 'Workouts';
        stap1Title: string;
        stap2Title: string;
        
        user: app.domain.IUser;
        gebruiker: any;
        
        toonTrainingenGenereren: boolean = false;
        toonStap1: boolean = false;
        toonStap2: boolean = false;
        //toonMethodes: boolean = true;
        

        
        trainingsMethodes: any;
        geselecteerdeTrainingsMethode: any; //hier moeten uiteraard nog klasses voor komen
        
        trainingsSchemas: any;
        gefilterdTrainingsSchema: any;
       
        /* @ngInject */
        static $inject = ['logger',
            'firebaseData',
            'Ref',
            '$state',
            'currentAuth',
            '_'
            
        ];
        constructor(
            
            private logger: any,
            private firebaseData: any,
            private Ref: any,
            private $state: any,
            private currentAuth: any,
            private _: any
            ) {
            this.init();
        }
        private init() {
            this.stap1Title = 'Stap 1: selecteer een methode.';
            this.stap2Title = 'Stap 2: bepaal je 1 rep max.'
            if (!this.currentAuth) {
                this.$state.go('login');
            }
            this.trainingsMethodes = this.firebaseData.getTrainingsMethodes;
            this.trainingsSchemas = this.firebaseData.getTrainingsSchemas;
            
            this.gebruiker = this.firebaseData.getGebruiker;
            this.activate();
        }
       
        bekijkSchema(m): void{
           
           this.geselecteerdeTrainingsMethode = m;
           this.gefilterdTrainingsSchema = _.filter(this.trainingsSchemas, {'trainingsMethodeId' : this.geselecteerdeTrainingsMethode.$id})  
       }
       
       selecteerTrainingsMethode():void {
           this.toonStap1 = false;
           this.toonStap2 = true;
           this.stap1Title = "Methode = " + this.geselecteerdeTrainingsMethode.omschrijving;
       }
       
       anuleerTrainingsMethode(): void {
           this.gefilterdTrainingsSchema = {};
       }
       
        activate(): void {
            this.logger.info('Gebruikersoverzicht');
            this.gebruiker.$loaded().then(function(response) {
                var _achterNaam: string = '';
                var _email: string = '';
                var _voorNaam: string = '';
                var _uid: string = ''

                angular.forEach(response, function(value, key) {
                
                    //console.log(key, value);
                    if (key == 'voorNaam') {
                        _voorNaam = value
                    };
                    if (key == 'achterNaam') {
                        _achterNaam = value
                    };
                    if (key == 'email') {
                        _email = value
                    };
                });
                Workouts.prototype.user = new app.domain.User(_achterNaam, _email, _voorNaam,response.$id);
            })
        }
    }

    angular
        .module('app.workouts')
        .controller(Workouts.controllerId, Workouts);
}
