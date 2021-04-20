#!/bin/bash
#Precarga de Datos Iniciales en la aplicación

echo "START AT:"
date +%H:%M:%S

python manage.py loaddata mchat.json
python manage.py loaddata initial_data_item.json
python manage.py loaddata initial_data.json

timeEnd=$(( SECONDS - timeStart ))
echo "Finalizado el proceso en:"
date +%H:%M:%S