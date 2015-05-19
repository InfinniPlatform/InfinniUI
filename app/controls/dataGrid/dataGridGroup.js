var DataGridGroup = Backbone.Model.extend({
    defaults: {
        groupBy: []
    },

    group: function(items){
        if(this.get('groupBy').length > 0){
            return {
                items: items,
                groups: this.subGroup(items, 0)
            };
        }else{
            return {
                items: items
            };
        }
    },

    /*
     *
     * {
     *   items: [...],
     *   groups: {
     *       Москва:{
     *           items: [...],
     *           groups: {...}
     *       }
     *   }
     * }
     * */

    subGroup: function(items, deep){
        var groupedProperty = this.get('groupBy')[deep],
            grouped = this.groupItems(items, groupedProperty);

        if(deep < this.get('groupBy').length - 1){
            for(var k in grouped){
                grouped[k].groups = this.subGroup(grouped[k].items, deep + 1);
            }
        }

        return grouped;
    },

    groupItems: function(items, propertyName){
        var result = {},
            propertyVal;
        for(var i = 0, ii = items.length; i < ii; i++){
            propertyVal = InfinniUI.ObjectUtils.getPropertyValue(items[i], propertyName);
            if(typeof result[propertyVal] == "undefined"){
                result[propertyVal] = {
                    items: []
                };
            }
            result[propertyVal].items.push(items[i]);
        }

        return result;
    }
});