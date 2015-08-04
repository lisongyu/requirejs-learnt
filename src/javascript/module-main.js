require.config({
    baseUrl: "javascript",
    //packages: ['carousel'],
    paths: {
       moduleA: 'module/module'
    }
});
//加载module方法
require(['moduleA'], function (moduleX){
    moduleX.method()
});
;





