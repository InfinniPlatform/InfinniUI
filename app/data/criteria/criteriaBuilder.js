var CriteriaBuilder = function () {

};

CriteriaBuilder.prototype.build = function(context, args){

    var criteria = new Criteria();
    var items = [];

    var metadata = args.metadata;

    if (typeof metadata !== 'undefined' && metadata !== null && metadata.length) {
        for (var i = 0, ln = metadata.length; i < ln; i = i + 1) {
            items.push(this.buildCriteriaItem(args.builder, args.parent, metadata[i], criteria));
        }
    }

    criteria.setItems(items);

    return criteria;
};

CriteriaBuilder.prototype.buildCriteriaItem = function(builder, parent, metadata, criteria){

    var item = {
        Property: metadata.Property,
        CriteriaType: criteria.decodeCriteriaType(metadata.CriteriaType)
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

