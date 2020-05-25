// main.js
// This file is part of I, Voyager (https://ivoyager.dev)
// *****************************************************************************
// Copyright (c) 2017-2020 Charlie Whitfield
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// *****************************************************************************

const { app, BrowserWindow, Menu, shell } = require('electron')

const VERBOSE = false
const WHITELIST = [
  // subdomains are allowed
  "wikipedia.org",
  "wikimedia.org",
  "wikisource.org",
  "wikimediafoundation.org",
  "nasa.gov",
  "github.com",
  "ivoyager.dev",
]
const EXTERNAL_URLS = [
  // open in the user's default browser
  "https://github.com/sponsors/charliewhitfield",
]

function testWhitelist(url) {
  let urlObj = new URL(url)
  let hostname = urlObj.hostname
  let matchDomain = hostname.match(/\w+\.\w+$/)
  let testHost = matchDomain[0] // removed subdomains
  for (let safeHost of WHITELIST) {
    if (testHost == safeHost) return true;
  }
  console.log("BLOCKED (add to whitelist?): " + url)
  return false
}

function shellOpen(url) {
  for (let externalURL of EXTERNAL_URLS) {
    if (externalURL == url) {
      shell.openExternal(externalURL)
      return true
    }
  }
  return false
}

function createWindow() {
  
  let win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('planetarium_app.html')
  win.webContents.openDevTools()

  win.webContents.on('new-window', (event, url, frameName, disposition, options) => {
    if (VERBOSE) console.log("Attempting to open " + url)
    event.preventDefault()
    if (!testWhitelist(url) || shellOpen(url)) {
      return
    }
    let brwsr = new BrowserWindow({ parent: win, modal: true, show: false })
    brwsr.loadURL(url)
    brwsr.once('ready-to-show', () => {
      brwsr.show()
    })
    event.newGuest = brwsr

    brwsr.webContents.on('will-navigate', (event, url) =>{
      if (VERBOSE) console.log("Attempting to navigate " + url)
      if (!testWhitelist(url) || shellOpen(url)) {
        event.preventDefault()
      }
    })

    brwsr.webContents.on('new-window', (event, url, frameName, disposition, options) => {
      if (VERBOSE) console.log("brwsr attempting open; attempt load instead " + url)
      event.preventDefault()
      if (!testWhitelist(url) || shellOpen(url)) {
        return
      }
      brwsr.loadURL(url)
    })
  })
}

Menu.setApplicationMenu(false)

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
