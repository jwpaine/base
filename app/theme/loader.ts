// import fs from 'fs';
// import path from 'path';

// const themeDirectory = path.join(__dirname, 'sites');

// type ThemeData = {
//   color: {
//     brand: string;
//   };
// };

// const loadThemeData = (): { [key: string]: ThemeData } => {
//   const themes: { [key: string]: ThemeData } = {};
  
//   const files = fs.readdirSync(themeDirectory);

//   files.forEach((file) => {
//     const filePath = path.join(themeDirectory, file);
//     const domain = path.basename(file, path.extname(file));
//     const themeData = require(filePath).default;
//     themes[domain] = themeData;
//   });

//   return themes;
// };

// export default loadThemeData;

import fs from 'fs';
import path from 'path';

const themeDirectory = path.join(__dirname, 'sites');

type ThemeData = {
  color: {
    brand: string;
  };
};

const loadThemeData = (): { [key: string]: ThemeData } => {
  const themes: { [key: string]: ThemeData } = {};

  const files = fs.readdirSync(themeDirectory);

  files.forEach((file) => {
    const filePath = path.join(themeDirectory, file);
    const domain = path.basename(file, path.extname(file));
    const themeData = require(filePath).default;
    themes[domain] = themeData;
  });

  return themes;
};

export default loadThemeData;
