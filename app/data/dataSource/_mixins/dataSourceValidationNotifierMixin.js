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
        if (typeof result === 'undefined' || result === null || result.isValid || !Array.isArray(result.items)) {
            return;
        }

        result.items.forEach(function (item) {
            if (typeof item.property === 'undefined' || _.isEmpty(item.property)) {

                var exchange = messageBus.getExchange('global');
                exchange.send(messageTypes.onNotifyUser, {messageText: item.message, messageType: validationType});
            }
        });
    }
};