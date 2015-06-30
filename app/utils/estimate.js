/**
 * @description Выводит в консоль информацию о времени выполнения функции
 * Напр. var someFunc = function () {// .... //}.estimate('someFunc');
 */
Function.prototype.estimate = function (name) {
    var func = this;

    return function () {
        var args  = Array.prototype.slice.call(arguments);
        var error = new Error("Stack trace");
        var start = Date.now();
        var result = func.apply(this, args);
        var end = Date.now();

        showInfo();
        return result;

        function showInfo() {
            console.groupCollapsed('%s: %s ms', name, (end - start).toLocaleString());
            console.log(Date(start));
            console.groupCollapsed('arguments');
            console.log(args);
            console.groupEnd();
            console.groupCollapsed('Stack trace');
            console.log(error.stack);
            console.groupEnd();
            console.groupEnd();
        }
    }
};