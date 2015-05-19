function timezoneDate(value){
    if(typeof value == 'string') {
        var toDate = new Date(value);
        toDate.setMinutes(toDate.getMinutes() + toDate.getTimezoneOffset());
        return toDate;
    }else if(value instanceof Date){
        value.setMinutes(value.getMinutes() + value.getTimezoneOffset());
        return value;
    }else{
        var date = new Date(value);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        return date;
    }
}