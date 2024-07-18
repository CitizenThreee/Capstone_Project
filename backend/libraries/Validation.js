class Validation {

    // Validate the user sign up inputs
    ValidateSignUp(input) {
        let response = { passed: true };

        // Check if the string is a valid email input using regex
        function IsValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Check to see if the string is a valid password
        // Must be between 8 and 20 chars, and has at least one number
        function IsValidPassword(password) {
            let passwordValid = true;

            // Check if password contains a number
            const numberRegex = /\d/;
            if(!numberRegex.test(password)) passwordValid = false;

            // Check if password is between 8 and 20 chars (inclusive)
            if(password.length < 8 || password.length > 20) passwordValid = false;

            return passwordValid;
        }

        // Test all the required inputs to make sure they are all valid
        try{
            if(!IsValidEmail(input.email)){ response.passed = false; response.email = 'Email is not a valid email'; }

            if(input.email != input.cEmail || !input.email){ response.passed = false; response.cEmail = 'Email confirmation does not match'; }

            if(!input.fname.length){ response.passed = false; response.fname = 'First name cannot be empty'; }

            if(!input.lname.length){ response.passed = false; response.lname = 'Last name cannot be empty'; }
        
            if(input.phone.length > 12 || input.phone.length < 8){ response.passed = false; response.phone = 'Number is not a valid phone number'; }
        
            if(!input.location.length) { response.passed = false; response.location = 'Location cannot be empty'; }
           
            if(!IsValidPassword(input.password)) { response.passed = false; response.password = 'Password must be between 8 and 20 characters, and contain at least one number' }

            if(input.password != input.cPassword) { response.passed = false; response.cPassword = 'Confirmation password does not match' }
        }
        catch {
            response = { passed: false, error: 'Error validating input, please make sure all required fields are completed'};
        }
        
        return response;
    }
}

module.exports = Validation;