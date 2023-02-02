import { appState } from "../AppState.js";
import { CaseFile } from "../Models/CaseFile.js";
import { saveState } from "../Utils/Store.js";

class CaseFilesService {
  unlockCase(password) {
    if (appState.passwords[appState.activeCaseFile.clearanceLevel] == password) {
      appState.activeCaseFile.unlocked = true
      appState.emit('activeCaseFile')
    }
    else {
      throw new Error('INVALID PASSWORD, CHUPACABRA IS COMING FOR YOU')
    }
  }
  updateCaseFile(updatedBody) {
    let activeCaseFile = appState.activeCaseFile
    // NOTE updates the active caseFile as well as the one stored in our array because of object reference
    activeCaseFile.body = updatedBody
    activeCaseFile.unlocked = false
    saveState('caseFiles', appState.caseFiles)
    console.log(appState.caseFiles);
    appState.emit('activeCaseFile')
  }
  setActiveCaseFile(caseId) {
    let foundCase = appState.caseFiles.find(c => c.id == caseId)
    console.log(foundCase);
    appState.activeCaseFile = foundCase
  }
  createCaseFile(formData) {
    let newCase = new CaseFile(formData)
    console.log(newCase);
    appState.caseFiles.push(newCase)
    saveState('caseFiles', appState.caseFiles)
    appState.emit('caseFiles')
  }
}

export const caseFilesService = new CaseFilesService()