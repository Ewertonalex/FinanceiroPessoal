@echo off
echo 🚀 Criando aplicativo portátil...

REM Criar pasta de saída
if exist "app-portatil" rmdir /s /q "app-portatil"
mkdir "app-portatil"

REM Copiar arquivos necessários
echo 📁 Copiando arquivos...
copy "index.html" "app-portatil\"
copy "styles.css" "app-portatil\"
copy "script.js" "app-portatil\"
copy "main.js" "app-portatil\"
copy "package.json" "app-portatil\"

REM Copiar pasta node_modules
echo 📦 Copiando dependências...
xcopy "node_modules" "app-portatil\node_modules\" /E /I /Q

REM Criar arquivo de inicialização
echo 🎯 Criando arquivo de inicialização...
echo @echo off > "app-portatil\Iniciar-Controle-Financeiro.bat"
echo echo Iniciando Controle Financeiro Pessoal... >> "app-portatil\Iniciar-Controle-Financeiro.bat"
echo cd /d "%%~dp0" >> "app-portatil\Iniciar-Controle-Financeiro.bat"
echo "node_modules\.bin\electron.cmd" . >> "app-portatil\Iniciar-Controle-Financeiro.bat"
echo pause >> "app-portatil\Iniciar-Controle-Financeiro.bat"

REM Criar arquivo README
echo 📖 Criando instruções...
echo # Controle Financeiro Pessoal - Versão Portátil > "app-portatil\LEIA-ME.txt"
echo. >> "app-portatil\LEIA-ME.txt"
echo ## Como usar: >> "app-portatil\LEIA-ME.txt"
echo 1. Execute "Iniciar-Controle-Financeiro.bat" >> "app-portatil\LEIA-ME.txt"
echo 2. O aplicativo abrirá automaticamente >> "app-portatil\LEIA-ME.txt"
echo 3. Seus dados serão salvos automaticamente >> "app-portatil\LEIA-ME.txt"
echo. >> "app-portatil\LEIA-ME.txt"
echo ## Características: >> "app-portatil\LEIA-ME.txt"
echo - Aplicativo portátil (não precisa instalar) >> "app-portatil\LEIA-ME.txt"
echo - Dados salvos automaticamente >> "app-portatil\LEIA-ME.txt"
echo - Funciona offline >> "app-portatil\LEIA-ME.txt"
echo - Interface idêntica ao projeto web >> "app-portatil\LEIA-ME.txt"

echo.
echo ✅ Aplicativo portátil criado com sucesso!
echo 📁 Pasta: app-portatil
echo 🎯 Execute: Iniciar-Controle-Financeiro.bat
echo.
pause
