/**
 *
 * @param parent
 * @augments Element
 * @mixes editorBaseMixin
 * @constructor
 */
function ImageBox(parent) {
    _.superClass(ImageBox, this, parent);

    this.initialize_editorBase();
}

_.inherit(ImageBox, Element);

_.extend(ImageBox.prototype, {
    getFile: function () {
        return this.control.get('file');
    },

    createControl: function () {
        return new ImageBoxControl();
    },

    /**
     * @description Возвращает максимальный размер данных в байтах
     * @returns {number}
     */
    getMaxSize: function () {
        return this.control.get('maxSize');
    },

    /**
     * @description Устанавливает максимальный размер данных в байтах
     * @param {number} value
     */
    setMaxSize: function (value) {
        this.control.set('maxSize', value);
    },

    /**
     * @description Возвращает коллекцию допустимых форматов данных
     * @returns {Collection}
     */
    getAcceptTypes: function () {
        return this.control.get('acceptTypes');
    },


    /**
     *  Методы, не описанные в документации
     */
    setReadOnly: function (value) {
        this.control.set('readOnly', value);
    },

    getReadOnly: function () {
        return this.control.get('readOnly');
    },

    /**
     * @description Недокументированный!
     * @param {Array} types
     */
    setAcceptTypes: function (types) {
        var collection = this.getAcceptTypes();
        if (Array.isArray(types)) {
            collection.set(types)
        }
    }

    //setUrl: function (value) {
    //    this.control.set('url', value);
    //},
    //
    //getUrl: function () {
    //    return this.control.get('url');
    //}

}, editorBaseMixin);