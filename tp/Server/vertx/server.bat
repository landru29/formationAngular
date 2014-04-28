@echo off
dir vert.x\bin\vertx.bat >NUL 2>NUL || goto fail

:ok
vert.x\bin\vertx.bat run server.js -conf server.conf
goto end

:fail
echo.
echo ERREUR : Positionner vous en ligne de commande dans le repertoire 'vertx' !
echo.

:end
