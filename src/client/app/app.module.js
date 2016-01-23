(function () {
    'use strict';

    angular.module('app', [
        'ui.grid',
        'ui.grid.edit',
        'app.core',
        'app.widgets',
        'app.firebase',
        'app.home',
        'app.admin',
        'app.dashboard',
        'app.layout',
        'app.login',
        'app.trainen',
        'app.stamgegevens'
    ])
    .constant('_',window._);

})();
