describe('TabPanel', function () {

    var tabPage1, tabPage2, tabPanel;
    var $nav, $content, $tabPanel;

    describe('Render', function () {
        // Given
        var textBox1 = new TextBox();
        textBox1.setValue('test1');

        var textBox2 = new TextBox();
        textBox2.setValue('test2');

        tabPanel = new TabPanel();
        tabPage1 = new TabPage();
        tabPage2 = new TabPage();

        tabPage1.setText('Tab 1');
        tabPage1.setName('Tab1');
        tabPage2.setText('Tab 2');
        tabPage2.setName('Tab2');

        it('TabPanel with 2 TabPages', function () {
            // When
            tabPanel.addPage(tabPage1);
            tabPanel.addPage(tabPage2);
            $tabPanel = tabPanel.render();
            $nav = $('.nav-tabs', $tabPanel);
            $content = $('.tab-content', $tabPanel);

            // Then
            assert.equal($('li', $nav).length, 2);
            assert.isTrue($nav.find('li:first').hasClass('active'));
            assert.isFalse($nav.find('li:last').hasClass('active'));
            assert.equal($nav.find('a[data-toggle="tab"]:first').text(), 'Tab 1');
            assert.equal($nav.find('a[data-toggle="tab"]:last').text(), 'Tab 2');

            assert.equal($('div.tab-pane', $content).length, 2);
            assert.isTrue($content.find('div.tab-pane:first').hasClass('active'));
            assert.isFalse($content.find('div.tab-pane:last').hasClass('active'));
            assert.equal(
                $('a[data-toggle="tab"]:first', $nav).prop('hash').replace(/^#/,''),
                $('div.tab-pane:first', $content).prop('id')
            );
            assert.equal(
                $('a[data-toggle="tab"]:last', $nav).prop('hash').replace(/^#/,''),
                $('div.tab-pane:last', $content).prop('id')
            );

        });

        it('should change selected page', function () {
            // When
            tabPanel.setSelectedPage(tabPage2);
            // Then
            assert.isFalse($nav.find('li:first').hasClass('active'));
            assert.isTrue($nav.find('li:last').hasClass('active'));

        });

        it('should remove page', function () {
            // When
            tabPanel.removePage(tabPage2);
            $nav = $('.nav-tabs', $tabPanel);
            $content = $('.tab-content', $tabPanel);

            // Then
            assert.equal($('li', $nav).length, 1);
            assert.isTrue($nav.find('li:first').hasClass('active'));
        });
    });
});