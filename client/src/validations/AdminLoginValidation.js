const AdminLoginValidation = (user) =>{
    let errors = [];
    let format =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    

        if (!user.email) {
            errors.email = "Email is required.";
        } else if (!format.test(user.email)) {
            errors.email = "Wrong Email Format";
          }
        if (!user.password) {
            errors.password = "Password is required";
          } else if (user.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }
    
    

      return errors;
} 
export default AdminLoginValidation;