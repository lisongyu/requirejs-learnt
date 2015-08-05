require.config({
    baseUrl: "javascript",
    //packages: ['carousel'],
    paths: {
        jquery: 'lib/jquery.1.6',
        bootstrap: 'lib/bootstrap',
        underscore:'lib/underscore'

    },
    shim: {
        "jquery" : {
            exports : "$"
        },
        "underscore" : {
            exports : "_"
        },

    }

});

require(['underscore'], function (_) {
    _.each([1, 2, 3], function(value, key, list){
        alert(value);

    });

});


