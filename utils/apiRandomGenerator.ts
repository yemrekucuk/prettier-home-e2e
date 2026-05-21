export const generateRandomEmail = () =>
        `test${Date.now()}@gmail.com`;

export const generateRandomPhone = () =>
        `(${Math.floor(Math.random()*900+100)}) ` +
        `${Math.floor(Math.random()*900+100)}-` +
        `${Math.floor(Math.random()*9000+1000)}`;

  