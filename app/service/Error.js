(function () {
    'use strict';

    function BusinessError(code, message) {
        this.code = code;
        this.message = message;
    }

    module.exports = {
        NOT_FOUND: 'NOT_FOUND',
        FORBIDDEN: 'FORBIDDEN',
        VALIDATION_FAILURE: 'VALIDATION_FAILURE',
        is: function (error, errorCode) {
            return error instanceof BusinessError && (null == errorCode || error.code === errorCode);
        },
        new: function (code, message) {
            return new BusinessError(code, message);
        }
    };
})();