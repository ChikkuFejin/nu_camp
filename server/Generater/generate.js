const generateController = require('./generateController');

const modelName = process.argv[2];

if (!modelName) {
  console.error('Please provide a model name!');
  process.exit(1);
}

const routeName = generateController(modelName);

console.log(`Controller and route generated for ${modelName} at ${routeName}`);
