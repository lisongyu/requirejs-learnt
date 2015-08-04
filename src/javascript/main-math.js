require.config({
    baseUrl: "javascript",
    //packages: ['carousel'],
    paths: {
        math: 'single/math',
        method: 'single/method'


    }
});
//加载method方法
require(['method'], function (method){
    alert(method.method1(3,4));
});

// math.js
require(['math'], function (math){
    alert(math.add(1,1));
});



