function ImageBox(parentView) {
    _.superClass(ImageBox, this, parentView);
}

_.inherit(ImageBox, Element);

_.extend(ImageBox.prototype, {

        createControl: function () {
            return new ImageBoxControl();
        },

        setReadOnly: function(readOnly){
            this.control.set('readOnly', readOnly);
        },

        getReadOnly: function(){
            return this.control.get('readOnly');
        },

        setAcceptTypes: function(acceptTypes){
            this.control.set('acceptTypes', acceptTypes);
        },

        getAcceptTypes: function(){
            return this.control.get('acceptTypes');
        },

        setMaxSize: function(maxSize){
            this.control.set('maxSize', maxSize);
        },

        getMaxSize: function(){
            return this.control.get('maxSize');
        },

        getFile: function () {
            return this.control.get('file');
        },

        setUrl: function (value) {
            this.control.set('url', value);
        }
        //TODO: добавить API элемента
    },
    valuePropertyMixin
);