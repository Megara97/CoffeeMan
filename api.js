const productsAPI = 'http://192.168.100.57:3000/products';
const commandsAPI = 'http://192.168.100.57:3000/commands';
//const productsAPI = 'http://10.0.2.2:3000/products';

export const getProducts = async () => {
   const res = await fetch(productsAPI);
   return await res.json();
};

export const getProduct = async id => {
   const res = await fetch(`${productsAPI}/${id}`);
   return await res.json();
};

export const countProducts = async () => {
   const res = await fetch(`${productsAPI}/count`);
   return await res.json();
};

export const saveProduct = async (name, price) => {
   const res = await fetch(productsAPI, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
         name: name,
         price: price,
      }),
   });
   return await res.json();
};

export const deleteProduct = async id => {
   await fetch(`${productsAPI}/${id}`, {
      method: 'DELETE',
   });
};

export const changeStatusProduct = async id => {
   await fetch(`${productsAPI}/${id}`, {
      method: 'PUT',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
         product_status: false,
      }),
   });
};

export const editPriceProduct = async (id, price) => {
   const res = await fetch(`${productsAPI}/${id}`, {
      method: 'PUT',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
         product_price: price,
      }),
   });
};

export const saveCommand = async command => {
   console.log(command);
   const res = await fetch(commandsAPI, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({...command}),
   });
   return await res.json();
};
