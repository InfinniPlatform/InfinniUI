var builderEditMaskPropertyMixin = {

    initEditMaskProperty: function(params){
        var metadata = params.metadata;
        var builder = params.builder;
        var data = metadata.EditMask;

        //data = {NumberEditMask: {Mask: "n3"}}}

        if(typeof data !== 'undefined' && data !== null && data !== '' ) {
            var editMask = builder.build(params.view, data);
            params.element.setEditMask(editMask);
        }
    }

};