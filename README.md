###requirejs使用

---
1. [开篇引题](#开篇引题)
2. [为什么使用require.js](#为什么使用require.js)
3. [require.js加载](#require.js加载)
4.  [配置require.js：config方法](#配置require.js：config方法)
5.  [define方法：定义模块](#define方法：定义模块)
6.  [require方法：调用模块](#require方法：调用模块)
7.  [require合并](#require合并])
8.   [实例列表](#实例列表])
9.   [参考文档](#参考文档])

####开篇引题

随着网站逐渐变成"互联网应用程序"，嵌入网页的**Javascript代码越来越庞大**，越来越复杂。网页越来越像桌面程序，需要一个团队**分工协作**、进度管理、单元测试等等......开发者不得不使用软件工程的方法，管理网页的业务逻辑。


**Javascript模块化**编程，已经成为一个迫切的需求。理想情况下，**开发者只需要实现核心的业务逻辑，其他都可以加载别人已经写好的模块**。
Javascript不是一种模块化编程语言，它不支持"类"（class），就不用谈论模块了。尽管通过**匿名函数自执行（返回方法）或者面向对象等**方式，使其看似模块化，但如何保证方法与调用之间的**依赖关系**是一个值得思考的问题，在这个基础上require.js诞生了

#####目的
通过此次对require.js的分享，能让大家把它应用到项目中，提高代码的复用性，使之呈现模块化编程，提高页面加载速度为以后实现前端组件库奠定基础。

#####方式方法
本次分享采取文字与事例相结合的方式，代码托管在github上，地址是https://github.com/lisongyu/requirejs-learnt，大家可以一起学习讨论

####为什么使用require.js

使用RequireJS的目标是鼓励代码的模块化，它使用了不同于传统<script>标签的脚本加载步骤。可以用它来加速、优化代码，但其主要目的还是为了代码的模块化。它鼓励在使用脚本时以module ID替代URL地址。
#####requirejs的优势
1实现js文件的异步加载，避免网页失去响应，提高性能；
2管理模块之间的依赖性，便于代码的编写和维护。
3.实现了代码的模块化，便于复用。

#####requirejs是什么?
RequireJS是一个工具库，主要用于客户端的模块管理。它可以让客户端的代码分成一个个模块，实现异步或动态加载，从而提高代码的性能和可维护性。它的模块管理遵守AMD规范（Asynchronous Module Definition）。

AMD 模块

AMD（异步模块定义，Asynchronous Module Definition）格式总体的目标是为现在的开发者提供一个可用的模块化 JavaScript 的解决方案。

RequireJS的基本思想是，通过define方法，将代码定义为模块(插件)；通过require方法，实现代码的模块加载。


####require.js加载

使用require.js的第一步，是先去官方网站[下载](http://requirejs.org/docs/download.html)最新版本。
下载后，假定把它放在JavaScript子目录下面，就可以加载了。
```javascript
<script data-main="scripts/main" src="scripts/require.js"></script>
```
上面代码的data-main属性不可省略，用于指定主代码所在的脚本文件，在上例中为scripts子目录下的main.js文件。用户自定义的代码就放在这个main.js文件中。

---

####配置require.js：config方法
require方法本身也是一个对象，它带有一个config方法，用来配置require.js运行参数。config方法接受一个对象作为参数。一般配置项都在页面data-main所指的js中，本文所指main.js。
```javascript
require.config({
    baseUrl: "javascript",
    //packages: ['carousel'],
    paths: {jquery: ['//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js','lib/jquery.min'],
        bootstrap: 'lib/bootstrap'
    }
});
```

config方法的参数对象有以下主要成员：
**（1）baseUrl**

baseUrl参数指定本地模块位置的基准目录，即本地模块的路径是相对于哪个目录的。该属性通常由require.js加载时的data-main属性指定。

**（2）paths**

paths参数指定各个模块的位置。这个位置可以是同一个服务器上的相对位置，也可以是外部网址。可以为每个模块定义多个位置，如果第一个位置加载失败，则加载第二个位置，上面的示例就表示如果CDN加载失败，则加载服务器上的备用脚本。需要注意的是，指定本地文件路径时，可以省略文件最后的js后缀名。

**（3）shim**
通过require加载的模块一般都需要符合AMD规范即使用define来申明模块，但是部分时候需要加载非AMD规范的js，这时候就需要用到另一个功能：shim，shim解释起来也比较难理解，shim直接翻译为"垫"，其实也是有这层意思的。

 非AMD模块输出，将非标准的AMD模块"垫"成可用的模块，例如：在老版本的jquery中，是没有继承AMD规范的，所以不能直接require["jquery"],这时候就需要shim，比如我要是用老版本jquery类库，但是他并没有实现AMD规范，那我们可以这样配置

```javascript
require.config({
    baseUrl: "javascript",
    //packages: ['carousel'],
    paths: {
        jquery: 'lib/jquery.1.6',
        bootstrap: 'lib/bootstrap'

    },
    shim: {
        "jquery" : {
            exports : "$"
        }
    }

});
```
这样配置后，我们就可以在其他模块中引用jquery模块：
```javascript
require(['jquery'], function ($) {

    //do something....
});
```

---
####define方法：定义模块

define方法用于定义模块，RequireJS要求每个模块放在一个单独的文件里。

按照是否依赖其他模块，可以分成两种情况讨论。第一种情况是定义独立模块，即所定义的模块不依赖其他模块；第二种情况是定义非独立模块，即所定义的模块依赖于其他模块。



（1）独立模块(代码示例**math.html**)

如果被定义的模块是一个独立模块，不需要依赖任何其他模块，可以直接用define方法生成。

```javascript
define({
    method1: function() {},
    method2: function() {},
});
```

另一种等价的写法是，把对象写成一个函数，该函数的返回值就是输出的模块。
```javascript
// math.js
　　define(function (){
　　　　var add = function (x,y){
　　　　　　return x+y;
　　　　};
　　　　return {
　　　　　　add: add
　　　　};
　　});
```

（2）非独立模块
如果被定义的模块需要依赖其他模块，则define方法必须采用下面的格式。
```javascript
define(['module1', 'module2'], function(m1, m2) {
   ...
});
```

define方法的第一个参数是一个数组，它的成员是当前模块所依赖的模块。比如，['module1', 'module2']表示我们定义的这个新模块依赖于module1模块和module2模块，只有先加载这两个模块，新模块才能正常运行。一般情况下，module1模块和module2模块指的是，当前目录下的module1.js文件和module2.js文件，等同于写成['./module1', './module2']。

思考？ 如果新模块同属于module文件下，如何定义引入文件路径(module.html)参考

define方法的第二个参数是一个函数，当前面数组的所有成员加载成功后，它将被调用。它的参数与数组的成员一一对应，比如function(m1, m2)就表示，这个函数的第一个参数m1对应module1模块，第二个参数m2对应module2模块。这个函数必须返回一个对象，供其他模块调用。
```javascript
define(['module1', 'module2'], function(m1, m2) {

    return {
        method: function() {
            m1.methodA();
            m2.methodB();
        }
    };

});
```

需要注意的是，回调函数必须返回一个对象，这个对象就是你定义的模块。

如果依赖的模块很多，参数与模块一一对应的写法非常麻烦。
```javascript
define(
    [       'dep1', 'dep2', 'dep3', 'dep4', 'dep5', 'dep6', 'dep7', 'dep8'],
    function(dep1,   dep2,   dep3,   dep4,   dep5,   dep6,   dep7,   dep8){
        ...
    }
);
```

为了避免像上面代码那样繁琐的写法，RequireJS提供一种更简单的写法。
```javascript
define(
    function (require) {
        var dep1 = require('dep1'),
            dep2 = require('dep2'),
            dep3 = require('dep3'),
            dep4 = require('dep4'),
            dep5 = require('dep5'),
            dep6 = require('dep6'),
            dep7 = require('dep7'),
            dep8 = require('dep8');

            ...
    }

});
```

####require方法：调用模块
require方法用于调用模块。它的参数与define方法类似。
#####1.普通加载方式参见(demo.html)

```javascript
require(['jquery','bootstrap'], function ($) {
    $('.carousel').carousel({
        interval: 3000
    });
});
```
上面方法表示加载jquery和bootstrap两个模块，当这两个模块都加载成功后，执行一个回调函数。该回调函数就用来完成具体的任务。require方法的第一个参数，是一个表示依赖关系的数组。
但是页面往往不会只有一个交互效果，如果多了就会展示这样
```javascript
require(['jquery','bootstrap'], function ($) {

    $('.carousel').carousel({
        interval: 3000
    });
});
//收藏方法
require(['jquery'], function ($) {

    var collect=$('.goodsOffer-collect');
    collect.on('collect',function(){
        if(!collect.hasClass('goodsOffer-collect--bg')){
            collect.addClass('goodsOffer-collect--bg');
            collect.html('已收藏');
        }else{
            collect.removeClass('goodsOffer-collect--bg');
            collect.html('收藏店铺');
        }
    })
    collect.on("click",function(){
        $(this).trigger('collect');
    })
});
//出价控制
require(['jquery','sp-bid-control'], function ($) {

    $(".bidderOffer").spBidControl({
        //步长100
        step : 100,
        //不能点击为false
        isDisabled : false,
        //最大值
        maxVal : 500,
        //最小值
        minVal : 0,
        //当前值
        currVal : 0,
        //可编辑性
        isEdit : false,
        isBtnShow : true,
        //按钮样式
        btnStyle : {
            "btnTxt" : "出价", //我要拍
            "btnCss" : "bidderOffer-btn"
        },
        callbackFn : function(currVal, $element, spBidControl) {
            var $chujiaSubmit = $element.find(".chujia-submit");
            // $chujiaSubmit.off("clik.spBidControl");
            // 不能调用currVal这个值作为出价框数值，会出现出价不成功的情况
            var inputPrice = $(".bidderOffer-text").val();
            console.log(inputPrice);

        }
    });
    setTimeout(function() {
        $(".bidderOffer").spBidControl({
            isDisabled : true,
            btnStyle : {
                "btnTxt" : "已结束", //出价
                "btnCss" : "bidderOffer-btn"
            }
        });

    }, timeParm);
});
//导航菜单的显示隐藏
require(['jquery'], function ($) {

    $('.outletHeader-menu').on(clik,function(){
        $('.menu-content').toggle();
        return false;
    })
    $(document).on(clik,function(){
        $('.menu-content').hide();
    });

    $('.closeme').on(clik,function(){
        $(this).parents('.numtips').hide();
    });
});
```
这只是作为参考，目的是为了展示当交互多了的时候会感觉比较乱。参考(demo1.html),为了解决这个问题，引入了包加载模块。

#####2.包模块加载(参考index.html)
RequireJS支持从CommonJS包结构中加载模块，但需要一些额外的配置。具体地，支持如下的CommonJS包特性：
一个包可以关联一个模块名/前缀。
package config可为特定的包指定下述属性：
name: 包名（用于模块名/前缀映射）
location: 磁盘上的位置。位置是相对于配置中的baseUrl值，除非它们包含协议或以“/”开头
main: 当以“包名”发起require调用后，所应用的一个包内的模块。默认为“main”，除非在此处做了另外设定。该值是相对于包目录的。

```javascript
require.config({
    baseUrl: "javascript",
    packages: ['carousel'],
    paths: {
        jquery: 'lib/jquery.min',
        bootstrap: 'lib/bootstrap'

    }
});

//轮播引用
require(['carousel']);
```
在配置文档中不在进行任何操作，只是定义了一个 packages: **['carousel']**，然后在配置后将其加载。这时在所定义的根目录下应有一个为carousel的文件夹，里边的文件通常命名为main.js。
在此main.js中将对引入的插件进行相应操作，具体代码示例如下.
```javascript
require(['jquery', 'bootstrap'], function ($) {
    $('.carousel').carousel({
        interval: 3000
    });
});
```
看起来似乎和普通调用方法没什么区别，但它确实有几个优势
1.模块与插件直接关系更明确，更易于查找。
2.复用性更好，更容易实现模块化。
3.管理维护起来更加方便。
现在存在这么一个问题，如果多个页面都调用此插件，则会导致main.js中多加载一些代码(当然也可忽略)，其实有一个方法可以避免加载更多的代码
我们可以这样配置
```javascript
require.config({
    packages: [
        "carousel",
        {
            name: "carousel",
            main: "carousel"
        }
    ]
});
```
减少麻烦期间，强烈建议包结构遵从“main.js”约定。







