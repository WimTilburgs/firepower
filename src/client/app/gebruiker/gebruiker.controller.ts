///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
///<reference path="../core/user.service.ts"/>
module app.controller {


    class Gebruiker {
        static controllerId = 'Gebruiker';
        title: string;
        user: app.domain.IUser;
       
       
        /* @ngInject */
        static $inject = ['logger',
            'firebaseData',
            'Auth',
            'Ref',
            '$state',
            'currentAuth',

        ];
        constructor(

            private logger: any,
            private firebaseData: any,
            private Auth: any,
            private Ref: any,
            private $state: any,
            private currentAuth: any
        ) {
            this.init();
        }
        private init() {
            this.title = 'Gebruikersoverzicht';

            if (!this.currentAuth) {
                this.$state.go('login');
            }
            var testGebruiker = null;
            var refUser = this.Ref.child("users").child(this.currentAuth.uid).child('data');
            refUser.on("value", function(snapshot) {

                if (!snapshot.val()) {
                    return;
                } else {
                    testGebruiker = snapshot.val();
                }
                //console.log(snapshot.val());
                //Workouts.prototype.gebruiker = snapshot.val();
                // testGebruiker = snapshot.val();  
                
            }, function(errorObject) {
                console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                return;
            });
            if (testGebruiker == null) {
                //this.userOpslaan();
                this.makeUser(this.currentAuth);
                console.log(this.currentAuth);
            }


            this.activate();
        }

        userOpslaan(): void {
            this.Ref.child('users').child(this.currentAuth.uid).child("data").update(
                {
                    'voorNaam': "bert",
                    'achterNaam': "de beer",
                    'email': "wim3025@hotmail.com"
                });
        }



        activate(): void {

        }

        private makeUser(data) {
            var _achterNaam: string;
            var _email: string;
            var _voorNaam: string;

            var x = data;
            //alert(x.achterNaam)
            switch (x.provider) {
                case 'password':
                    _achterNaam = '';
                    _voorNaam = '';
                    _email = x.password.email;


                    break;

                case 'facebook':
                    _achterNaam = x.facebook.cachedUserProfile.last_name;
                    _voorNaam = x.facebook.cachedUserProfile.first_name;
                    _email = x.facebook.cachedUserProfile.email;

                    break;

                case 'google':
                    _achterNaam = x.google.cachedUserProfile.family_name;
                    _voorNaam = x.google.cachedUserProfile.given_name;
                    _email = '';

                    break;

                default:
                    break;
            }
           this.Ref.child('users').child(this.currentAuth.uid).child("data").update(
                {
                    'voorNaam': _voorNaam,
                    'achterNaam': _achterNaam,
                    'email': _email
                });
           //this.user = new app.domain.User(_achterNaam, _email, _voorNaam);
        }
    }



    angular
        .module('app.gebruiker')
        .controller(Gebruiker.controllerId, Gebruiker);
}
