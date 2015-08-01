require.config({
    baseUrl: "javascript",
    //packages: ['carousel'],
    paths: {
        jquery: 'lib/jquery.min',
        bootstrap: 'lib/bootstrap'

    }
});

//carousel.html 事例
//require(['carousel']);
require(['jquery', 'bootstrap'], function ($) {

    console.log($('.carousel').length);


});


