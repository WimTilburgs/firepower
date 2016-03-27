///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
///<reference path="../core/user.service.ts"/>
module app.controller {


    class Gebruiker {
        static controllerId = 'Gebruiker';
        title: string;
        user: app.domain.IUser;
        imagePath: string = "images/Bench Press-52.png"
        gebruiker: any;
        gebruikerInlog: any;
        geboorteDate;
        //leeftijd: number;
        leeftijdString: string;

        /* @ngInject */
        static $inject = ['logger',
            'fireData',
            'Auth',
            'Ref',
            '$state',
            'currentAuth',

        ];
        constructor(

            private logger: any,
            private fireData: app.core.FireData,
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
            } if (!this.currentAuth) {
                return;
            } else {
                var aut = this.currentAuth;
                this.gebruikerInlog = this.currentAuth;
                this.gebruiker = this.fireData.getGebruiker(this.currentAuth);

                var refUser = this.Ref.child("users").child(this.currentAuth.uid).child('data');
                refUser.on("value", function(snapshot) {

                    if (!snapshot.val()) {
                        Gebruiker.prototype.makeUser(aut, refUser);
                        //console.log(test);
                    }

                }, function(errorObject) {
                    console.log("Fout bij het lezen van de gegevens: " + errorObject.code);
                    return;
                });
            }

            this.activate();
        }

        gebruikerWijzigen(): void {
            if (!this.geboorteDate || this.geboorteDate == "Invalid Date") {
                Gebruiker.prototype.leeftijdString = "";
                this.gebruiker.data.geboorteDatum = null;
            } else {
                var datum = this.geboorteDate.getTime();
                console.log(datum)
                Gebruiker.prototype.leeftijdString = Gebruiker.prototype.berekenLeeftijd(datum);
                this.gebruiker.data.geboorteDatum = datum;
            }
            this.gebruiker.$save();
        }

        activate(): void {

            this.gebruiker.$loaded().then(function(response) {
                let gdatum = response.data.geboorteDatum
                Gebruiker.prototype.leeftijdString = Gebruiker.prototype.berekenLeeftijd(gdatum);
                Gebruiker.prototype.geboorteDate = new Date(gdatum);
            });
        }
        
        gaTrainen(): void {
            this.$state.go('trainingen');
        }
        
        gaOverzichten(): void {
            this.$state.go('overzichten');
        }


        berekenLeeftijd(datum): string {
            let today = new Date();
            var geboorteDatum = new Date(datum);
            var maandMeervoud = "maanden"
            var vandaagMaand = today.getMonth();
            var geboorteMaand = geboorteDatum.getMonth();
            var verschilMaanden = 0;

            let leeftijd = today.getFullYear() - geboorteDatum.getFullYear();

            geboorteDatum.setFullYear(today.getFullYear());
            if (today < geboorteDatum) {
                leeftijd--;
                verschilMaanden = 12 - geboorteMaand + vandaagMaand;
            }
            else {
                verschilMaanden = vandaagMaand - geboorteMaand;
            }
            if (verschilMaanden == 1) {
                maandMeervoud = "maand"
            }
            if (verschilMaanden == 0) {
                return "Leeftijd " + leeftijd + " jaar"
            }

            return "Leeftijd " + leeftijd + " jaar en " + verschilMaanden + " " + maandMeervoud;
        }

        makeUser(data, refUser) {
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
            //console.log(_achterNaam,_voorNaam,_email)
            //console.log(Gebruiker.prototype.Ref);
            refUser.update(
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
