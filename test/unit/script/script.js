describe('Script', function () {
    describe('render', function () {
        it('Setting the properties: name, body', function () {
            //Given
            var metadata = [
                {
                    Name: "colorButton",
                    Body: "context.v = 5; args.Text = args.Text + ' text'; args.Value = 1*10;"
                },
                {
                    Name: "changeValue",
                    Body: "args.Items = Object.keys(args);context = delete context['v'];"
                }
            ];

            var sb = new ScriptBuilder();

            var script = new Script();
            var script1 = new Script();

            _.each(metadata, function(el, i){
                if(!i){
                    script = sb.build(el);
                }else {
                    script1 = sb.build(el);
                }
            });

            var ContextObj = {v: 1};
            var ArgumentsObj = {Text: "Same", Value: 1};
            var ContextObj1 = {v: 10};
            var ArgumentsObj1 = {Text: "Same text", Value: 5};

            //When
            script.run(ContextObj, ArgumentsObj);
            script1.run(ContextObj1, ArgumentsObj1);

            //Then
            assert.equal(ArgumentsObj.Text, "Same text");
            assert.equal(ArgumentsObj.Value, 10);
            assert.equal(ContextObj.v, 5);

            assert.equal(ArgumentsObj1.Items[0], 'Text');
            assert.equal(ArgumentsObj1.Items[1], 'Value');
            assert.isTrue($.isEmptyObject(ContextObj1));
        });
    });
});