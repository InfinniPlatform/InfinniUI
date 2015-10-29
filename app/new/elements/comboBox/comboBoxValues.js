function ComboBoxValues() {
    _.superClass(ComboBoxValues, this);
    this.initialize_editorBase();
}

_.inherit(ComboBoxValues, Element);

_.extend(ComboBoxValues.prototype, {

        createControl: function () {
            return new ComboBoxValuesControl();
        }

    },
    editorBaseMixin
);
