function generateTextBoxes() {
    return {
        Text: 'Пациенты',
        DataSources: [
            {
                DocumentDataSource: {
                    ConfigId: 'Demography',
                    DocumentId: 'Patient',
                    CreateAction: 'CreateDocument',
                    GetDocument: 'GetDocument',
                    UpdateAction: 'SetDocument',
                    DeleteAction: 'DeleteDocument',
                    FillCreatedItem: true
                }
            }
        ],
        LayoutPanel: {
            StackPanel: {
                Name: 'MainViewPanel',
                Items: [
                    {
                        TextBox: {
                            Name: 'TextBox1',
                            Multiline: true
                        }
                    },
                    {
                        TextBox: {
                            Name: 'TextBox2'
                        }
                    }
                ]
            }
        }
    };
}