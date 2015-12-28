function BasePathOfProperty(basePathOfProperty, baseIndex, parentBasePath ) {


    if(this.isRelativeProperty(basePathOfProperty)){
        this.basePathOfProperty = parentBasePath.basePathOfProperty + this.excludeFirstChar(basePathOfProperty);
    }else{
        this.basePathOfProperty = basePathOfProperty;
    }

    if(!parentBasePath){
        if(baseIndex !== undefined && baseIndex !== null){
            this.indexesInParentLists = [baseIndex];
            this.basePathOfProperty += baseIndex;
        }

    }else{
        this.indexesInParentLists = parentBasePath.indexesInParentLists ? parentBasePath.indexesInParentLists.slice() : [];
        this.indexesInParentLists.push(baseIndex);

        this.parentBasePath = parentBasePath;
    }

}

_.extend(BasePathOfProperty.prototype, {
    /*возвращает полный путь к свойству элемента в коллекции*/
    resolveProperty: function(property) {
        if(this.isRelativeProperty(property)){
            property = this.excludeFirstChar(property);
            return stringUtils.formatProperty(this.basePathOfProperty + property, this.indexesInParentLists);
        }else{
            return stringUtils.formatProperty(property, this.indexesInParentLists);
        }

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
    },

    isRelativeProperty: function(property){
        return property.substr(0,1) == '@';
    },

    excludeFirstChar: function(str){
        return str.substr(1, str.length - 1);
    }
});