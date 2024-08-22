const path = require('path');

const preInstall = require(path.resolve(
  path.join(
    process.env.RX_SDK_HOME,
    '/client/target/web-build/webapp/dist/libs/platform/schematics/src/config/preinstall.js'
  )
));

preInstall.initialize();
