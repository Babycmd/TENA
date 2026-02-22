const { app, BrowserWindow } = require('electron');
const path = require('path');

// Always use dev server for now to avoid production issues
const isDev = true;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    title: 'Tena Flow',
  });

  if (isDev) {
    console.log('Loading from dev server: http://localhost:5173');
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    const distPath = path.join(__dirname, '..', 'dist', 'index.html');
    console.log('Loading from:', distPath);
    win.loadFile(distPath);
  }

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });

  win.webContents.on('console-message', (event, level, message) => {
    console.log('Console:', message);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
