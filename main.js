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

const { app, BrowserWindow, Menu } = require('electron')

function createWindow() {
  let win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('planetarium_app.html')
  win.webContents.openDevTools()

  win.webContents.on('new-window', (event, url, frameName, disposition, options) => {
    console.log("Opening " + url)
    event.preventDefault()
    child = new BrowserWindow({ parent: win, modal: true, show: false })
    child.loadURL(url)
    child.once('ready-to-show', () => {
      child.show()
    })
    event.newGuest = child
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
