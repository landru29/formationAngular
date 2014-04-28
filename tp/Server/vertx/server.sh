#!/bin/bash

VERTX=`echo $PWD | sed 's!.*/!!'`

if [ "$VERTX" = "vertx" ] ; then
	vert.x/bin/vertx run server.js -conf server.conf
else
	echo
	echo "ERREUR : Positionner vous en ligne de commande dans le répertoire 'vertx' !"
	echo
	exit 1
fi