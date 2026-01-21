@echo off
REM =============================
REM Загружаем .env и запускаем Playwright с Test IT adapter
REM =============================

REM Установка переменных (из .env)
for /f "usebackq tokens=1,2 delims==" %%i in (.env) do set %%i=%%j

echo 🚀 Запуск Playwright с Test IT adapter...
npx playwright test comportlevel_1

echo ✅ Тест завершен.
pause