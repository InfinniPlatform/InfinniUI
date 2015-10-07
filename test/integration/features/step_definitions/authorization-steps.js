
// Given

this.Given(/^я не авторизован в системе$/, function (next) {
	if(window.configWindow.currentUser){
		window.configWindow.contextApp.context.Global.session.signOut(function () {
			window.configWindow.location.reload();
			next();
		},
		next);	
	} else {
		next();
	}
});

this.Given(/^я авторизован в системе под пользователем "([^"]*)"$/, function (userName, next) {

	var loginPassword = window.IntegrationTestConfig.autorizationInfo.LoginPassword;
	chai.assert.include(Object.keys(loginPassword), userName);

	window.testHelpers.waitView("SignInView", 
		function(){
			window.configWindow.contextApp.context.Global.session.signInInternal(userName, 
				loginPassword[userName], 
				true,
				function () {
					window.configWindow.location.reload();
					window.testHelpers.waitCondition(function(){
						return  window.configWindow.contextApp && window.configWindow.contextApp.isLoaded();
					}, next);
				},
				function () {			
					next(new Error("autorization failed"));
				}
			);
		},
		function(){
			next(new Error("SignInView not found"));
		});
});

this.Given(/^я авторизован в системе с ролью "([^"]*)"$/, function (role, next) {
	var roles = window.IntegrationTestConfig.autorizationInfo.Roles;
	var loginPassword = window.IntegrationTestConfig.autorizationInfo.LoginPassword;

	chai.assert.include(Object.keys(roles), role);
	chai.assert.include(Object.keys(loginPassword), roles[role]);

	window.testHelpers.waitView("SignInView", 
		function(){
			window.configWindow.contextApp.context.Global.session.signInInternal(roles[role], 
				loginPassword[roles[role]], 
				true,
				function () {
					window.configWindow.location.reload();
					next();
				},
				function () {			
					next(new Error("autorization failed"));
				}
			);
		},
		function(){
			next(new Error("SignInView not found"));
		});
});



// Then

this.Then(/^система авторизует меня под пользователем "([^"]*)"$/, function (userName, next) {
	var haveUser = function(){		
		return window.configWindow.currentUser != null;
	};

	var checkUserName = function(){
		try{
			chai.assert.equal(window.configWindow.currentUser.UserName, userName);
			next();
		}catch(err){
			next(err);
		}
	};

	var fail = function(){
		next(new Error('User is undefined'));
	};

	window.testHelpers.waitCondition(haveUser, checkUserName, fail);
});