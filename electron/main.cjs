const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('disable-gpu-sandbox');
app.commandLine.appendSwitch('no-sandbox');

process.on('uncaughtException', (err) => {
  console.error('[Truth Fatal] Uncaught exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('[Truth Fatal] Unhandled promise rejection:', reason);
});

let mainWindow = null;
let packagedUrl = '';
const isDev = !app.isPackaged;

function createMainWindow() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.show();
    mainWindow.focus();
    return;
  }

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 980,
    minHeight: 640,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#141414',
    icon: path.join(__dirname, 'icon.ico'),
    show: true,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      backgroundThrottling: false,
      devTools: isDev,
    },
  });

  const revealWindow = () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      if (!mainWindow.isVisible()) {
        mainWindow.show();
      }
      mainWindow.focus();
    }
  };

  mainWindow.once('ready-to-show', revealWindow);
  mainWindow.webContents.once('did-finish-load', () => {
    console.log('[Truth Desktop] WebContents finished loading.');
    revealWindow();
  });

  setTimeout(revealWindow, 1200);

  if (isDev) {
    const devUrl = 'http://127.0.0.1:5173';
    console.log(`[Truth Desktop] Loading dev URL: ${devUrl}`);
    mainWindow.loadURL(devUrl);
  } else {
    mainWindow.loadURL(packagedUrl);
  }

  mainWindow.webContents.on('did-fail-load', (_event, errorCode, errorDescription) => {
    console.warn(`[Truth Desktop] Failed to load (${errorCode}: ${errorDescription}), retrying...`);
    if (isDev && mainWindow && !mainWindow.isDestroyed()) {
      setTimeout(() => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.loadURL('http://127.0.0.1:5173');
        }
      }, 800);
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

ipcMain.on('window-minimize', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.minimize();
  }
});

ipcMain.on('window-maximize', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('window-close', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.close();
  }
});

ipcMain.handle('window-is-maximized', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    return mainWindow.isMaximized();
  }
  return false;
});

ipcMain.on('open-external', (_event, url) => {
  if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
    shell.openExternal(url);
  }
});

app.whenReady().then(async () => {
  if (!isDev) {
    process.env.TRUTH_DATA_DIR = app.getPath('userData');
    const { startAppServer } = require('./appServer.cjs');
    const { port } = await startAppServer(
      path.join(__dirname, '../dist'),
      path.join(__dirname, 'apiServer.bundle.cjs')
    );
    packagedUrl = `http://127.0.0.1:${port}`;
  }
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
