@echo off
setlocal
cd /d "%~dp0"

echo ==============================================
echo        KORE FINANCE API - INICIALIZACAO
echo ==============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo ERRO: Node.js nao foi encontrado.
  pause
  exit /b 1
)

if not exist ".env" (
  copy ".env.example" ".env" >nul
  echo O arquivo .env foi criado.
  echo.
  echo O Bloco de Notas vai abrir agora.
  echo Troque apenas SUA_SENHA pela NOVA senha do usuario koreuser.
  echo Depois salve o arquivo e feche o Bloco de Notas.
  echo.
  start /wait "" notepad.exe ".env"
)

findstr /C:"SUA_SENHA" ".env" >nul
if not errorlevel 1 (
  echo.
  echo ERRO: voce ainda precisa substituir SUA_SENHA no arquivo .env.
  echo Abra .env, coloque a senha, salve e execute este arquivo novamente.
  pause
  exit /b 1
)

echo.
echo Instalando dependencias...
call npm.cmd install
if errorlevel 1 (
  echo.
  echo O npm encontrou um erro durante a instalacao.
  pause
  exit /b 1
)

echo.
echo Iniciando a API...
call npm.cmd run start:dev

endlocal
