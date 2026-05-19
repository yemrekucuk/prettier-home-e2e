
export function generateEmail(){

 return `test${Date.now()}@gmail.com`;

}


export function generatePhone(){

 return `555${Date.now() .toString().slice(-7)}`;

}