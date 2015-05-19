module.exports = (function () {
    var users = [
        {id: 1, username: 'user1', password: 'password1', home: '/launcher/#/VeteransHospital'},
        {id: 2, username: 'user2', password: 'password2', home: '/launcher/#/Ehr'}
    ];

    return {
        findById: function (id, fn) {
            var idx = id - 1;
            if (users[idx]) {
                fn(null, users[idx]);
            } else {
                fn(new Error('User ' + id + ' does not exist'));
            }
        },
        findByUsername: function (username, fn) {
            var user;
            for (var i = 0, len = users.length; i < len; i++) {
                user = users[i];
                if (user.username === username) {
                    return fn(null, user);
                }
            }
            return fn(null, null);
        }
    }
})();