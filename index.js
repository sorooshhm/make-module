#!/usr/bin/env node

const { normalizeName, createController, createModel } = require("./utils");
const fs = require("fs").promises;
const path = require("path");

let moduleName = process.argv[2];

if (!moduleName) throw new Error("You must set module name");

moduleName = normalizeName(moduleName);

const basePath = path.join(process.cwd(), moduleName);

fs.mkdir(basePath)
  .then(() => {
    const controllerPath = path.join(basePath, moduleName + ".controller.ts");
    const controllerData = createController(moduleName);

    return fs.writeFile(controllerPath, controllerData);
  })
  .then(() => {
    const modelPath = path.join(basePath, moduleName + ".model.ts");
    const modelData = createModel(moduleName);

    return fs.writeFile(modelPath, modelData);
  })
  .then(() => {
    console.log("Module files has been created successfuly");
  })
  .catch((err) => {
    throw err;
  });
