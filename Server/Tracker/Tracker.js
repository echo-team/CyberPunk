const { app, BrowserWindow, ipcMain } = require('electron');
const { Connector } = require('./Connector');
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
            preload: app.getAppPath('exe') + '/Observer.js',
        },
    });

    win.loadURL('https://cybermap.kaspersky.com/');
}

/**
 * Establishing connection with `RabbitMQ`
 * @type {Connector}
 */
const connector = new Connector();

/**
 * Value changed
 * Sends from Observer content script
 */
ipcMain.on('value', (event, value) =>
{
    console.log(value);
    connector.send(value);
});

app.on('ready', createWindow);
