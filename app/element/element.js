var Element = function (parentView) {
    this.parentView = parentView;
    this.control = this.createControl();
};

_.extend(Element.prototype, {

    createControl: function () {
        throw ('Не перегружен абстрактный метод Element.createControl');
    },

    getView: function () {
        return this.parentView;
    },

    getName: function () {
        return this.control.get('name');
    },

    setName: function (name) {
        if (typeof name == 'string') {
            this.control.set('name', name);
        }
    },

    getText: function () {
        return this.control.get('text');
    },

    setText: function (text) {
        if (typeof text !== 'undefined') {
            this.control.set('text', text);
        }
    },

    getEnabled: function () {
        return this.control.get('enabled');
    },

    setEnabled: function (isEnabled) {
        if (typeof isEnabled == 'boolean') {
            this.control.set('enabled', isEnabled);
        }
    },

    getVisible: function () {
        return this.control.get('visible');
    },

    setVisible: function (isVisible) {
        if (typeof isVisible == 'boolean') {
            this.control.set('visible', isVisible);
        }
    },

    getHorizontalAlignment: function () {
        return this.control.get('horizontalAlignment');
    },

    setHorizontalAlignment: function (horizontalAlignment) {
        if (typeof horizontalAlignment == 'string') {
            this.control.set('horizontalAlignment', horizontalAlignment);
        }
    },

    getVerticalAlignment: function () {
        return this.control.get('verticalAlignment');
    },

    setVerticalAlignment: function (verticalAlignment) {
        if (typeof verticalAlignment == 'string') {
            this.control.set('verticalAlignment', verticalAlignment);
        }
    },

    getChildElements: function () {
        return this.control.getChildElements();
    },

    onLoaded: function (handler) {
        this.control.onLoaded(handler);
    },

    onLostFocus: function (handler) {
        this.control.controlView.addEventHandler('OnLostFocus', handler);
    },

    onGotFocus: function (handler) {
        this.control.controlView.addEventHandler('OnGotFocus', handler);
    },

    getIsLoaded: function () {
        return this.control.get('isLoaded');
    },

    render: function () {
        return this.control.render();
    },

    getWidth: function () {
    },

    getHeight: function () {
    },

    getScriptsStorage: function () {
        return this.parentView;
    },

    /**
     * Установка состояния валидации элеменат
     * @param {String} [state="success"]
     * @param {String} [message]
     */
    setValidationState: function (state, message) {
        this.control.set('validationMessage', message);
        this.control.set('validationState', state);
    },

    /**
     * Получение состояния валидации элеменат
     * @return {String} [state="success"]
     */
    getValidationState: function () {
        return this.control.get('validationState');
    }
});