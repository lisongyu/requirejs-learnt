require.config({
    baseUrl: "javascript",
    packages: ['carousel',{
        name: "carousel",
        main: "carousel"
    }],
    paths: {
        jquery: 'lib/jquery.min',
        bootstrap: 'lib/bootstrap'

    }
});

//carousel.html 事例
require(['carousel']);





