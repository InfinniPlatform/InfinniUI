describe('IndeterminateCheckbox', function () {
	var indeterminateCheckbox;

	beforeEach(function () {
		indeterminateCheckbox = new IndeterminateCheckbox();
	});

	describe('Render', function () {

		describe('Setting the properties', function () {

			it('Setting property: visible', function () {
				//Given
				var $el = indeterminateCheckbox.render();
				assert.isFalse($el.hasClass('hidden'));

				//When
				indeterminateCheckbox.setVisible(false);

				//Then
				assert.isTrue($el.hasClass('hidden'));
			});

			it('Setting property: text', function () {
				//Given
				indeterminateCheckbox.setText('Text 1');

				var $el = indeterminateCheckbox.render(),
					$label = $('.indeterminateCheckbox-label', $el);

				assert.equal($label.html(), 'Text 1');

				//When
				indeterminateCheckbox.setText('Text 2');

				//Then
				assert.equal($label.html(), 'Text 2');
			});

			it('Setting property: Enabled', function () {
				//Given
				var $el = indeterminateCheckbox.render(),
					$input = $('input', $el);

				assert.equal($input.prop('disabled'), false, 'Enabled by default');

				//When
				indeterminateCheckbox.setEnabled(false);

				//Then
				assert.equal($input.prop('disabled'), true, 'Disable element');
			});

			it('Setting property: indeterminate', function () {
				//Given
				var $el = indeterminateCheckbox.render(),
					$input = $('input', $el);

				assert.equal($input.prop('indeterminate'), false, 'Indeterminate state by default');

				//When
				indeterminateCheckbox.setValue('indeterminate');

				//Then
				assert.equal($input.prop('indeterminate'), true, 'Indeterminate state for indeterminateCheckbox');
			});

		});

		describe('events', function () {
			it('Change value on click', function () {
				//Given
				var $el = indeterminateCheckbox.render(),
					$input = $('input', $el);

				indeterminateCheckbox.setValue('unchecked');

				//When
				$input.click();

				//Then
				assert.equal(indeterminateCheckbox.getValue(), 'checked', 'value changed');
				assert.equal($input.prop('checked'), true, 'indeterminateCheckbox checked');
				assert.equal($input.prop('indeterminate'), false, 'Indeterminate state by default');

				//When
				$input.click();

				//Then
				assert.equal(indeterminateCheckbox.getValue(), 'unchecked', 'value changed');
				assert.equal($input.prop('checked'), false, 'indeterminateCheckbox checked');
				assert.equal($input.prop('indeterminate'), false, 'Indeterminate state by default');

				//When
				$input.click();

				//Then
				assert.equal(indeterminateCheckbox.getValue(), 'checked', 'value changed');
				assert.equal($input.prop('checked'), true, 'indeterminateCheckbox checked');
				assert.equal($input.prop('indeterminate'), false, 'Indeterminate state by default');
			});
		});

	});

});
