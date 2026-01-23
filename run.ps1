# Установка переменной окружения TMS_TOKEN
$env:TMS_TOKEN="WlFZaEFQRG9kTk5QaDhLMDV5"

# Определение пути к файлу output.txt
$outputPath = "tmp/output.txt"

# Создание директории tmp, если она не существует
if (-not (Test-Path "tmp")) {
    New-Item -ItemType Directory -Path "tmp" -Force
}

# Создание тестового прогона с Start-Process
Start-Process -NoNewWindow -Wait -FilePath "testit" -ArgumentList @(
    "testrun",
    "create",
    "--url", "https://team-atdz.testit.software/api/v2",
    "--project-id", "01970bb3-a82c-75d3-8970-a3477c8f9793",
    "--testrun-name", "New test run",
    "--output", $outputPath
)

# Получение ID тестового прогона
$testRunId = Get-Content -Path $outputPath -Raw
$env:TMS_TEST_RUN_ID = $testRunId

# Запуск тестов Playwright
npx playwright test

# Завершение тестового прогона с Start-Process
Start-Process -NoNewWindow -Wait -FilePath "testit" -ArgumentList @(
    "testrun",
    "complete",
    "--url", "https://team-atdz.testit.software/api/v2",
    "--testrun-id", $testRunId
)