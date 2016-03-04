///<reference path="../../../../typings/tsd.d.ts"/>

module app.controller {

    class AdminController {

        static controllerId = 'AdminController';
        title: string = "Tijdelijk"
        authData: any;
        oudeTrainingen: any;
        conversieTrainingen: any;
        /* @ngInject */
        static $inject = [
            '$state',
            'currentAuth',
            '_',
            'fireData',
            'Ref'


        ];
        constructor(
            private $state: any,
            private currentAuth: any,
            private _: any,
            private fireData: app.core.FireData,
            private Ref

        ) {
            this.init();
        }
        private init() {

            if (!this.currentAuth) {
                this.$state.go('login');
            }


            if (!this.currentAuth) {
                return;
            } else {
                var geg = [];
                this.authData = this.currentAuth;
                var refWorkouts = this.Ref.child('workouts');

            }

        }
        
        converteerTrainingen():void{
            var refWorkouts = this.Ref.child('workouts');
            var temp = _.orderBy(this.conversieTrainingen,['datum','oefeningOmschrijving','workoutNummer','setNummer'],['desc']);
           _.each(temp,function(data){
               data.datum.setHours(0,0,0,0);
               //date1.setHours(0,0,0,0);
               data.datum = data.datum.getTime();
               refWorkouts.push(data);
           }) 
        }
        haalTrainingen(): void {
            var geg;
            var conversie = [];
            var refTrainingen = this.Ref.child('trainingen');
            refTrainingen.on("value", function(snapshot) {
                // snapshot.forEach(function(trainingSnap) {
                //     geg.push (new Date(trainingSnap.val().datum)) ;
                //     //console.log(geg);
                // })
                
                geg = snapshot.val();
                
            });
            if(geg){
                
                geg = _.filter(geg,{userName:"wim3025@hotmail.com"});
                //geg = _.orderBy(geg, ['datum'], ['asc']);
                _.each(geg,function(data) {
                    //conversie.push([new Date(data.datum),data.userName]);
                   // conversie.push([data.datum.getTime()]);
                    var train = new app.domain.Trainingen(
                        data.workoutNummer,
                        data.setNummer,
                        new Date(data.datum),
                        //(data.datum).getTime(),
                        data.percentage,
                        data.aantalReps,
                        0,
                        data.gewicht,
                        data.repsFree,
                        data.realisatie,
                        AdminController.prototype.maakOefeningId(data.oefeningId),
                        data.oefeningOmschrijving,
                        data.fireUid,
                        "Wim",
                        "Tilburgs",
                        "-K9WjnnaU6QggCdPtxBx",
                        "Wendel 531 Pyramide amrap* op rep 3 en 5",
                        "" 
                    )
                    console.log(train)
                    conversie.push(train)
                })
                
                //console.log(conversie);
                //console.log(geg);
                
            }
            this.oudeTrainingen = geg;
            this.conversieTrainingen = conversie;
        }
        maakOefeningId(id){
            
            var temp  = "";
            //squat
            if(id==1){
                temp = "-K9arXgvTQrUmiZW6uxj"
            }
            //overhead press
            if(id==4){
               temp = "-K9WjnnaU6QggCdPtxBx" 
            }
            //deadlift
            if(id==2){
               temp = "-K9arTEovYtYpeDVKhpp" 
            }
            else {
                temp = "-K9ar4Q4uRc95BOy3jy0" 
            }
            return temp;
        }
    }
    angular
        .module('app.admin')
        .controller(AdminController.controllerId, AdminController);
}
