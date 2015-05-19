var editMaskPropertyMixin = {

    /**
     * Устанавливает маску ввода данных.
     * @param editMask
     */
    setEditMask: function(editMask){
        this.control.set('editMask', editMask);
    }

};