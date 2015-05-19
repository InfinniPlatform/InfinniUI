var formatPropertyMixin = {

    /**
     * Возвращает формат отображения данных.
     * @returns {BooleanFormat|DateTimeFormat|NumberFormat|ObjectFormat}
     */
    getFormat: function(){
        return this.control.get('format');
    },

    /**
     * Устанавливает формат отображения данных.
     * @param {BooleanFormat|DateTimeFormat|NumberFormat|ObjectFormat} format
     * @returns {*}
     */
    setFormat: function(format){
        return this.control.set('format', format);
    }

};