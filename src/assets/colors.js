import {Appearance} from 'react-native';

const lightColors={
    background : '#fff',
    typography : '#000000',
    gray1 : '#d9d9d9',
    gray2 : '#f7f7f7',
    mediumGray : '#888888',
    color : '#934ED8',
};

const darkColors={
    background : '#000000',
    typography : '#fff',
    gray1 : '#262626',
    gray2 : '#181818',
    mediumGray : '#777777',
    color : '#934ED8',
};

const colors = Appearance.getColorScheme() === 'dark' ? darkColors : lightColors;

 export default colors;