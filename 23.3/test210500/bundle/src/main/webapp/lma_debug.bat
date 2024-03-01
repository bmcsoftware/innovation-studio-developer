@echo off
REM Here we want to debug our library, we need to put this scripts in the /bundle/src/main/webapp/ folder and launch it from there.

REM You can set the SDK path, just in case if it is not set already (uncomment the following line):
REM SET RX_SDK_HOME=C:\dev\sdk\com.bmc.arsys.rx.sdk-22.1.03

REM the apihost is the server you want to connect to.
REM For example if to access the view you are usually connecting to:
REM http://192.168.159.128:8008/helix/index.html#/com.example.test210500/view/com.example.test210500:test%20star%20rating
REM the apihost would then be 192.168.159.128
REM Note:
REM the file "proxy.conf.js" assumes that the port is 8008:
REM target: `http://${apiHost}:8008`,
REM
REM In order to access the view you need to change the url to use "localhost:4200", for example:
REM http://localhost:4200/helix/index.html#/com.example.test210500/view/com.example.test210500:test%20star%20rating
REM
REM You can also debug the design time (View Designer), so for example if you have:
REM http://192.168.159.128:8008/helix/index.html#/com.bmc.arsys.rx.innovationstudio/bundle/com.example.test210500/view/test%20star%20rating
REM The debug view would be:
REM http://localhost:4200/helix/index.html#/com.bmc.arsys.rx.innovationstudio/bundle/com.example.test210500/view/test%20star%20rating
REM
REM http://192.168.159.128:8008/helix/index.html#/com.bmc.arsys.rx.innovationstudio/bundle/com.example.test210500/view/test%20star%20rating%20field
REM http://localhost:4200/helix/index.html#/com.bmc.arsys.rx.innovationstudio/bundle/com.example.test210500/view/test%20star%20rating%20field
npm start --apihost=192.168.159.131
