var credentials = require("credentials");
var tokens = require("tokens");

exports.parse = function (headers, requiredTokens) {
    if (!headers) {
        throw new Error("Missing headers.");        
    }

    // By default, we do not require any tokens.
    requiredTokens = requiredTokens || tokens.NONE;

    var parsedHeaders = {
        email: _parseEmail(headers),
        password: _parsePassword(headers),
        userToken: _parseUserToken(headers, requiredTokens),
        clientToken: _parseClientToken(headers, requiredTokens)
    };
};

var _parseEmail = function (headers) {
    var email = headers[credentials.HEADERS.EMAIL];

    // Email is always required.
    if (!email) {
        throw new Error("Missing email.");
    }

    return email;
};

var _parsePassword = function (headers) {
    var password = headers[credentials.HEADERS.PASSWORD];
    
    // Password is always required.
    if (!password) {
        throw new Error("Missing password.");
    }

    return password;
};

var _parseUserToken = function (headers, requiredTokens) {
    var token = headers[tokens.HEADERS.USER_AUTHENTICATION_TOKEN];

    if ((requiredTokens & tokens.REQUIRE.USER_AUTHENTICATION_TOKEN) !== 0 &&
        !token) {

        throw new Error("Missing user token.");
    }

    return token;
};

var _parseClientToken = function (headers, requiredTokens) {

    var token = headers[tokens.HEADERS.CLIENT_VALIDATION_TOKEN];

    if ((tokens & credentials.CLIENT_VALIDATION_TOKEN) !== 0 &&
        !token) {

        throw new Error("Missing client token.");
    }

    return token;
};
