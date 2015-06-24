/**
 * Created by Павел on 19.06.2015.
 */
setTimeout(function(){
    var childView = window.contextApp.getChildView('ListViewForConsult');
    var mainDataSource = childView.context.DataSources.MainDataSource;
    var ctrls = childView.context.Controls;
    var items, editView, comboboxItems, lpuItems;

    mainDataSource.getItems(function(callback){
        setTimeout(function(){
            items = callback;

            for(var i = 0; i < items.length; i++){
                if(!items[i].RedirectedTo){
                    mainDataSource.setSelectedItem(items[i]);
                    ctrls.AppointmentToolBarButton.control.click();
                    childV();
                    return;
                }
            }

            function childV(){
                setTimeout(function(){
                    editView = childView.getChildView('EditView');
                    editView.context.Controls.AppointmentDateDatePicker.setValue('2015-12-06T00:00:00.0000+05:00');

                    editView.context.DataSources.RegionalMkbDataSource.getItems(function(callback){
                        setTimeout(function() {
                            comboboxItems = callback;
                            editView.context.DataSources.RegionalMkbDataSource.setSelectedItem(comboboxItems[0]);
                            editView.context.Controls.DiseaseComboBox.setValue(comboboxItems[0]);

                        },1000);
                    });

                    editView.context.DataSources.MedicalOrganizationDataSource.getItems(function(callback){
                        setTimeout(function() {
                            lpuItems = callback;
                            editView.context.Controls.AppointmentLpuBox.setValue(lpuItems[0]);
                            editView.context.Controls.null.control.getItems()[1].control.get('items')[0].control.click();
                        },1500);
                    });
                },1000)
            }

        }, 1000);
    });
}, 3000);