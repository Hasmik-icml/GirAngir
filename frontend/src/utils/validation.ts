export const validateName = (name: string) => {
    if (name.length === 0) return '';
    if (name.length < 3 || name.length > 25) {
        return "Username must be between 3 and 25 characters long";
    }

    const alphanumericRegex = /^[a-z0-9]+$/i;
    if (!alphanumericRegex.test(name)) {
        return "Username must consist of letters and numbers";
    }

    if (/^\d+$/.test(name)) {
        return "Username should not consist of only numbers";
    }

    return '';
};

export const validateEmail = (email: string): string => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email) ? '' : 'Invalid email';
};

export const validatePassword = (password: string): string => {
    if (password.length === 0) return '';

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return 'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number';
    }
    return '';
}