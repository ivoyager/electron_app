# electron_app
Wrapper for running Planetarium HTML5 export as a desktop app (experimental).

This may be a dumb idea, but what I'm doing here is having Electron (basically, a Chromium web browser) run the Planetarium (as an HTML5 export). It works. It may be a better idea to have the Planetarium (native export for platform) run the browser. The 2nd option seems better but I'm not sure. Or 3rd option, have browser run Planetarium, but (somehow) as its native export.

See Electron docs [here](https://www.electronjs.org/docs).

TODO:
* Start fullscreen, ~~remove File/Edit/View/Window/Help header~~.
* ~~Hookup openDevTools() to keyboard shortcut cntr-shift-I.~~
* ~~Bring browser window to front when link clicked (or tabbed window?)~~
* ~~Whitelist allowed websites: wikipedia.org, nasa.gov, etc.~~
* Deploy to Windows, Mac & Linux using [electron-forge](https://www.electronjs.org/docs/tutorial/boilerplates-and-clis#electron-forge) (I think).

## Electron setup & intallation
1. Follow Electron's [Setting up the Development Environment](https://www.electronjs.org/docs) guide.
2. Clone this repository.
3. Open cmd window and cd to electron_app.
4. `npm install --save-dev electron`
## Add the HTML5 project
1. Export Planetarium project as HTML5 with name "planetarium_app". We use a different name than web deployment because (I think) Chromium uses the same cache for both and we have different assets in the app.
2. Move the whole export (planetarium_app.\* files & favicon.png) to electron_app.
## Test run
`npm start`
## Deploy
We'll probably use [electron-forge](https://www.electronjs.org/docs/tutorial/boilerplates-and-clis#electron-forge). I don't know how to do this yet. 
