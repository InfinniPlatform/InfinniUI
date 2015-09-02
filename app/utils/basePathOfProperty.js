function BasePathOfProperty(basePathOfProperty, baseIndex, parentBasePath ) {
    if(!parentBasePath){
        this.basePathOfProperty = basePathOfProperty;
        if(baseIndex !== undefined && baseIndex !== null){
            this.indexesInParentLists = [baseIndex];
            this.basePathOfProperty += baseIndex;
        }

    }else{
        this.basePathOfProperty = parentBasePath.basePathOfProperty + '.' + basePathOfProperty;

        this.indexesInParentLists = parentBasePath.indexesInParentLists.slice();
        this.indexesInParentLists.push(baseIndex);

        this.parentBasePath = parentBasePath;
    }

}

_.extend(BasePathOfProperty.prototype, {
    /*возвращает полный путь к свойству элемента в коллекции*/
    resolveProperty: function(property) {
        return stringUtils.formatProperty(property, this.indexesInParentLists)
    },

    /*возвращает полный путь к свойству элемента в коллекции по заданному относительному пути*/
    resolveRelativeProperty: function(relativeProperty) {
        var property;
        if(this.basePathOfProperty != ''){
            property = this.basePathOfProperty + '.' + relativeProperty;
        }else{
            property = relativeProperty;
        }
        return this.resolveProperty(property);
    },

    /*создает BasePathOfProperty следующего уровня*/
    buildChild: function(basePathOfProperty, baseIndex){
        return new BasePathOfProperty(basePathOfProperty, baseIndex, this);
    },

    /*создает BasePathOfProperty следующего уровня с относительным путем*/
    buildRelativeChild: function(basePathOfProperty, baseIndex){
        return new BasePathOfProperty(basePathOfProperty, baseIndex, this);
    }
});