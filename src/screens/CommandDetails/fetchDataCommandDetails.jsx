import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchDataCommandDetails = async id => {
   try {
      const productsList = await AsyncStorage.getItem('products');
      const products = productsList ? JSON.parse(productsList) : [];
      const commandsList = await AsyncStorage.getItem('commands');
      const commands = commandsList ? JSON.parse(commandsList) : [];
      const index = commands.findIndex(element => element.id === id);
      if (index !== -1) {
         //Agregar el precio y el nombre de cada producto de la comanda
         commands[index].products.forEach(productInOrder => {
            const productInfo = products.find(
               productInMenu => productInMenu.id === productInOrder.id,
            );
            if (productInfo) {
               productInOrder.price = productInfo.price;
               productInOrder.product = productInfo.product;
            }
         });
         //console.log(commands[index]);
         return commands[index];
      }
   } catch (error) {
      console.error(error);
   }
};

/* 
   //No se actualiza al agregar o eliminar productos desde la screen Products
   //Se probo pasar màs parametros como change al hook y obtener fetchData desde el hook y usarlo en el useEffect
   const [command, products] = useCombineLocalStorage(route.params.id, change);

   useEffect(() => {
      if (command) {
         setName(command.client);
         setNotes(command.notes);
         setNumber(
            command.products.reduce(
               (total, product) => total + product.quantity,
               0,
            ),
         );
         setSubtotal(command.subtotal);

         //Copia de la comanda donde se agrega el precio y el nombre de cada producto
         let details = {...command};
         details.products.forEach(productInOrder => {
            const productInfo = products.find(
               productInMenu => productInMenu.id === productInOrder.id,
            );
            if (productInfo) {
               productInOrder.price = productInfo.price;
               productInOrder.product = productInfo.product;
            }
         });
         setList(details.products);
      }
   }, [change, route.params, command, products]);*/
