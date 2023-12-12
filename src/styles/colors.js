import {variants} from '@catppuccin/palette';

const lFlavor = variants.latte;
const dFlavor = variants.mocha; //frappe o macchiato

const light = {
   dark: false,
   colors: {
      background: lFlavor.base.hex,
      typography: lFlavor.text.hex,
      surface: lFlavor.surface0.hex, //crust, mantle, surface(0,1,2)
      secondary: lFlavor.mantle.hex, //crust, mantle, surface(0,1,2)
      overlay: lFlavor.overlay1.hex,
      color1: lFlavor.lavender.hex, //mauve, lavender, overlay2
      shadow: {
         startColor: lFlavor.text.hex + '30',
         endColor: lFlavor.base.hex,
      },
      ok: lFlavor.green.hex,
      nok: lFlavor.red.hex,
      neutral: lFlavor.blue.hex,
   },
};

const dark = {
   dark: true,
   colors: {
      background: dFlavor.base.hex,
      typography: dFlavor.text.hex,
      surface: dFlavor.surface0.hex, //crust, mantle, surface(0,1,2)
      secondary: dFlavor.mantle.hex, //crust, mantle, surface(0,1,2)
      overlay: dFlavor.overlay1.hex,
      color1: dFlavor.lavender.hex, //mauve, lavender, overlay2
      shadow: {
         startColor: dFlavor.text.hex + '30',
         endColor: dFlavor.base.hex,
      },
      ok: dFlavor.green.hex,
      nok: dFlavor.red.hex,
      neutral: dFlavor.blue.hex,
   },
};

export default {light, dark};
