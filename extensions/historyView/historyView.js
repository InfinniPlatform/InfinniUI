function HistoryView(){

    var viewContext = null;
    var rootNode = $('<div style="overflow:scroll; height:500px;">');

    this.render = function(target, parameters, context){

        var mainDiv = target.append(rootNode);
		rootNode.append('<br>');
		
		if (context.ParentView && context.ParentView.parent)
		{
			var parentContext = context.ParentView.parent.getContext();
			if (parentContext)
			{
				var data = parentContext.DataSources.VarDataSource.getSelectedItem();
				if (data && data.HistoryData)
				{
					$.each(data.HistoryData, function( key, value ) 
					{
						var elementNode = $('<p style="margin-top: 10px;">');					
						elementNode.append('<span style="background-color: #e7e7e7;padding: 7px;font-size: 14px;"><u>Дата: '+value["Date"]+'</u></span>');
						if (value.Items)
						{	
							var ulDiv = $('<ul style="margin-top: 10px;">');

							$.each( value.Items, function( key, historyItems ) 
							{ 
								var liDiv = $('<li>');
								
								if ($.isArray(historyItems))
								{
									$.each( historyItems, function( key, item ) 
									{
										addItemToHistory(item, liDiv)
									});							
								}
								else
									addItemToHistory(historyItems, liDiv)

								ulDiv.append(liDiv);
							});
							
							elementNode.append(ulDiv);
						}		
						
						elementNode.append('<hr width="100%" />');
						rootNode.prepend(elementNode);
					});

					rootNode.find("p:first").css('background-color', '#fffddf');
				}
			}
		}
    }
}

function addItemToHistory(item, liDiv)
{
	if (item == null)
		return;
		
	liDiv.append('<span>'+item["Name"]+':<b> '+item["Value"]+', </b></span>');
}