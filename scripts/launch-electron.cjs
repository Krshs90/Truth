const { spawn } = require('child_process');
const path = require('path');
const electronPath = require('electron');

const projectRoot = path.resolve(__dirname, '..');

console.log('[Truth Desktop] Launching Truth Civic Intelligence desktop window...');

function launchDirect() {
  console.log('[Truth Desktop] Launching via native Electron process...');
  const child = spawn(electronPath, ['.'], {
    stdio: 'inherit',
    cwd: projectRoot,
    windowsHide: false,
  });
  child.on('error', (err) => {
    console.error('[Truth Desktop] Failed to launch Electron directly:', err);
    process.exit(1);
  });
  child.on('exit', (code) => {
    process.exit(code ?? 0);
  });
}

if (process.platform === 'win32') {
  const psScript = path.join(__dirname, 'launch-default-desktop.ps1');
  try {
    const child = spawn(
      'powershell.exe',
      ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', psScript, '-ExePath', electronPath, '-WorkDir', projectRoot],
      { stdio: 'inherit', cwd: projectRoot, windowsHide: false }
    );

    child.on('error', (err) => {
      console.warn('[Truth Desktop] PowerShell launcher encountered an error, falling back to direct launch:', err.message);
      launchDirect();
    });

    child.on('exit', (code) => {
      if (code !== 0 && code !== null) {
        console.warn(`[Truth Desktop] PowerShell launcher exited with code ${code}, falling back to direct launch...`);
        launchDirect();
      } else {
        process.exit(code ?? 0);
      }
    });
  } catch (err) {
    console.warn('[Truth Desktop] Failed to spawn PowerShell, falling back to direct launch:', err);
    launchDirect();
  }
} else {
  launchDirect();
}
