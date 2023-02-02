import { CaseFilesController } from "./Controllers/CaseFilesController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  caseFilesController = new CaseFilesController()
}

window["app"] = new App();
