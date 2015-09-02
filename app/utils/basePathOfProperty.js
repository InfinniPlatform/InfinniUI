function BasePathOfProperty(basePathOfProperty, baseIndex, parentBasePath ) {
    if(!parentBasePath){
        this.basePathOfProperty = basePathOfProperty;
        this.indexesInParentLists = [baseIndex];
    }else{
        this.basePathOfProperty = parentBasePath.basePathOfProperty + '.' + basePathOfProperty;

        this.indexesInParentLists = parentBasePath.indexesInParentLists.slice();
        this.indexesInParentLists.push(baseIndex);

        this.parentBasePath = parentBasePath;
    }

}

_.extend(BasePathProperty.prototype, {
    /*���������� ������ ���� � �������� �������� � ���������*/
    resolveProperty: function(property) {
        return stringUtils.formatProperty(property, this.indexesInParentLists)
    },

    /*���������� ������ ���� � �������� �������� � ��������� �� ��������� �������������� ����*/
    resolveRelativeProperty: function(relativeProperty) {
        var property;
        if(this.basePathOfProperty != ''){
            property = this.basePathOfProperty + '.' + relativeProperty;
        }else{
            property = relativeProperty;
        }
        return this.resolveProperty(property);
    }
});