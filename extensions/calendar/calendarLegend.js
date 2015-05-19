function CalendarLegend(){

    var OperationMode = "Operations";
    var ClassicMode = "Classic";
    var QueueMode = "Queue";

    var queueLegend = '<div class="calendar">'
        +'<table class="legend" border="1"><tbody>'
        +'<tr><td class="free">Свободно</td>'
        +'<td class="busy">Утвержденная операция</td>'
        +'<td class="busy non-approved">Неутвержденная операция</td>'
        +'</tr></tbody></table>'
        +'</div>';

    var operationLegend = '<div class="calendar">'
        +'<table class="legend" border="1"><tbody>'
        +'<tr><td class="slot-free">Свободно</td>'
        +'<td class="busy">Утвержденная операция</td>'
        +'<td class="busy non-approved">Неутвержденная операция</td>'
        +'</tr></tbody></table>'
        +'</div>';

    this.render = function(target, parameters, context){

        var  mode = parameters['Mode'].getValue();

        if(mode == QueueMode)
            target.append(queueLegend);
        else if(mode == OperationMode)
            target.append(operationLegend);
    }
}