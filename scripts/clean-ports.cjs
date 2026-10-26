const { execSync } = require('child_process');

try {
  execSync('taskkill /IM electron.exe /F', { stdio: 'ignore' });
} catch (e) {}

const ports = [5173, 3001];
for (const port of ports) {
  try {
    const output = execSync(`netstat -ano | findstr :${port} | findstr LISTENING`, { encoding: 'utf8' });
    const pids = [...new Set(output.split('\n').map(l => l.trim().split(/\s+/).pop()).filter(Boolean))];
    for (const pid of pids) {
      if (pid && pid !== '0' && pid !== String(process.pid)) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
          console.log(`[Truth] Freed port ${port} (PID ${pid})`);
        } catch (e) {}
      }
    }
  } catch (e) {
    // Port is already free
  }
}
console.log('[Truth] Ports ready');
