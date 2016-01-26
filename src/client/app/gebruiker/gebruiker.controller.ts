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
            
            //this.gegUser = this.MaakGebruiker();
            //alert(this.gegUser);
            //this.user = new app.domain.User('jassan','hassan');
            
            this.MaakGebruiker();
                this.activate();
        }
        MaakGebruiker() : any
        {
           var authData = this.firebaseData.getAuthGegevens;
           this.Ref.child('users').child(authData.uid).once('value', function (snapshot) {
                //var data = snapshot.val().password.email;
                console.log(snapshot.val().password.email);
                //var x = 
                Gebruiker.prototype.gegUser =  snapshot.val();
                var x = Gebruiker.prototype.gegUser;
                var achternaam = x.password.email;
                Gebruiker.prototype.user = new app.domain.User(achternaam,'wim');
            })
           
           //alert(test);
           
        }

        // getUser() : any {
        //     var authData = this.Auth.$getAuth();
        //     if (authData) {
        //         this.Ref.child('users').child(authData.uid).once('value', function(snapshot) {
        //             if (snapshot.val() === null) {
        //                 
        //                 return snapshot.val();
        //             }
        //             else {
        //                 console.log(snapshot.val());
        //                 return new app.domain.User('Tilburgs','Wim')
        //                 
        //             }
        //             //return snapshot.val();
        //         })
        //     }
        // }

        activate(): void {
            this.logger.info('Gebruikersoverzicht');
        //     this.gegUser.$loaded(function () {
        //     console.log(this.gegUser);
        //     var test = 'Tilburgs'
        //     Gebruiker.prototype.user = new app.domain.User(test,'wim');
        // })

        }
    }

    angular
        .module('app.gebruiker')
        .controller(Gebruiker.controllerId, Gebruiker);
}
