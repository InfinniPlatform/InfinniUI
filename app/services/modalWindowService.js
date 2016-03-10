InfinniUI.ModalWindowService = (function () {
    var modalQueue = [];

    return {
        modalWasOpened: function (obj) {
            if (modalQueue.length != 0) {
                var previous = modalQueue[modalQueue.length - 1];

                previous.modal.hide();
                previous.background.hide();
            }

            modalQueue.push(obj);
        },

        modalWasClosed: function (modal) {
            for (var i = 0, length = modalQueue.length; i < length; i++) {
                if (modalQueue[i].modal == modal) {
                    // Если последний
                    if (i == length - 1 && i != 0) {
                        var previous = modalQueue[i - 1];

                        previous.modal.show();
                        previous.background.show();
                        notifyLayoutChange();
                    }

                    modalQueue.splice(i, 1);
                }
            }

        }
    };

    function notifyLayoutChange () {
        var exchange = window.InfinniUI.global.messageBus;
        exchange.send('OnChangeLayout', {});
    }
})();
