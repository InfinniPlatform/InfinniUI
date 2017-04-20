/**
 * @constructor
 * @augments ContainerModel
 */
var PanelModel = ContainerModel.extend( /** @lends PanelModel.prototype */ {

    initialize: function() {
        ContainerModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
        this.on( 'change:collapsed', function( model, value ) {
            model.trigger( value ? 'collapsed' : 'expanded', null, {} );
        } );
    },

    defaults: _.defaults( {
        collapsible: false,
        collapsed: false,
        collapseChanger: ''
    }, ContainerModel.prototype.defaults ),

    set: function( key, val, options ) {
        if( key === null || typeof key === 'undefined' ) return this;

        var attrs;
        if( typeof key === 'object' ) {
            attrs = key;
            options = val;
        } else {
            ( attrs = {} )[ key ] = val;
        }

        var oldValue, newValue;
        if( 'collapsed' in attrs ) {
            //Вызов обработчиков перед collapsing/expanding
            oldValue = this.get( 'collapsed' );
            newValue = attrs.collapsed;
            var allow;

            if( newValue && !oldValue ) {
                allow = this
                    .set( '_collapsing', true, { validate: false } )
                    .trigger( 'collapsing', null, {} )
                    .get( '_collapsing' );
            } else if( !newValue && oldValue ) {
                allow = this
                    .set( '_expanding', true, { validate: false } )
                    .trigger( 'expanding', null, {} )
                    .get( '_expanding' );
            }
            if( allow === false ) {
                //Если collapsing/expanding отменен в обработчиках collapsing/expanding - не меняем collapsed
                delete attrs.collapsed;
            }
        }
        return ContainerModel.prototype.set.call( this, attrs, options );
    },

    //@TODO Add support an event map syntax
    on: function( name, callback, context ) {
        var handler;
        var model = this;

        switch( name ) {
            case 'collapsing':
                handler = function() {
                    var allow = callback( null, {} );
                    if( allow === false ) {
                        model.set( '_collapsing', false );
                    }
                };
                break;
            case 'expanding':
                handler = function() {
                    var allow = callback( null, {} );
                    if( allow === false ) {
                        model.set( '_expanding', false );
                    }
                };
                break;
            default:
                handler = callback;
                break;
        }
        ContainerModel.prototype.on.call( this, name, handler, context );
    }

} );
