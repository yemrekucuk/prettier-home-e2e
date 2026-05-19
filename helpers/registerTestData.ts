import { generateEmail, generatePhone } from "./generateData";

export function createRegisterData(){

return{

email:generateEmail(),

phone:generatePhone()
};

}