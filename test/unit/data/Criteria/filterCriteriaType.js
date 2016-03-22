describe('FilterCriteriaType', function () {

    it('Empty filter', function () {
        var filterCriteriaType = new FilterCriteriaType();

        var item = {
            Id: 11,
            DisplayName: "*11*"
        };

        var filter = [];

        var callback = filterCriteriaType.getFilterCallback(filter);

        assert.isTrue(callback(item));
    });

    it('Simple filter', function () {
        var filterCriteriaType = new FilterCriteriaType();

        var item = {
            Id: 11,
            DisplayName: "*11*"
        };

        var filter = [
            {
                criteriaType: filterCriteriaType.CriteriaTypeCode.IsEquals,
                property: "Id",
                value: 11
            }
        ];

        var callback = filterCriteriaType.getFilterCallback(filter);

        assert.isTrue(callback(item));
    });

    it('Complex filter', function () {
        var filterCriteriaType = new FilterCriteriaType();

        var item = {
            Id: 11,
            DisplayName: "*11*"
        };

        var filter = [
            {
                criteriaType: filterCriteriaType.CriteriaTypeCode.IsEquals,
                property: "Id",
                value: 11
            },
            {
                criteriaType: filterCriteriaType.CriteriaTypeCode.IsContains,
                property: "DisplayName",
                value: "*"
            }
        ];

        var callback = filterCriteriaType.getFilterCallback(filter);

        assert.isTrue(callback(item));
    });

    it('Complex filter: no matches', function () {
        var filterCriteriaType = new FilterCriteriaType();

        var item = {
            Id: 11,
            DisplayName: "*11*"
        };

        var filter = [
            {
                CriteriaType: filterCriteriaType.CriteriaTypeCode.IsEquals,
                Property: "Id",
                Value: 11
            },
            {
                CriteriaType: filterCriteriaType.CriteriaTypeCode.IsContains,
                Property: "DisplayName",
                Value: "**"
            }
        ];

        var callback = filterCriteriaType.getFilterCallback(filter);

        assert.isFalse(callback(item));
    });

});