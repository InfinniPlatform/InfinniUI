/**
 *
 * @param parent
 * @augments Element
 * @mixes editorBaseMixin
 * @constructor
 */
function FileBox(parent) {
    _.superClass(FileBox, this, parent);

    this.initialize_editorBase();
}

_.inherit(FileBox, Element);

_.extend(FileBox.prototype, {
    getFile: function () {
        return this.control.get('file');
    },

    createControl: function () {
        return new FileBoxControl();
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
    //
    //setUrl: function (value) {
    //    this.control.set('url', value);
    //},
    //
    //getUrl: function () {
    //    return this.control.get('url');
    //}

}, editorBaseMixin);