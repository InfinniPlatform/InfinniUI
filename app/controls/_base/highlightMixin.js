var highlightMixin = {

    attributeName: '_highlight',

    highlightClassName: 'active',

    control: {

        setHighlight: function( highlight ) {
            this.controlModel.set( highlightMixin.attributeName, highlight );
        },

        getHighlight: function() {
            return this.controlModel.get( highlightMixin.attributeName );
        }

    },

    controlView: {

        initHighlightMixin: function() {
            this.listenTo( this.model, 'change:' + highlightMixin.attributeName, function() {
                var model = this.model;
                this.$el.toggleClass( highlightMixin.highlightClassName, model.get( highlightMixin.attributeName ) );
                this.$el.parent().toggleClass( highlightMixin.highlightClassName, model.get( highlightMixin.attributeName ) );
            } );
        }

    }
};

