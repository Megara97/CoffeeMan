import AsyncStorage from '@react-native-async-storage/async-storage';


const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('comanda', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const addElement = async (value) => {
    try {
        const currentValue = await AsyncStorage.getItem('comanda');
        console.log (currentValue);
        
        let comanda = [];

        if (currentValue) {
              comanda = JSON.parse(currentValue);
        }
  
        console.log (comanda);
        comanda.push(value);

        const jsonValue = JSON.stringify(comanda);
        await AsyncStorage.setItem('comanda', jsonValue);
    } catch (e) {
      console.log(e);
    }
};

const editElement = async (id,key,newValue) => {
    try {
      const currentValue = await AsyncStorage.getItem('comanda');
      
      if (currentValue) {
        let comanda = JSON.parse(currentValue);
        const index = comanda.findIndex((element) => element.id === id);
  
        if (index !== -1) {
          //comanda[index].name = newValue;
          comanda[index][key] = newValue;
    
          const jsonValue = JSON.stringify(comanda);
          await AsyncStorage.setItem('comanda', jsonValue);
        }
      }
    } catch (e) {
      console.log(e);
    }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('comanda');
    //return jsonValue != null ? JSON.parse(jsonValue) : null;
    console.log (jsonValue != null ? JSON.parse(jsonValue) : null);
  } catch (e) {
    console.log(e);
  }
};

const deleteElement = async (id) => {
  try {
    const currentValue = await AsyncStorage.getItem('comanda');
    
    if (currentValue) {
      let comanda = JSON.parse(currentValue);

      const index = comanda.findIndex((element) => element.id === id);

      if (index !== -1) {
        comanda.splice(index, 1);
        const jsonValue = JSON.stringify(comanda);
        await AsyncStorage.setItem('comanda', jsonValue);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteData = async () => {
    try {
        await AsyncStorage.removeItem('comanda');
    } catch (e) {
      console.log(e);
    }
  };

