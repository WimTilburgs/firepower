///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
module app.controller {
    interface IGebruiker {
        title: string;
        user: app.domain.IUser;
        inlogGegevens: any;
        activate: () => void;
        gegUser: any;
    }

    class Gebruiker implements IGebruiker {
        static controllerId = 'Gebruiker';
        title: string;
        user: app.domain.IUser;
        inlogGegevens: any;
        gegUser: any;
        /* @ngInject */
        static $inject = ['logger', 'firebaseData', 'Auth', 'Ref'];
        constructor(private logger: any, private firebaseData: any, private Auth: any, private Ref: any) {
            this.init();
        }
        private init() {
            //this.getUser();
            //this.user = new app.domain.User('Tilburgs' , 'Wim');
            //this.inlogGegevens = this.firebaseData.getAuthGegevens;
            //console.log(this.inlogGegevens)
            this.title = 'Gebruikersoverzicht',
            this.gegUser = this.firebaseData.getGebruiker;
            console.log(this.gegUser.provider);
             this.user = new app.domain.User('jassan','hassan');
            
            
                this.activate();
        }
        

        getUser() : any {
            var authData = this.Auth.$getAuth();
            if (authData) {
                this.Ref.child('users').child(authData.uid).once('value', function(snapshot) {
                    if (snapshot.val() === null) {
                        
                        return snapshot.val();
                    }
                    else {
                        console.log(snapshot.val());
                        return new app.domain.User('Tilburgs','Wim')
                        
                    }
                    //return snapshot.val();
                })
            }
        }

        activate(): void {
            this.logger.info('Gebruikersoverzicht');
            this.gegUser.$loaded(function () {
            this.user = new app.domain.User('jassan','hassan');
        })

        }
    }

    angular
        .module('app.gebruiker')
        .controller(Gebruiker.controllerId, Gebruiker);
}
