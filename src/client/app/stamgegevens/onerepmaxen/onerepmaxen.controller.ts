///<reference path="../../../../../typings/tsd.d.ts"/>

///<reference path="../../core/app.domain.ts"/>


module app.controller {
    interface IOneRepMaxen {
        gebruiker: any;
        gridOneRepMaxen: any;
        oefening: any;
        oefeningen: any;
        filteredOneRepMaxen: app.domain.IOneRepMaxen[];
        oneRepMaxen: any;
        oneRepMax: app.domain.IOneRepMaxen;
        title: string;
        toonButtonNieuw: boolean;
        toonInvoerScherm: boolean;
        user: app.domain.IUser;

        activate: () => void;
        oefeningSelecteren: (m: any) => void;
        oneRepMaxOpslaan: () => void
    }

    class OneRepMaxen implements IOneRepMaxen {
        static controllerId = 'OneRepMaxen';
        gebruiker: any;
        gridOneRepMaxen: any;
        oefening: any;
        oefeningen: any;
        toonButtonNieuw: boolean = true;
        toonInvoerScherm: boolean = false;
        oneRepMax: app.domain.IOneRepMaxen;
        oneRepMaxen: any;
        filteredOneRepMaxen: any;
        
        
        title: string;
        private oefeningFilter: string;
        user: app.domain.IUser;
        
        /* @ngInject */
        static $inject = ['logger',
            'fireData',
            '$state',
            'currentAuth',
            '_'
        ];
        constructor(

            private logger: any,
            private fireData: app.core.FireData,
            private $state: any,
            private currentAuth: any,
            private _: any) {
            this.init();
        }
        private init() {
            this.title = 'Onderhoud OneRepMaxen voor ';

            if (!this.currentAuth) {
                this.$state.go('login');
            }
            
            this.gebruiker = this.fireData.getGebruiker(this.currentAuth);
             this.gebruiker.$loaded().then(function(response) {
                OneRepMaxen.prototype.user = app.domain.User.prototype.getUser(response);
            })
            
            this.oefeningen = this.fireData.haalOefeningen();
            this.oefeningen.$loaded( function(response){
                alert(response[0].omschrijving)
            })
            this.oneRepMaxen = this.fireData.getOneRepMaxenPerGebruiker(this.currentAuth.uid);
            //this.filteredOneRepMaxen = this.oneRepMaxen;
            this.oefening = null; 
            
            
            this.activate();
        }

        oefeningSelecteren(m): void {
            this.oefening = m;
            this.filteredOneRepMaxen = _.filter(this.oneRepMaxen,{'oefeningUid': this.oefening.$id});
            this.filteredOneRepMaxen = _.orderBy(this.filteredOneRepMaxen, ['datum'],['desc'])
            this.oneRepMax = null; 
            this.toonButtonNieuw = true;
            this.toonInvoerScherm = true;
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
            this.oneRepMaxWegschrijven('nieuw');       
        }
        
        oneRepMaxWijzigen(): void {
            this.oneRepMaxWegschrijven('wijzigen');
        }
        
        oneRepMaxVerwijderen(): void {
            this.oneRepMaxWegschrijven('verwijderen');
        }
        
        oneRepMaxOpslaanTonen(): void {
            this.toonButtonNieuw = true;
            this.oneRepMax = null; 
            
        }
        
        private oneRepMaxWegschrijven(actie: string):void {
            var orm = new app.domain.OneRepMaxen(
                this.oefening.$id,
                this.oefening.omschrijving,
                this.user.uid,
                this.user.voorNaam + ' ' + this.user.achterNaam,
                this.oneRepMax.datum.getTime(),
                this.oneRepMax.orm,
                null);
                switch (actie) {
                    
                    case 'nieuw':
                    //alert(actie);
                    this.oneRepMaxen.$add(orm);
                    break;
                    
                    case 'wijzigen':
                    //alert(actie);
                    this.oneRepMaxen.$save(orm).then(function(){
                        
                    });
                    
                    this.toonButtonNieuw = true;
                    break;
                    
                    case 'verwijderen':
                    this.oneRepMaxen.$remove(this.oneRepMax);
                    this.toonButtonNieuw = true;
                    break;
                    
                    default:
                    break;
                }
                
               this.oneRepMax = null; 
               this.filteredOneRepMaxen = this.oneRepMaxen;
                
        }
        
        activate(): void {
            this.logger.info('OnerepMax view');
           
        }
    }



    angular
        .module('app.stamgegevens')
        .controller(OneRepMaxen.controllerId, OneRepMaxen);
}



