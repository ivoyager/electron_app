# electron_app
Wrapper for running Planetarium HTML5 export as a desktop app (experimental).

See Electron docs [here](https://www.electronjs.org/docs).

TODO:
* Start fullscreen, remove File/Edit/View/Window/Help header.
* Improvements, e.g., macOS dock functionality as described [here](https://www.electronjs.org/docs/tutorial/first-app#electron-development-in-a-nutshell).
* Bring browser window to front when link clicked (or tabbed window?)
* Whitlist allowed websites: wikipedia.org, etc.
* Deploy to Windows, Mac & Linux using electron-forge (I think).

## Electron setup & intallation
1. Follow Electron's [Setting up the Development Environment](https://www.electronjs.org/docs) guide.
2. Clone this repository.
3. Open cmd window and cd to electron_app.
4. `npm install --save-dev electron`
## Add the HTML5 project
1. Export Planetarium project as HTML5 with name "planetarium_app" (Must be "planetarium\*" for .gitignore. I think Chromium might use cached files from web deployment if those have same file names, hence the "_app" suffix.)
2. Rename the .html file to "index.html"
3. Move the whole export (index.html, planetarium\* files, favicon.png) to electron_app
## Test run
`npm start`
## Deploy
We'll probably use [electron-forge](https://www.electronjs.org/docs/tutorial/boilerplates-and-clis#electron-forge). I don't know how to do this yet. 


