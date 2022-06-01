const { registerValidation } = require("../registrationValidation");

const myData = {
  name: "Joydeep Bhattacharjee",
  email: "2jbhattacharjee@gmail.com",
  password: "Joy@12345",
};

const { error } = registerValidation(myData);

console.log(error);
