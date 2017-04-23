var dateTimePickerStrategy = ( function() {

    return {
        Date: dateTimePickerModeDate,
        DateTime: dateTimePickerModeDateTime,
        Time: dateTimePickerModeTime
    };

} )();

InfinniUI.dateTimePickerStrategy = dateTimePickerStrategy;
