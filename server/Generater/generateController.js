const fs = require('fs');
const { plural } = require('pluralize');
const path = require('path');

const controllerContentTemp=require('./template/crud.controller')
const routeContentTemp=require('./template/crud.route')

function generateController(modelName) {
  const controllerName = `${modelName}Controller`;
  const routeFileName = `${modelName}Route`;
  const routeName = `/${plural(modelName.toLowerCase())}`;

  
  const controllerContent =controllerContentTemp(modelName,controllerName)

  const folderPath = './controllers';
  const filename = `${controllerName}.js`;
  const filepath = `${folderPath}/${filename}`;


  //check is folder is avilable
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  // file create 
  // if (!fs.existsSync(filepath))  fs.writeFileSync(filepath, '', 'utf8');//not file to create

  fs.writeFile(filepath, controllerContent, (err) => {
    if (err) throw err;
    console.log(`controller - ${filename} has been created successfully!`);
  });

  const routeContent =routeContentTemp(controllerName)
  const routeIndexContent=require('./template/index.route')()

  const folderPathRoute='./routes'
  const Routefilename = `${routeFileName}.js`;
  const Routefilepath = `./routes/${Routefilename}`;
  const RouteIndexPath=`${folderPathRoute}/index.js`

    //check is folder is avilable
    if (!fs.existsSync(folderPathRoute)) {
      fs.mkdirSync(folderPathRoute);
    }

    //check is have route/index.js file
    if (!fs.existsSync(RouteIndexPath))  fs.writeFileSync(RouteIndexPath, routeIndexContent, 'utf8')

  fs.writeFile(Routefilepath, routeContent, (err) => {
    if (err) throw err;
    console.log(`route - ${Routefilename} has been created successfully!`);

  //   fs.readdirSync("./routes/")
  // .filter((file) => file.endsWith('Route.js'))
  // .forEach((file) => {
  //   const route = require(path.join("../routes/", file));
  //   app.use(`/${file.replace('Routes.js', '').toLowerCase()}`, route);
  // });

  // fs.appendFile('index.js', `app.use('/${modelName.toLowerCase()}', require('./${Routefilename}'));`, (err) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(`"${Routefilename}" route imported in "index.js" file.`);
  // });


// Read the contents of the file into a string
let fileContents = fs.readFileSync('routes/index.js', 'utf8');
// Append the new content above the module.exports line
fileContents = fileContents.replace(/module.exports\s*=\s*router\s*;/,
`
router.use('/${Routefilename.replace('Route.js', '').toLowerCase()}', require('./${Routefilename}')); // New content to append\n
module.exports = router;`
);

// Write the modified contents back to the file
fs.writeFileSync('routes/index.js', fileContents, 'utf8');


//create postman.json file

const postmanfilePath = './postman.json';

if (!fs.existsSync(postmanfilePath))  fs.writeFileSync(postmanfilePath, require('./template/postmanindex.crud'), 'utf8')

const postmanfileContents = fs.readFileSync(postmanfilePath, 'utf8');

const jsonData = JSON.parse(postmanfileContents);
jsonData.item=[...jsonData.item,require('./template/postmanJson.crud')(modelName)]

const newFileContents = JSON.stringify(jsonData);
fs.writeFileSync(postmanfilePath, newFileContents, 'utf8');

console.log(`route - postman.json has been created successfully!`);

  });

  return routeName;
}

module.exports = generateController;
