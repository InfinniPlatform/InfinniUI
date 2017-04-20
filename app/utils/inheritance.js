_.mixin( {
    'inherit': function( child, parent ) {
        var f = new Function();
        f.prototype = parent.prototype;

        child.prototype = new f();
        child.prototype.constructor = child;

        child.superclass = parent.prototype;
    },

    'superClass': function( obj, context, values ) {
        var args = _.toArray( arguments );
        args.splice( 0, 2 );

        obj.superclass.constructor.apply( context, args );
    }
} );