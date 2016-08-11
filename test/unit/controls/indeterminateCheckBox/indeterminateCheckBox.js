describe('IndeterminateCheckBox', function () {
	var indeterminateCheckBox;

	beforeEach(function () {
		indeterminateCheckBox = new IndeterminateCheckBox();
	});

	describe('Render', function () {

		describe('Setting the properties', function () {

			it('Setting property: visible', function () {
				//Given
				var $el = indeterminateCheckBox.render();
				assert.isFalse($el.hasClass('hidden'));

				//When
				indeterminateCheckBox.setVisible(false);

				//Then
				assert.isTrue($el.hasClass('hidden'));
			});

			it('Setting property: text', function () {
				//Given
				indeterminateCheckBox.setText('Text 1');

				var $el = indeterminateCheckBox.render(),
					$label = $('.checkbox-label', $el);

				assert.equal($label.html(), 'Text 1');

				//When
				indeterminateCheckBox.setText('Text 2');

				//Then
				assert.equal($label.html(), 'Text 2');
			});

			it('Setting property: Enabled', function () {
				//Given
				var $el = indeterminateCheckBox.render(),
					$input = $('input', $el);

				assert.equal($input.prop('disabled'), false, 'Enabled by default');

				//When
				indeterminateCheckBox.setEnabled(false);

				//Then
				assert.equal($input.prop('disabled'), true, 'Disable element');
			});

			it('Setting property: indeterminate', function () {
				//Given
				var $el = indeterminateCheckBox.render(),
					$input = $('input', $el);

				assert.equal($input.prop('indeterminate'), false, 'Indeterminate state by default');

				//When
				indeterminateCheckBox.setValue('indeterminate');

				//Then
				assert.equal($input.prop('indeterminate'), true, 'Indeterminate state for indeterminateCheckBox');
			});

		});

		describe('events', function () {
			it('Change value on click', function () {
				//Given
				var $el = indeterminateCheckBox.render(),
					$input = $('input', $el);

				indeterminateCheckBox.setValue('unchecked');

				//When
				$input.click();

				//Then
				assert.equal(indeterminateCheckBox.getValue(), 'checked', 'value changed');
				assert.equal($input.prop('checked'), true, 'indeterminateCheckBox checked');
				assert.equal($input.prop('indeterminate'), false, 'Indeterminate state by default');

				//When
				$input.click();

				//Then
				assert.equal(indeterminateCheckBox.getValue(), 'unchecked', 'value changed');
				assert.equal($input.prop('checked'), false, 'indeterminateCheckBox checked');
				assert.equal($input.prop('indeterminate'), false, 'Indeterminate state by default');

				//When
				$input.click();

				//Then
				assert.equal(indeterminateCheckBox.getValue(), 'checked', 'value changed');
				assert.equal($input.prop('checked'), true, 'indeterminateCheckBox checked');
				assert.equal($input.prop('indeterminate'), false, 'Indeterminate state by default');
			});
		});

	});

});
