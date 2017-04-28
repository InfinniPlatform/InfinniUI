/**
 *
 * @mixin
 */
var highlightMixin = {

    attributeName: '_highlight',

    highlightClassName: 'active',

    control: {

        /**
         *
         * @param highlight
         */
        setHighlight: function( highlight ) {
            this.controlModel.set( highlightMixin.attributeName, highlight );
        },

        /**
         *
         * @returns {*}
         */
        getHighlight: function() {
            return this.controlModel.get( highlightMixin.attributeName );
        }

    },

    controlView: {

        /**
         *
         */
        initHighlightMixin: function() {
            this.listenTo( this.model, 'change:' + highlightMixin.attributeName, function() {
                var model = this.model;
                this.$el.toggleClass( highlightMixin.highlightClassName, model.get( highlightMixin.attributeName ) );
                this.$el.parent().toggleClass( highlightMixin.highlightClassName, model.get( highlightMixin.attributeName ) );
            } );
        }

    }

};

InfinniUI.highlightMixin = highlightMixin;
