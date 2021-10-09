//Los callbacks son el nombre de una convención para usar funciones que llaman a otras en JavaScript
function sum(num1, num2) {
  return num1 + num2;
}

function calc(num1, num2, callback) {
  return callback(num1, num2);
}

console.log(calc(6, 2, sum));

//
function date(callback) {
  console.log(new Date());
  setTimeout(function () {
    let date = new Date();
    callback(date);
  }, 3000);
}

function printDate(dateNow) {
  console.log(dateNow);
}

date(printDate);
//Una función de callback es una función que se pasa a otra función como un argumento,
//que luego se invoca dentro de la función externa para completar algún tipo de rutina o acción.
