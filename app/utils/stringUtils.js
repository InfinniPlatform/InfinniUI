var stringUtils = {
    format: function(value,args){
        return value.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    },

    formatBinding: function(value,index){
        return value.replace('$', index);
    },

    formatProperty: function(property, indexes){
        if(!indexes || indexes.length == 0){
            return property;
        }

        var i = 0;
        return property.replace(/\$/g, function(){
            i++;
            return indexes[i-1];
        });
    },

    padLeft: function a (value, len, char) {
        if (typeof char == 'undefined' || char === null) {
            char = ' ';
        }

        var str = String(value);

        if (str.length < len) {
            return new Array(len - str.length + 1).join(char) + str;
        }
        return str;
    }
};

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}