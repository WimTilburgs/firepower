///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
module app.controller {
    interface IGebruiker {
        title: string;
        user: app.domain.IUser;
        inlogGegevens: any;
        activate: () => void;
        userOpslaan: () => void;
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
            this.title = 'Gebruikersoverzicht';
            this.getUser();
            this.activate();
        }
        
        userOpslaan() : void {
            var authData = this.firebaseData.getAuthGegevens;
            this.Ref.child('users').child(authData.uid).update(
                {
                    'voorNaam': this.user.voorNaam,
                    'achterNaam': this.user.achterNaam,
                    'email': this.user.email
                });
            //alert(this.user.voorNaam) 
        }
        
        private getUser(): void {
            var authData = this.firebaseData.getAuthGegevens;
            this.Ref.child('users').child(authData.uid).once('value', function(snapshot) {
                Gebruiker.prototype.makeUser(snapshot.val())

            })
        }

        private makeUser(data) {
            var _achterNaam: string;
            var _email: string;
            var _voorNaam: string;
            Gebruiker.prototype.gegUser = data;
            var x = Gebruiker.prototype.gegUser;
            if (x.provider == 'password') {
                if(!x.email)
                {
                    _email = x.password.email;
                }
                else
                {
                    _email = x.email;
                }
                if(!x.achterNaam){
                    _achterNaam = '';
                }
                else
                {
                    _achterNaam = x.achterNaam;
                }
                if(!x.voorNaam){
                    _voorNaam = '';
                }
                else
                {
                    _voorNaam = x.voorNaam;
                }
                
                
            }
            Gebruiker.prototype.user = new app.domain.User(_achterNaam ,_email, _voorNaam);
        }

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
