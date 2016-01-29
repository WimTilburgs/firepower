///<reference path="../../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../../../../../typings/lodash/lodash.d.ts"/>
///<reference path="../../core/app.domain.ts"/>
///<reference path="../../core/user.service.ts"/>

module app.controller {
    interface IOneRepMaxen {
        gebruiker: any;
        gridOneRepMaxen: any;
        oefening: any;
        oefeningen: any;
        filteredOneRepMaxen: app.domain.OneRepMax[];
        oneRepMaxen: app.domain.OneRepMax[];
        oneRepMax: app.domain.OneRepMax;
        title: string;
        toonButtonNieuw: boolean;
        user: app.domain.IUser;

        activate: () => void;
        oefeningSelecteren: (m: any) => void;
        oneRepMaxOpslaan: () => void
    }

    class OneRepMaxen implements IOneRepMaxen {
        static controllerId = 'OneRepMaxen';
        gebruiker: any;
        gridOneRepMaxen: any = {};
        oefening: any;
        oefeningen: any;
        toonButtonNieuw: boolean = true;
        oneRepMax: app.domain.OneRepMax;
        oneRepMaxen: any;
        filteredOneRepMaxen: any;
        
        
        title: string;
        private oefeningFilter: string;
        user: app.domain.IUser;
        
        /* @ngInject */
        static $inject = ['logger',
            'firebaseData',
            'Auth',
            'Ref',
            '$state',
            'currentAuth',
            'userService',
            '_'
        ];
        constructor(

            private logger: any,
            private firebaseData: any,
            private Auth: any,
            private Ref: any,
            private $state: any,
            private currentAuth: any,
            private userService: any,
            private _: any) {
            this.init();
        }
        private init() {
            this.title = 'Onderhoud OneRepMaxen voor ';

            if (!this.currentAuth) {
                this.$state.go('login');
            }
            this.gebruiker = this.firebaseData.getGebruiker;
            this.oefeningen = this.firebaseData.getOefeningen;
            this.oneRepMaxen = this.firebaseData.getOneRepMaxenPerGebruiker(this.currentAuth.uid);
            this.filteredOneRepMaxen = this.oneRepMaxen;
            
           
            
            this.activate();
        }

        oefeningSelecteren(m): void {
            this.oefening = m;
            this.filteredOneRepMaxen = _.filter(this.oneRepMaxen,{'oefeningUid': m.$id})
            this.oneRepMax = null;
        }
        oneRepMaxSelecteren(m): void {
            //this.oneRepMax.datum 
            this.oneRepMax = m;
            this.oneRepMax.datum = new Date(m.datum);
            //tempOefening = oefening;
            //vm.geselecteeedeOnRepMax.oefeningOmschrijving = vm.geselecteerdeOefening.omschrijving;
            this.toonButtonNieuw = false;
            
        }
        
        oneRepMaxOpslaan(): void {
            if(this.oefening === undefined) {
                this.logger.error('selecteer een oefening!');
                return;
            }
            
            var orm = new app.domain.OneRepMax(
                this.oefening.$id,
                this.oefening.omschrijving,
                this.user.uid,
                this.user.voorNaam + ' ' + this.user.achterNaam,
                this.oneRepMax.datum.getTime(),
                this.oneRepMax.orm,
                null);
                //console.log(orm);
                this.oneRepMaxen.$add(orm);
                this.filteredOneRepMaxen = this.oneRepMaxen;
                this.oneRepMax = null;
        }
        
        activate(): void {
            this.logger.info('OnerepMax view');
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
                OneRepMaxen.prototype.user = new app.domain.User(_achterNaam, _email, _voorNaam,response.$id);
            })
        }
    }



    angular
        .module('app.stamgegevens')
        .controller(OneRepMaxen.controllerId, OneRepMaxen);
}



