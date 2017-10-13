import { app, BrowserWindow, ipcMain as ipc} from 'electron'

let window = null;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  window = new BrowserWindow({width: 800, height: 600});
  window.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  window.webContents.openDevTools()

  window.on('closed', () => {
    window = null;
  });
});

ipc.on('db-states-data-fetched', (event, data) => {
  console.log(data.length);
  window.webContents.send('graph-update-states', data)
})