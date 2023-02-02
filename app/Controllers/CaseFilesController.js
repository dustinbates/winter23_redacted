import { appState } from "../AppState.js";
import { caseFilesService } from "../Services/CaseFilesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawCaseFiles() {
  let caseFiles = appState.caseFiles
  let template = ''
  caseFiles.forEach(c => template += c.TinyCaseTemplate)
  setHTML('caseFiles', template)
}

function _drawCaseFile() {
  let caseFile = appState.activeCaseFile
  // caseFile.ComputeSanitizedReport
  setHTML('big-case-file', caseFile.BigCaseTemplate)
}


export class CaseFilesController {
  constructor () {
    _drawCaseFiles()
    appState.on('caseFiles', _drawCaseFiles)
    appState.on('activeCaseFile', _drawCaseFile)
  }

  createCaseFile() {
    try {
      // NOTE don't refresh the page!
      window.event.preventDefault()
      const form = window.event.target
      const formData = getFormData(form)
      console.log(formData);
      caseFilesService.createCaseFile(formData)
      // @ts-ignore
      form.reset()
    } catch (error) {
      Pop.error(error.message)
      console.error(error);
    }
  }

  setActiveCaseFile(caseId) {
    try {
      caseFilesService.setActiveCaseFile(caseId)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  updateCaseFile() {
    try {
      let textArea = document.getElementById('🦞')
      // @ts-ignore
      let updatedBody = textArea.value
      console.log('blurred', updatedBody);
      caseFilesService.updateCaseFile(updatedBody)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async unlockCase() {
    try {
      const password = await Pop.prompt("What's the password?")
      console.log(password);
      caseFilesService.unlockCase(password)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }
}