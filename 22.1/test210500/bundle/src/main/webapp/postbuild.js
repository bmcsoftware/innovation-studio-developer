const execSync = require('child_process').execSync;
execSync('schematics @helix/schematics:generate-manifest', { stdio: 'inherit' });
