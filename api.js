const API = 'http://10.0.2.2:3000/products';

export const getProducts = async () => {
   const res = await fetch(API);
   return await res.json();
};

//NO PROBADA NI USADA
export const getProduct = async id => {
   const res = await fetch(`${API}/${id}`);
   return await res.json();
};

export const countProducts = async () => {
   const res = await fetch(`${API}/count`);
   return await res.json();
};

export const saveProduct = async (product, price) => {
   const res = await fetch(API, {
      method: 'POST',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
         name: product,
         price: price,
      }),
   });
   return await res.json();
};

export const deleteProduct = async id => {
   await fetch(`${API}/${id}`, {
      method: 'DELETE',
   });
};

export const changeStatusProduct = async id => {
   await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
         product_status: false,
      }),
   });
};

export const editPriceProduct = async (id, price) => {
   const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
         product_price: price,
      }),
   });
};
