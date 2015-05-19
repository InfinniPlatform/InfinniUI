var builderEditMaskPropertyMixin = {

    initEditMaskProperty: function(params){
        var metadata = params.metadata;
        var builder = params.builder;
        var data = metadata.EditMask;

        if(typeof data !== 'undefined' && data !== null && data !== '' ) {
            var editMask = builder.build(params.parent, data);
            params.element.setEditMask(editMask);
        }
    }

};