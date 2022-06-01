// const specialChars ="/[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]+/";

//  module.exports = function checkSpecialChar (name){
//     for (var i = 0; i < name.length; i++) {
//         if (specialChars .indexOf(name.charAt(i)) != -1) {
//             return true;
//         }
//      }
//      return false;

// }

// module.exports =function checkNumeric (name){
//     var regex = /\d+/g; 
//     if(name.match(regex)) return true
    
//     return false
     
// }

module.exports =function checkSpecialChar(name) {
    //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
    var regex = /^[A-Za-z0-9 ]+$/

    //Validate TextBox value against the Regex.
    var isValid = regex.test(name);
    if (!isValid) {
        return true
    } else {
        return false ;
    }
}

module.exports = function checkAsterisk(passowrd) {
    const string = passowrd 
    return string.includes('*')
}

// console.log(checkNumeric("Tonmay123"))

// console.log(checkNumeric('Tonmay'))


// var format = 

// if( string.match(format) ){
//   return true;
// }else{
//   return false;
