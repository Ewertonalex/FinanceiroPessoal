@echo off 
echo Iniciando Controle Financeiro Pessoal... 
cd /d "%~dp0" 
"node_modules\.bin\electron.cmd" . 
pause 
