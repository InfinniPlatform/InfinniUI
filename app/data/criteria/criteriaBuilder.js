var CriteriaBuilder = function () {

};

CriteriaBuilder.prototype.build = function(builder, parent, metadata){

    var criteria = new Criteria();


    var items = [];

    if (typeof metadata !== 'undefined' && metadata !== null && metadata.length) {
        for (var i = 0, ln = metadata.length; i < ln; i = i + 1) {
            items.push(this.buildCriteriaItem(builder, parent, metadata[i], criteria));
        }
    }

    criteria.setItems(items);

    return criteria;
};

CriteriaBuilder.prototype.buildCriteriaItem = function(builder, parent, metadata, criteria){

    var item = {
        Property: metadata.Property,
        CriteriaType: metadata.CriteriaType
    };

    var value = metadata.Value;
    var binding;
    item.Value = value;

    if (value !== null && typeof value === 'object') {
        binding = builder.build(parent, value);
        if (typeof binding !== 'undefined' && binding !== null) {
            //Если объект пострен билдером - это Binding
            item.Value = function () {
                return binding.getPropertyValue();
            };
            binding.onPropertyValueChanged(function () {
                //Уведомить условие об изменении значение в биндинге
                criteria.valueChanged();
            });
        }
    }

    return item;
};

