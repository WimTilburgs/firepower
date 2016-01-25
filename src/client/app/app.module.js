(function() {
    'use strict';

    angular.module('app', [
        'ui.grid',
        'ui.grid.edit',
        'ui.bootstrap',
        'app.core',
        'app.firebase',
        'app.widgets',
        'app.admin',
        'app.dashboard',
        'app.gebruiker',
        'app.home',
        'app.layout',
        'app.login',
        'app.stamgegevens',
        'app.trainen',
    ])
 .constant('_',window._);
})();
