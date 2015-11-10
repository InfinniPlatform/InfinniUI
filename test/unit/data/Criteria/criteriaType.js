describe('criteriaType', function () {
    it('IsEqual', function () {
        var target = {
            DisplayName: "Lorem Ipsum"
        };
        assert.isTrue(CriteriaType.IsEquals(target, 'DisplayName', "Lorem Ipsum"));
        assert.isFalse(CriteriaType.IsEquals(target, 'DisplayName', 1));
    });

    it('IsNotEquals', function () {
        var target = {
            DisplayName: "Lorem Ipsum"
        };
        assert.isFalse(CriteriaType.IsNotEquals(target, 'DisplayName', "Lorem Ipsum"));
        assert.isTrue(CriteriaType.IsNotEquals(target, 'DisplayName', 1));
    });

    it('IsMoreThan', function () {
        var target = {
            weight: 66
        };
        assert.isTrue(CriteriaType.IsMoreThan(target, 'weight', 65));
        assert.isFalse(CriteriaType.IsMoreThan(target, 'weight', 66));
        assert.isFalse(CriteriaType.IsMoreThan(target, 'weight', 67));
    });

    it('IsLessThan', function () {
        var target = {
            weight: 66
        };
        assert.isTrue(CriteriaType.IsLessThan(target, 'weight', 67));
        assert.isFalse(CriteriaType.IsLessThan(target, 'weight', 66));
        assert.isFalse(CriteriaType.IsLessThan(target, 'weight', 65));
    });

    it('IsMoreThanOrEquals', function () {
        var target = {
            weight: 66
        };
        assert.isTrue(CriteriaType.IsMoreThanOrEquals(target, 'weight', 65));
        assert.isTrue(CriteriaType.IsMoreThanOrEquals(target, 'weight', 66));
        assert.isFalse(CriteriaType.IsMoreThanOrEquals(target, 'weight', 67));
    });

    it('IsLessThanOrEquals', function () {
        var target = {
            weight: 66
        };
        assert.isTrue(CriteriaType.IsLessThanOrEquals(target, 'weight', 67));
        assert.isTrue(CriteriaType.IsLessThanOrEquals(target, 'weight', 66));
        assert.isFalse(CriteriaType.IsLessThanOrEquals(target, 'weight', 65));
    });

    it('IsContains', function () {
        var target = {
            DisplayName: "Lorem Ipsum"
        };
        assert.isTrue(CriteriaType.IsContains(target, 'DisplayName', "Lor"));
        assert.isTrue(CriteriaType.IsContains(target, 'DisplayName', "em"));
        assert.isTrue(CriteriaType.IsContains(target, 'DisplayName', "sum"));
        assert.isTrue(CriteriaType.IsContains(target, 'DisplayName', "Lorem Ipsum"));
        assert.isFalse(CriteriaType.IsContains(target, 'DisplayName', "ololo"));
    });

    it('IsNotContains', function () {
        var target = {
            DisplayName: "Lorem Ipsum"
        };
        assert.isFalse(CriteriaType.IsNotContains(target, 'DisplayName', "Lor"));
        assert.isFalse(CriteriaType.IsNotContains(target, 'DisplayName', "em"));
        assert.isFalse(CriteriaType.IsNotContains(target, 'DisplayName', "sum"));
        assert.isFalse(CriteriaType.IsNotContains(target, 'DisplayName', "Lorem Ipsum"));
        assert.isTrue(CriteriaType.IsNotContains(target, 'DisplayName', "ololo"));
    });

    it('IsEmpty', function () {
        var target = {
            DisplayName: "Lorem Ipsum",
            Description: "",
            Data: {},
            Items: []
        };
        assert.isTrue(CriteriaType.IsEmpty(target, 'Id'));
        assert.isTrue(CriteriaType.IsEmpty(target, 'Description'));
        assert.isTrue(CriteriaType.IsEmpty(target, 'Data'));
        assert.isTrue(CriteriaType.IsEmpty(target, 'Items'));
        assert.isFalse(CriteriaType.IsEmpty(target, 'DisplayName'));
    });


    it('IsNotEmpty', function () {
        var target = {
            DisplayName: "Lorem Ipsum",
            Description: "",
            Data: {},
            Items: []
        };
        assert.isFalse(CriteriaType.IsNotEmpty(target, 'Id'));
        assert.isFalse(CriteriaType.IsNotEmpty(target, 'Description'));
        assert.isFalse(CriteriaType.IsNotEmpty(target, 'Data'));
        assert.isFalse(CriteriaType.IsNotEmpty(target, 'Items'));
        assert.isTrue(CriteriaType.IsNotEmpty(target, 'DisplayName'));
    });


    it('IsStartsWith', function () {
        var target = {
            DisplayName: "Lorem Ipsum"
        };
        assert.isTrue(CriteriaType.IsStartsWith(target, 'DisplayName', "Lor"));
        assert.isFalse(CriteriaType.IsStartsWith(target, 'DisplayName', "em"));
        assert.isTrue(CriteriaType.IsStartsWith(target, 'DisplayName', "Lorem Ipsum"));
        assert.isFalse(CriteriaType.IsStartsWith(target, 'DisplayName', "ololo"));
    });


    it('IsNotStartsWith', function () {
        var target = {
            DisplayName: "Lorem Ipsum"
        };
        assert.isFalse(CriteriaType.IsNotStartsWith(target, 'DisplayName', "Lor"));
        assert.isTrue(CriteriaType.IsNotStartsWith(target, 'DisplayName', "em"));
        assert.isFalse(CriteriaType.IsNotStartsWith(target, 'DisplayName', "Lorem Ipsum"));
        assert.isTrue(CriteriaType.IsNotStartsWith(target, 'DisplayName', "ololo"));
    });


    it('IsEndsWith', function () {
        var target = {
            DisplayName: "Lorem Ipsum"
        };
        assert.isFalse(CriteriaType.IsEndsWith(target, 'DisplayName', "Lor"));
        assert.isFalse(CriteriaType.IsEndsWith(target, 'DisplayName', "em"));
        assert.isTrue(CriteriaType.IsEndsWith(target, 'DisplayName', "Lorem Ipsum"));
        assert.isTrue(CriteriaType.IsEndsWith(target, 'DisplayName', "sum"));
        assert.isFalse(CriteriaType.IsEndsWith(target, 'DisplayName', "ololo"));
    });


    it('IsNotEndsWith', function () {
        var target = {
            DisplayName: "Lorem Ipsum"
        };
        assert.isTrue(CriteriaType.IsNotEndsWith(target, 'DisplayName', "Lor"));
        assert.isTrue(CriteriaType.IsNotEndsWith(target, 'DisplayName', "em"));
        assert.isFalse(CriteriaType.IsNotEndsWith(target, 'DisplayName', "Lorem Ipsum"));
        assert.isFalse(CriteriaType.IsNotEndsWith(target, 'DisplayName', "sum"));
        assert.isTrue(CriteriaType.IsNotEndsWith(target, 'DisplayName', "ololo"));
    });


    it('IsIn', function () {
        var target = {
            DisplayName: "Lorem Ipsum",
            Weight: 33
        };
        assert.isTrue(CriteriaType.IsIn(target, 'DisplayName', ["Lorem Ipsum"]), 'Text');
        assert.isFalse(CriteriaType.IsIn(target, 'DisplayName', [""]), 'Empty text');
        assert.isTrue(CriteriaType.IsIn(target, 'Weight', [31, 32, 33]), 'Number');
        assert.isFalse(CriteriaType.IsIn(target, 'Weight', [31, 32, "none"]), 'Number');
    });


    it('isNotIn', function () {
        var target = {
            DisplayName: "Lorem Ipsum",
            Weight: 33
        };
        assert.isFalse(CriteriaType.isNotIn(target, 'DisplayName', ["Lorem Ipsum"]), 'Text');
        assert.isTrue(CriteriaType.isNotIn(target, 'DisplayName', [""]), 'Empty text');
        assert.isFalse(CriteriaType.isNotIn(target, 'Weight', [31, 32, 33]), 'Number');
        assert.isTrue(CriteriaType.isNotIn(target, 'Weight', [31, 32, "none"]), 'Number');
    });


});
