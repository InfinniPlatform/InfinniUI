function Testt( context, args ) {
    this.context = args.context;
    this.$el = args.$el;
    this.parameters = args.parameters;
    this.itemTemplate = args.itemTemplate;
}

_.extend( Testt.prototype, {

    render: function() {
        this.$el
            .append( this.itemTemplate( this.context, { index: 0 } ).render() );
    }

} );
