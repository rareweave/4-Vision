import { fileTree as FileTree } from "./fileTree";
import * as Babel from "@babel/standalone";

// Probably also not the best way to do this IDK

// Project to be implemnted, currently all one project
export default async function exportProject(projectName) {
  let contractCode = (await generateCode()).code;

  let blob = new Blob([contractCode], { type: "text/plain" });

  sendDownloadToClient(blob);

  return true;
}

async function generateCode() {
  let fileTree = new FileTree("Functions");
  await fileTree._init();

  // Fetches all the functions
  // Except for state, which isnt really a function
  let functions = (await fileTree.getFiles()).filter(
    (file) => file.name !== "state"
  );

  // Export all the functions as a variable
  const functionExport = functions.reduce((accumulator, { name, data }) => {
    return `${accumulator}const ${name} = ${data}\n`;
  }, "");

  const contractExport = `
${functionExport}
async function handle(state, action) {
  if (!action.input || typeof action.input !== "object" || typeof action.input.function !== "string") {
    throw new ContractError("Invalid input");
  }
  const functionMap = {
${functions.map(({ name }) => `    "${name}": ${name},`).join("\n")}
  };
  const selectedFunction = functionMap[action.input.function];
  if (!selectedFunction) {
    throw new ContractError(\`Function '\${action.input.function}' not found\`);
  }
  try {
    return await selectedFunction(state, action);
  } catch (error) {
    throw new ContractError(\`Error executing function '\${action.input.function}': \${error.message}\`);
  }
}`;

  //Using babel convert the code to es5 (IE11)
  let TranspiledContract = Babel.transform(contractExport, {
    presets: ["env"],
    targets: {
      browsers: "ie 11",
    },
  });

  return TranspiledContract;
}

async function sendDownloadToClient(blob) {
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "contract.js";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}