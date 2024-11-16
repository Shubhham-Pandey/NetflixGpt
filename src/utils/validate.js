export function checkValidateFields(email, password) {
    console.log(email);
    console.log(password);
    const result = {};
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password); 
    if(!isValidEmail) { 
        result.email = "Email is not valid."; 
    }
    if(!isValidPassword) {
        result.password = "Password is not valid."; 
    }

    return result;
}