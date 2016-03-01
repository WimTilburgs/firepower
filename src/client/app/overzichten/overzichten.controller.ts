///<reference path="../../../../typings/angularjs/angular.d.ts"/>
///<reference path="../core/app.domain.ts"/>
///<reference path="../core/user.service.ts"/>
module app.controller {


    class OverzichtenController {
        static controllerId = 'OverzichtenController';
        title: string;
        //user: app.domain.IUser;
       
       
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
            this.title = 'Overzichten';

            if (!this.currentAuth) {
                this.$state.go('login');
            }
            


            this.activate();
        }

       


        activate(): void {

        }

       
    }



    angular
        .module('app.overzichten')
        .controller(OverzichtenController.controllerId, OverzichtenController);
}
