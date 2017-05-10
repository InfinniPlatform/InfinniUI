function TestExtension( context, args ) {
    this.context = args.context;

    this.$el = args.$el;
    this.parameters = args.parameters;
    this.itemTemplate = args.itemTemplate;
}

_.extend( TestExtension.prototype, {
    render: function() {
        this.$el.addClass( 'test-extension' );

        if( this.parameters && this.parameters[ 'color' ] ) {
            this.$el.addClass( 'pl-' + this.parameters[ 'color' ].getValue() + '-fg' );
        }

        if( this.itemTemplate ) {
            this.$el
                .append( this.itemTemplate( this.context, { index: 0 } ).render() );
        }

        this.$el
            .append( '<div>TestExtension</div> ' );

    }
} );