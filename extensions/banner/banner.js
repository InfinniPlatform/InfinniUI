function Banner() {

    var template = '' +
        '<div class="row" style="margin-left: 0">' +
        '<div class="note note-success col-md-8" style="height: 120px">' +
        '   <div class="col-md-6">' +
        '       <h1 class="block">{{lastName}} {{firstName}} {{middleName}}</h1>' +
        '       <p>Место работы: [ООО "Инфиннити"]</p>' +
        '   </div>' +
        '   <div class="col-md-6">' +
        '       <p>СНИЛС: {{snils}}</p>' +
        '       <p>ОМС: [740045600456554008]</p>' +
        '   </div>' +
        '</div>' +
        '<div class="note note-success col-md-4" style="height: 120px">' +
        '   <p style="vertical-align: top"><i style="font-size: 23px" class="fa fa-ambulance"></i> Привезли на скорой</p>' +
        '   <p style="vertical-align: top"><i style="font-size: 23px" class="fa fa-wheelchair"></i> Инвалид I группы</p>' +
        '   <p style="vertical-align: top"><i style="font-size: 23px" class="fa fa-stethoscope"></i> Сильно кашляет</p>' +
        '</div>' +
        '</div>';

    var ractive = null;

    var updatePanel = function (patient) {
        if (patient) {
            ractive.set({
                lastName: patient.Personal.LastName,
                firstName: patient.Personal.FirstName,
                middleName: patient.Personal.MiddleName,
                snils: patient.Snils
            });
        }
    };

    this.render = function (target, parameters, context) {
        ractive = new Ractive({
            el: target,
            template: template,
            data: {
                lastName: "",
                firstName: "",
                middleName: ""
            }
        });

        var ds = parameters['Patient'];
        if (ds) {
            ds.onValueChanged(updatePanel);
        }
        else {
            if(context.Parameters['Patient']) {
                updatePanel(context.Parameters['Patient'].getValue());
            }
        }
    }
}