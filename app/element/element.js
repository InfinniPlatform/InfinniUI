
var Element = function (parentView) {
    this.parent = null;
    this.children = new ChildrenElementCollection(this);
    this.parentView = parentView;
    this.control = this.createControl();
    this.state = {
        Enabled: true
    };
    this.eventStore = new EventStore();
};

_.extend(Element.prototype, {

    getParent: function () {
        return this.children.getParent();
    },

    getChildElements: function () {
        return this.children.getList();
    },

    getChildren: function () {
        return this.children;
    },

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
        if (typeof isEnabled !== 'boolean') {
            return;
        }

        this.setState('Enabled', isEnabled);

        var parentEnabled = this.control.get('parentEnabled');
        var old = this.control.get('enabled');

        isEnabled = parentEnabled && isEnabled;

        if (isEnabled === old) {
            return;
        }

        this.control.set('enabled', isEnabled);
        this.setParentEnabledOnChild(isEnabled);
    },

    setParentEnabledOnChild: function (value) {
        var elements = this.getChildElements();
        if (_.isEmpty(elements) === false) {
            for (var i = 0, ln = elements.length; i < ln; i = i + 1) {
                if (typeof elements[i].setParentEnabled === 'undefined') {
                    continue;
                }
                elements[i].setParentEnabled(value);
            }
        }
    },

    setParentEnabled: function (value) {

        if (typeof value !== 'boolean') {
            return;
        }

        var old = this.control.get('parentEnabled');
        this.control.set('parentEnabled', value);

        if (old !== value) {
            var enabled = value && this.getState('Enabled');
            this.control.set('enabled', enabled);
            this.setParentEnabled(enabled);
            this.setParentEnabledOnChild(enabled);
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

    getStyle: function(){
        return this.control.get('style');
    },

    setStyle: function(style){
        if(typeof style == 'string'){
            this.control.set('style', style);
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

    setIsLoaded: function () {
        this.control.set('isLoaded', true);
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
    },

    getState: function (name) {
        return this.state[name];
    },

    setState: function (name, value) {
        this.state[name] = value;
    },

    onKeyDown: function (handler) {
        var element = this;
        var callback = function (data) {
            data.source = element;
            handler(data);
        };
        return this.control.onKeyDown(callback);
    }
});