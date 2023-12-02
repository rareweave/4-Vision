import { fileTree as FileTree } from "./fileTree";
import { useProjectName } from "../composables/useState";

import { generateCode } from "./exportProject";

export default async function publishContract() {
  let projectName = useProjectName();
  let contractCode = (await generateCode(projectName.value)).code;
}
