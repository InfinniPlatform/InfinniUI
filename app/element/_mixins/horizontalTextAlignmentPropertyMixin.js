var horizontalTextAlignmentPropertyMixin = {

    getHorizontalTextAlignment: function(){
        return this.control.get('format');
    },

    setHorizontalTextAlignment: function(horizontalTextAlignment){
        if(typeof horizontalTextAlignment == 'string'){
            return this.control.set('horizontalTextAlignment', horizontalTextAlignment);
        }
    }

};