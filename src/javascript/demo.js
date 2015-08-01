require.config({
    baseUrl: "javascript",
    //packages: ['carousel'],
    paths: {
        jquery: 'lib/jquery.min',
        bootstrap: 'lib/bootstrap'

    }
});

//carousel.html ÊÂÀý
//require(['carousel']);
require(['jquery', 'bootstrap'], function ($) {

    $('.carousel').carousel({
        interval: 3000
    });
    alert(2222);
});


