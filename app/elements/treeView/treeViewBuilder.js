function TreeViewBuilder() {
    _.superClass( TreeViewBuilder, this );
}

window.InfinniUI.TreeViewBuilder = TreeViewBuilder;

_.inherit( TreeViewBuilder, ListEditorBaseBuilder );

_.extend( TreeViewBuilder.prototype, /** @lends TreeViewBuilder.prototype */{

    createElement: function( params ) {
        return new TreeView( params.parent );
    },

    applyMetadata: function( params ) {
        var element = params.element;
        var metadata = params.metadata;
        var data = ListEditorBaseBuilder.prototype.applyMetadata.call( this, params );

        this._initKeySelector( params );
        this._initParentSelector( params );

        if( metadata.OnExpand ) {
            var onExpandExecutor = function( item ) {
                new ScriptExecutor( element.getScriptsStorage() ).executeScript( metadata.OnExpand, { item: item } );
            };
            element.setOnExpand( onExpandExecutor );
        }

        if( metadata.OnCollapse ) {
            var onCollapseExecutor = function( item ) {
                new ScriptExecutor( element.getScriptsStorage() ).executeScript( metadata.OnCollapse, { item: item } );
            };
            element.setOnCollapse( onCollapseExecutor );
        }
    },

    _initKeySelector: function( params ) {
        var element = params.element;
        var metadata = params.metadata;
        var keySelector;

        if ( metadata.KeySelector ) {
            keySelector = function( context, args ) {
                var scriptExecutor = new ScriptExecutor( element.getScriptsStorage() );
                return scriptExecutor.executeScript( metadata.KeySelector, args );
            };
        } else if ( metadata.KeyProperty ) {
            keySelector = function( context, args ) {
                return InfinniUI.ObjectUtils.getPropertyValue( args.value, metadata.KeyProperty );
            };
        } else {
            keySelector = function( context, args ) {
                return args.value;
            };
        }
        element.setKeySelector( keySelector );
    },

    _initParentSelector: function( params ) {
        var element = params.element;
        var metadata = params.metadata;
        var parentSelector;

        if ( metadata.ParentSelector ) {
            parentSelector = function( context, args ) {
                var scriptExecutor = new ScriptExecutor( element.getScriptsStorage() );
                return scriptExecutor.executeScript( metadata.ParentSelector, args );
            };
        } else if ( metadata.ParentProperty ) {
            parentSelector = function( context, args ) {
                return InfinniUI.ObjectUtils.getPropertyValue( args.value, metadata.ParentProperty );
            };
        } else {
            parentSelector = function( context, args ) {
                return args.value;
            };
        }
        element.setParentSelector( parentSelector );
    }
} );
