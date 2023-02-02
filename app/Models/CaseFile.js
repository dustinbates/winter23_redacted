import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"


export class CaseFile {
  constructor (data) {
    this.id = generateId()
    this.title = data.title
    this.body = data.body || ''
    this.clearanceLevel = data.clearanceLevel
    this.author = data.author || 'Jeremy :)'
    this.date = data.date || new Date().toLocaleTimeString('en-US')
    this.unlocked = false
    switch (this.clearanceLevel) {
      case 'none':
        this.color = 'success'
        break;
      case 'secret':
        this.color = 'warning'
        break;
      default:
        this.color = 'danger'
        break;
    }
  }

  get TinyCaseTemplate() {
    return `
    <div class="col-6 selectable" onclick="app.caseFilesController.setActiveCaseFile('${this.id}')">
      <h2>
        <span>
        <i class="mdi mdi-file"></i>
        </span>
        <span class="text-${this.color}">
        ${this.title}
        </span>
        <span>
        ${this.author}
        </span>
      </h2>
    </div>
    `
  }

  get BigCaseTemplate() {
    return `
    <div class="col-7 m-auto bg-secondary rounded border border-${this.color}">
      <h1>
        <span>${this.title}</span>
        <span onclick="app.caseFilesController.unlockCase()" class="selectable">${this.unlocked ? '🔓' : '🔒'}</span>
      </h1>
      <div class="mb-3 d-flex justify-content-between">
        <h2>By: ${this.author}</h2>
        <h2 class="text-${this.color}">Clearance: ${this.clearanceLevel.toUpperCase()}</h2>
      </div>
      <h3>${this.date}</h3>
      <textarea ${this.unlocked ? '' : 'disabled'}  name="body" id="🦞" onblur="app.caseFilesController.updateCaseFile()">
      ${this.unlocked ? this.body : this.ComputeSanitizedReport}
      </textarea>
      <small>click here before leaving and don't use any punctuation</small>
    </div>
    `
  }

  get ComputeSanitizedReport() {
    let newReportArray = this.body.split(' ')
    let sanitizedArray = newReportArray.map(word => {
      if (appState.bannedWords.includes(word)) {
        return '⬛⬛⬛⬛'
      } else {
        return word
      }
    })
    let sanitizedBody = sanitizedArray.join(' ')
    console.log(sanitizedBody);
    return sanitizedBody
  }

  static ImAStatic() {
    console.log('sup yall');
  }
}