const fs = require('fs');
const path = require('path');
const appsPath = './apps';
const rxLibsPath = './tools/rx-libs';
const rxInnovationStudioPath = `${rxLibsPath}/com-bmc-arsys-rx-innovationstudio`;
const sdkLocation = process.env.RX_SDK_HOME;

if (!fs.existsSync(rxLibsPath)) {
  fs.mkdirSync(rxLibsPath, { recursive: true });
}

function isSDKInstalled() {
  var exists = fs.existsSync(sdkLocation);
  var stats = exists && fs.statSync(sdkLocation);

  return sdkLocation && exists && stats.isDirectory();
}

function copyDirectoryContent(sourceFolder, destinationFolder) {
  var exists = fs.existsSync(sourceFolder);
  var stats = exists && fs.statSync(sourceFolder);
  var isDirectory = exists && stats.isDirectory();

  if (exists && isDirectory) {
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder);
    }

    fs.readdirSync(sourceFolder).forEach(function(childItemName) {
      copyDirectoryContent(path.join(sourceFolder, childItemName),
        path.join(destinationFolder, childItemName));
    });
  } else {
    fs.copyFileSync(sourceFolder, destinationFolder);
  }
}

function shouldCopySdkArtefacts() {
  let result = false;

  if (fs.existsSync(path.join(rxLibsPath, '/version.properties'))) {
    const source = fs.readFileSync(path.join(sdkLocation, '/version.properties'));
    const target = fs.readFileSync(path.join(rxLibsPath, '/version.properties'));

    result = source.equals(target);
  }

  return result;
}

function copyRxLibraries() {
  if (!isSDKInstalled()) {
    console.error('Please ensure RX_SDK_HOME environment variable is pointing to the Helix Platform SDK location, then run the command again.');
    process.exit(1);
  }

  if (!shouldCopySdkArtefacts()) {
    copyDirectoryContent(path.join(sdkLocation, '/client/target/web-build/webapp/dist/libs/platform/'), rxLibsPath + '/platform');
    copyDirectoryContent(path.join(sdkLocation, '/client/target/web-build/webapp/dist/libs/com-bmc-arsys-rx-innovationstudio/'), rxInnovationStudioPath);
    copyDirectoryContent(path.join(sdkLocation, '/client/target/web-build/webapp/dist/scripts/'), path.join(appsPath, '../scripts'));
  }
}

copyRxLibraries();
