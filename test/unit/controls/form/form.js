describe('Form (Control)', function () {

	describe('Check Form element', function () {

		it('should update from default method attribute', function () {
			// Given
			var metadata = {
				Items: [
					{
						Form: {
							"Items": [
								{
									"TextBox": {
										"Value": "username"
									}
								}
							]
						}
					}
				]
			};

			// When
			testHelper.applyViewMetadata(metadata, onViewReady);

			// Then
			function onViewReady(view, $layout){
				$layout.detach();

				assert.equal($layout.find('.pl-form').attr('method'), '', 'attribute method is right');

				view.childElements[0].setMethod('post');

				assert.equal($layout.find('.pl-form').attr('method'), 'post', 'attribute method is right');

				view.childElements[0].setMethod('get');

				assert.equal($layout.find('.pl-form').attr('method'), 'get', 'attribute method is right');
			}
		});

		it('should update from default action attribute', function () {
			// Given
			var metadata = {
				Items: [
					{
						Form: {
							"Items": [
								{
									"TextBox": {
										"Value": "username"
									}
								}
							]
						}
					}
				]
			};

			// When
			testHelper.applyViewMetadata(metadata, onViewReady);

			// Then
			function onViewReady(view, $layout){
				$layout.detach();

				assert.equal($layout.find('.pl-form').attr('action'), '', 'attribute action is right');

				view.childElements[0].setAction('/blabla');

				assert.equal($layout.find('.pl-form').attr('action'), '/blabla', 'attribute action is right');
			}
		});

		it('should change value of attribute method on submit event', function () {
			// Given
			var metadata = {
				Items: [
					{
						Form: {
							"Method": "get",
							"OnSubmit": "{ debugger; context.view.childElements[0].setMethod('post') }",
							"Items": [
								{
									"Button": {
										"Type": "submit"
									}
								}
							]
						}
					}
				]
			};

			// When
			testHelper.applyViewMetadata(metadata, onViewReady);

			// Then
			function onViewReady(view, $layout){
				$layout.detach();

				assert.equal($layout.find('.pl-form').attr('method'), 'get', 'attribute method is right');
				
				$layout.find('.pl-button button').click();

				assert.equal($layout.find('.pl-form').attr('method'), 'post', 'attribute method is right');
			}
		});
	});
});
