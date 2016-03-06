(function() {
    'use strict';

    angular.module('app', [
        'ngMaterial',
        'ngMessages',
        'md.data.table',
        'ui.grid',
        'ui.grid.edit',
        'ui.bootstrap',
        'app.core',
        'app.firebase',
        'app.widgets',
        'app.admin',
        'app.overzichten',
        'app.gebruiker',
        'app.home',
        'app.layout',
        'app.login',
        'app.stamgegevens',
        'app.trainen',
        'app.trainingen',
        'app.workouts',
    ])
 .constant('_',window._);
})();
