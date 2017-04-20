var testHelper = {
    applyViewMetadata: function( metadata, onViewReady ) {
        metadata = {
            View: metadata
        };

        var appBuilder = new InfinniUI.ApplicationBuilder();
        var linkView = ( new InfinniUI.InlineViewBuilder() ).build( null, { builder: appBuilder, metadata: metadata, parentView: fakeApplicationView() } );

        linkView.createView( function( view ) {
            view.open();
            onViewReady( view, view.control.controlView.$el );
        } );
    },

    checkMethod: function( element, name ) {
        if ( name.indexOf( '!' ) === 0 ) {
            var methodName = name.substring( 1 );
            assert.isUndefined( element[ methodName ], methodName );
        } else {
            assert.isFunction( element[ name ], name );
        }
    },

    checkTextEditorBaseMethods: function( element ) {
        ['getLabelText', 'setLabelText', 'getLabelFloating', 'setLabelFloating', 'getDisplayFormat',
            'setDisplayFormat', 'getEditMask', 'setEditMask']
            .forEach( function( methodName ) {
                it( methodName, function() {
                    testHelper.checkMethod( element, methodName );
                } );
            } );
    },

    checkEditorBaseMethods: function( element ) {
        ['getValue', 'setValue', 'getHintText', 'setHintText', 'getErrorText', 'setErrorText', 'getWarningText',
            'setWarningText']
            .forEach( function( methodName ) {
                it( methodName, function() {
                    testHelper.checkMethod( element, methodName );
                } );
            } );
    },

    checkElementMethods: function( element ) {
        ['getView', 'getParent', 'setParent', 'getName', 'setName', 'getText', 'setText',
            'getFocusable', 'setFocusable', 'getFocused', 'setFocused', 'getEnabled', 'setEnabled', 'getVisible',
            'setVisible', 'getHorizontalAlignment', 'setHorizontalAlignment', 'getTextHorizontalAlignment',
            'setTextHorizontalAlignment', '!getTextVerticalAlignment', '!setTextVerticalAlignment', 'getTextStyle',
            'setTextStyle', 'getForeground', 'setForeground', 'getBackground', 'setBackground', 'getChildElements',
            'getProperty', 'setProperty']
            .forEach( function( methodName ) {
                it( methodName, function() {
                    testHelper.checkMethod( element, methodName );
                } );

            } );
    },

    checkContainerMethods: function( element ) {
        ['getItemTemplate', 'setItemTemplate', 'getItems']
            .forEach( function( methodName ) {
                it( methodName, function() {
                    testHelper.checkMethod( element, methodName );
                } );

            } );
    }
};
