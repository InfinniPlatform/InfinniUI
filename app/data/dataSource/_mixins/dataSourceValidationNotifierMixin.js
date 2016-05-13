/**
 *
 * @mixin
 */
var DataSourceValidationNotifierMixin = {
    /**
     * @param dataSource
     */
    initNotifyValidation: function (dataSource) {
        dataSource.onErrorValidator(this.notifyOnValidationError.bind(this));
        dataSource.onWarningValidator(this.notifyOnValidationError.bind(this));
    },

    /**
     * @param context
     * @param args
     */
    notifyOnValidationError: function (context, args) {
        this.notifyOnValidationResult(args.value, 'error');
    },

    /**
     * @param context
     * @param args
     */
    notifyOnValidationWarning: function (context, args) {
        this.notifyOnValidationResult(args.value, 'warning');
    },

    /**
     * @param {Object} result
     * @param {boolean} result.isValid
     * @param {Array.<Object>} result.items
     * @param {string} validationType Тип сообщения "error" или "warning"
     */
    notifyOnValidationResult: function (result, validationType) {
        if (typeof result === 'undefined' || result === null || result['IsValid'] || !Array.isArray(result['Items'])) {
            return;
        }

        result['Items'].forEach(function (item) {
            var exchange = window.InfinniUI.global.messageBus;
            exchange.send(messageTypes.onNotifyUser, {item: item, messageText: item.Message, messageType: "error"});
        });
    }
};