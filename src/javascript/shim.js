require.config({
    baseUrl: "javascript",
    //packages: ['carousel'],
    paths: {
        jquery: 'lib/jquery-1.6',
        bootstrap: 'lib/bootstrap'

    },
    shim: {
        "jquery" : {
            exports : "$"
        }
    }

});

require(['jquery'], function ($) {

    alert($('.carousel').length);
});


