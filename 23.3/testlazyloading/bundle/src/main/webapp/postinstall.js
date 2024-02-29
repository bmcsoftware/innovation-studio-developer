const execSync = require('child_process').execSync;

execSync('schematics @helix/schematics:workspace', { stdio: 'inherit' });
