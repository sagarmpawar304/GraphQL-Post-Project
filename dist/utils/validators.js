"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginInput = exports.validateRegisterInput = void 0;
const validateRegisterInput = ({ username, email, password, confirmPassword }) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = "Username can't be empty";
    }
    if (email.trim() === '') {
        errors.email = "Email can't be empty";
    }
    else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = 'Provide valid email';
        }
    }
    if (password.trim() === '') {
        errors.password = "Password can't be empty";
    }
    else if (password !== confirmPassword) {
        errors.confirmPassword = 'Confirm Password must match';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};
exports.validateRegisterInput = validateRegisterInput;
const validateLoginInput = ({ username, password }) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = "Username can't be empty";
    }
    if (password.trim() === '') {
        errors.password = "Password can't be empty";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};
exports.validateLoginInput = validateLoginInput;
//# sourceMappingURL=validators.js.map