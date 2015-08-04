
define(['module/module1', 'module/module2'], function(m1, m2) {
    return {
        method: function() {
            m1.methodA();
            m2.methodB();
        }
    };
});
