this.Given(/^я не авторизован в системе$/, function (next) {
	next();
});

this.When(/^ввожу в поле Логин "([^"]*)"$/, function (login, next) {
	var api = window.parentCommitteeWindow.contextApp;
	var signInView = api.getChildView('SignInView');
	
	chai.assert.isTrue(signInView != null, 'SignInView not found');

	signInView.getContext().Controls['Login'].setValue('ivan@test.ru');
	signInView.getContext().Controls['Password'].setValue('ivan@test.ru');
	signInView.getContext().Controls['SignInButton'].click(); 

	setTimeout( next , 1000);
});

this.Then(/^система авторизует меня под пользователем "([^"]*)"$/, function (userName, next) {
	var assert = chai.assert;

	assert.isTrue(window.parentCommitteeWindow.currentUser != null, 'Authorized user not found');
	assert.equal(window.parentCommitteeWindow.currentUser.UserName, userName);

	next();
});

this.Then(/^система отобразит экран "([^"]*)"$/, function (viewName, next) {
	var expectationView = window.parentCommitteeWindow.contextApp.getChildView(viewName);

	chai.assert.isTrue(expectationView != null, viewName + ' not found');

	next();
});