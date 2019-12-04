const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

/**
 * Creates window when browser initted  
 * Starts tracking process
 */
function createWindow ()
{
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences:
        {
            nodeIntegration: false,
            preload: path.join(__dirname, 'Observer.js'),
        },
    });

    win.loadURL('https://cybermap.kaspersky.com/');
}

/**
 * Value changed
 * Sends from Observer content script
 */
ipcMain.on('value', (event, value) =>
{
    
});

app.on('ready', createWindow);
