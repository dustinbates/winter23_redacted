import { CaseFile } from "./Models/CaseFile.js"
import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = loadState('values', [Value])

  /** @type {import('./Models/CaseFile').CaseFile[]} */
  caseFiles = loadState('caseFiles', [CaseFile])

  /** @type {import('./Models/CaseFile').CaseFile|null} */
  activeCaseFile = null

  /** @type {String[]} */
  bannedWords = ['scary', 'hairy']

  passwords = {
    'secret': 'squirrel',
    'top-secret': '🦞🦒🥫🔥',
    'none': 'password'
  }
}


export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
