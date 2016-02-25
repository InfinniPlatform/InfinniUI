/**
 * @description При изменении размеров окна пересчитывает высоту элементов представления
 */
InfinniUI.AutoHeightService = (function () {
    var TIMEOUT = 40;
    var WAIT = 50;
    var resizeTimeout;

    $(window).resize(function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(_.debounce(onWindowResize, WAIT), TIMEOUT);
    });

    function onWindowResize() {
        layoutManager.init();
    }

})();