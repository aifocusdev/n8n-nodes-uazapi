@echo off
REM Script de instalação automática - n8n-nodes-uazapi
REM Execute: install.bat

echo.
echo ============================================
echo   Instalando n8n-nodes-uazapi
echo ============================================
echo.

REM Verificar Node.js
echo Verificando Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Node.js nao encontrado. Instale Node.js 18+ primeiro.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% detectado
echo.

REM Verificar npm
echo Verificando npm...
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] npm nao encontrado.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION% detectado
echo.

REM Instalar dependências
echo Instalando dependencias...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao instalar dependencias
    pause
    exit /b 1
)
echo [OK] Dependencias instaladas com sucesso!
echo.

REM Build
echo Compilando projeto...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha na compilacao
    pause
    exit /b 1
)
echo [OK] Build concluido com sucesso!
echo.

REM Verificar dist
if exist "dist\" (
    echo [OK] Pasta dist\ criada
    echo Arquivos gerados:
    dir /b dist\credentials\*.js 2>nul
    dir /b dist\nodes\UazApi\*.js 2>nul
) else (
    echo [AVISO] Pasta dist\ nao encontrada
)
echo.

REM Linkar (opcional)
set /p LINK="Deseja linkar o node localmente para testar? (s/n): "
if /i "%LINK%"=="s" (
    call npm link
    echo [OK] Node linkado! Execute em outro terminal:
    echo    cd %USERPROFILE%\.n8n
    echo    npm link n8n-nodes-uazapi
    echo    n8n restart
)
echo.

REM Resumo
echo ============================================
echo   INSTALACAO CONCLUIDA COM SUCESSO!
echo ============================================
echo.
echo Proximos passos:
echo    1. Testar localmente: npm link
echo    2. Rodar em dev mode: npm run dev
echo    3. Publicar no NPM: npm publish
echo.
echo Leia NEXT_STEPS.md para mais informacoes
echo.

pause