var Element = function (parent, viewMode) {
    this.parent = parent;
    this.control = this.createControl(viewMode);
    this.state = {
        Enabled: true
    };

    this.childElements = [];

    this.eventStore = new EventStore();
};

Object.defineProperties(Element.prototype, {
    name: {
        get: function () {
            return this.getName()
        }
    }
});

_.extend(Element.prototype, {

    createControl: function (viewMode) {
        throw ('Не перегружен абстрактный метод Element.createControl');
    },

    setParent: function (parentElement) {
        this.parent = parentElement;
    },

    getParent: function () {
        return this.parent;
    },

    getChildElements: function () {
        return this.childElements;
    },

    getView: function () {
        if (!this.parentView) {
            if (this.parent instanceof View) {
                this.parentView = this.parent;

            } else {
                if (this.parent && this.parent.getView) {
                    this.parentView = this.parent.getView();
                } else {
                    this.parentView = null;
                }
            }
        }

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

    getProperty: function (name) {
        var getterMethodName = 'get' + this._upperFirstSymbol(name);
        if (typeof this[getterMethodName] == 'function') {
            return this[getterMethodName]();
        } else {
            throw 'expect that ' + getterMethodName + ' is getter function';
        }
    },

    setProperty: function (name, value) {
        var setterMethodName = 'set' + this._upperFirstSymbol(name),
            getterMethodName;

        if (typeof this[setterMethodName] == 'function') {
            this[setterMethodName](value);
        } else {
            if (this._isCollectionProperty(name)) {
                getterMethodName = 'get' + this._upperFirstSymbol(name);
                this[getterMethodName]().set(value);
            } else {
                throw 'expect that ' + setterMethodName + ' is setter function';
            }
        }
    },

    _isCollectionProperty: function (propertyName) {
        var getterMethodName = 'get' + this._upperFirstSymbol(propertyName);
        return (typeof this[getterMethodName] == 'function') && this[getterMethodName]() instanceof Collection;
    },

    onPropertyChanged: function (propertyName, handler) {
        var subscribingMethodName = 'on' + this._upperFirstSymbol(propertyName) + 'Changed';
        if (typeof this[subscribingMethodName] == 'function') {
            this[subscribingMethodName](handler);
        } else {
            this.control.on('change:' + propertyName, function (model, value) {
                var parentView = this.getView(),
                    context = parentView ? parentView.getContext() : undefined,
                    args = {
                        oldValue: model.previous(propertyName),
                        newValue: value
                    };
                handler(context, args);
            }.bind(this));
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

    getStyle: function () {
        return this.control.get('style');
    },

    setStyle: function (style) {
        if (typeof style == 'string') {
            this.control.set('style', style);
        }
    },

    getTextHorizontalAlignment: function () {
        return this.control.get('textHorizontalAlignment');
    },

    setTextHorizontalAlignment: function (value) {
        if (InfinniUI.Metadata.isValidValue(value, InfinniUI.Metadata.TextHorizontalAlignment)) {
            this.control.set('textHorizontalAlignment', value);
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

    getTextStyle: function () {
        return this.control.get('textStyle');
    },

    setTextStyle: function (textStyle) {
        if (typeof textStyle == 'string') {
            this.control.set('textStyle', textStyle);
        }
    },

    getBackground: function () {
        return this.control.get('background');
    },

    setBackground: function (background) {
        if (typeof background == 'string') {
            this.control.set('background', background);
        }
    },

    getForeground: function () {
        return this.control.get('foreground');
    },

    setForeground: function (foreground) {
        if (typeof foreground == 'string') {
            this.control.set('foreground', foreground);
        }
    },

    getTexture: function () {
        return this.control.get('texture');
    },

    setTexture: function (texture) {
        if (typeof texture == 'string') {
            this.control.set('texture', texture);
        }
    },

    getChildElements: function () {
        return this.childElements;
    },

    onLoaded: function (handler) {
        this.control.onLoaded(handler);
    },

    isLoaded: function () {
        this.control.isLoaded();
    },

    getFocusable: function () {
        return this.control.get('focusable')
    },

    setFocusable: function (value) {
        this.control.get('focusable', !!value)
    },

    getFocused: function () {
        return this.control.get('focused');
    },

    setFocused: function (value) {
        return this.control.set('focused', !!value);
    },

    onLostFocus: function (handler) {
        this.control.on('OnLostFocus', handler);
    },

    onGotFocus: function (handler) {
        this.control.on('OnGotFocus', handler);
    },

    setToolTip: function (value) {
        this.control.set('toolTip', value);
    },

    getToolTip: function () {
        return this.control.get('toolTip');
    },

    getIsLoaded: function () {
        return this.control.get('isLoaded');
    },

    setIsLoaded: function () {
        this.control.set('isLoaded', true);
    },

    setTag: function (value) {
        this.control.set('tag', value);
    },

    getTag: function () {
        return this.control.get('tag');
    },

    render: function () {
        return this.control.render();
    },

    getWidth: function () {
    },

    getHeight: function () {
    },

    getScriptsStorage: function () {
        return this.getView();
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

    onBeforeClick: function (handler) {
        return this.control.onBeforeClick(handler);
    },

    onKeyDown: function (handler) {
        var that = this,
            callback = function (nativeEventData) {
                var eventData = that._getHandlingKeyEventData(nativeEventData);
                handler(eventData);
            };
        return this.control.onKeyDown(callback);
    },

    onKeyUp: function (handler) {
        var that = this,
            callback = function (nativeEventData) {
                var eventData = that._getHandlingKeyEventData(nativeEventData);
                handler(eventData);
            };
        return this.control.onKeyUp(callback);
    },

    onClick: function (handler) {
        var that = this,
            callback = function (nativeEventData) {
                var eventData = that._getHandlingMouseEventData(nativeEventData);
                handler(eventData);
            };
        return this.control.onClick(callback);
    },

    onDoubleClick: function (handler) {
        var that = this,
            callback = function (nativeEventData) {
                var eventData = that._getHandlingMouseEventData(nativeEventData);
                handler(eventData);
            };
        return this.control.onDoubleClick(callback);
    },

    onMouseDown: function (handler) {
        var that = this,
            callback = function (nativeEventData) {
                var eventData = that._getHandlingMouseEventData(nativeEventData);
                handler(eventData);
            };
        return this.control.onMouseDown(callback);
    },

    onMouseUp: function (handler) {
        var that = this,
            callback = function (nativeEventData) {
                var eventData = that._getHandlingMouseEventData(nativeEventData);
                handler(eventData);
            };
        return this.control.onMouseUp(callback);
    },

    onMouseEnter: function (handler) {
        var that = this,
            callback = function (nativeEventData) {
                var eventData = that._getHandlingMouseEventData(nativeEventData);
                handler(eventData);
            };
        return this.control.onMouseEnter(callback);
    },

    onMouseLeave: function (handler) {
        var that = this,
            callback = function (nativeEventData) {
                var eventData = that._getHandlingMouseEventData(nativeEventData);
                handler(eventData);
            };
        return this.control.onMouseLeave(callback);
    },

    onMouseMove: function (handler) {
        var that = this,
            callback = function (nativeEventData) {
                var eventData = that._getHandlingMouseEventData(nativeEventData);
                handler(eventData);
            };
        return this.control.onMouseMove(callback);
    },

    onShowToolTip: function (handler) {
        var control = this.control;

        control.on('change:showToolTip', function () {
            var showToolTip = control.get('showToolTip');
            if (showToolTip && typeof handler === 'function') {
                handler();
            }
        });
    },

    onHideToolTip: function (handler) {
        var control = this.control;

        control.on('change:showToolTip', function () {
            var showToolTip = control.get('showToolTip');
            if (!showToolTip && typeof handler === 'function') {
                handler();
            }
        });
    },

    remove: function (isInitiatedByParent) {
        var children = this.childElements;

        for (var i = 0, ii = children.length; i < ii; i++) {
            children[i].remove(true);
        }

        this.control.remove();

        if (this.parent && this.parent.removeChild && !isInitiatedByParent) {
            this.parent.removeChild(this);
        }

        this.childElements = undefined;
    },

    removeChild: function (child) {
        var index = this.childElements.indexOf(child);
        if (index != -1) {
            this.childElements.splice(index, 1);
        }
    },

    addChild: function (child) {
        this.childElements.push(child);
    },

    _getHandlingKeyEventData: function (nativeData) {
        var result = {};

        result = {
            source: this,
            key: nativeData.which,
            altKey: nativeData.altKey,
            ctrlKey: nativeData.ctrlKey,
            shiftKey: nativeData.shiftKey,
            nativeEventData: nativeData
        };
        return result;
    },

    _getHandlingMouseEventData: function (nativeData) {
        var result = {};

        result = {
            source: this,
            button: nativeData.which,
            altKey: nativeData.altKey,
            ctrlKey: nativeData.ctrlKey,
            shiftKey: nativeData.shiftKey,
            nativeEventData: nativeData
        };
        return result;
    },

    _upperFirstSymbol: function (s) {
        return s[0].toUpperCase() + s.substr(1);
    }
});