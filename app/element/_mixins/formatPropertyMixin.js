var formatPropertyMixin = {

    /**
     * Возвращает формат отображения данных.
     * @returns {BooleanFormat|DateTimeFormat|NumberFormat|ObjectFormat}
     */
    getDisplayFormat: function(){
        return this.control.get('format');
    },

    /**
     * Устанавливает формат отображения данных.
     * @param {BooleanFormat|DateTimeFormat|NumberFormat|ObjectFormat} format
     * @returns {*}
     */
    setDisplayFormat: function(format){
        return this.control.set('format', format);
    }

};