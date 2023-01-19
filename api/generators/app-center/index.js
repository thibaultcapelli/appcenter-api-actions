const CodeGen = require('swagger-typescript-codegen').CodeGen;
const fs = require('fs');
const path = require('path');

const nodePath = process.env.NODE_PATH;
const relativeFromRootPath = path.relative(`${nodePath}/generators`, __dirname);
const generatedFiledDir = path.join(nodePath, './src/generated', relativeFromRootPath);

const swaggerSpecPath = path.join(`${nodePath}/src/constants/swagger/spec.json`);
const swaggerSpecJson = fs.readFileSync(swaggerSpecPath, 'utf-8');
const swagger = JSON.parse(swaggerSpecJson);
const tsSourceCode = CodeGen.getTypescriptCode({
    className: "AppCenter",
    swagger: swagger,
});

const currentFileName = path.parse(__filename).name;
const generatedFilePath = path.join(generatedFiledDir, `${currentFileName}.ts`);

fs.promises.mkdir(path.dirname(generatedFilePath), {recursive: true})
    .then(x => {
        console.log(path.dirname(generatedFilePath));
        fs.writeFileSync(generatedFilePath, tsSourceCode);
    })
    .catch(console.error);
