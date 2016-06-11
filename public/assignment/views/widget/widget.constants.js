(function () {
    angular
        .module('WebAppMaker')
        .constant('WIDGET', {

            TA_TOOLBAR: [
                ['h1', 'h2', 'h3',
                    'bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol',
                    'justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent',
                    'html']
            ]
        })
        .run(function ($rootScope, WIDGET) {
            $rootScope.WIDGET = WIDGET;
        });
})();