// run-tests-properly.js
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Правильный запуск тестов и отправка результатов\n');

// Функция для запуска команды с лучшим выводом ошибок
function runCommand(command, options = {}) {
  console.log(`▶️  Выполняю: ${command}`);
  
  try {
    const result = execSync(command, {
      stdio: 'inherit', // Показываем весь вывод
      encoding: 'utf8',
      ...options
    });
    return { success: true, output: result };
  } catch (error) {
    console.error(`❌ Ошибка выполнения команды: ${command}`);
    console.error(`Код ошибки: ${error.status}`);
    console.error(`Сообщение: ${error.message}`);
    return { success: false, error };
  }
}

// Основная функция
async function main() {
  try {
    // 1. Очистка
    console.log('1. Очистка старых результатов...');
    const itemsToClean = ['test-results', 'results.json', 'playwright-report', 'test-results.json'];
    
    itemsToClean.forEach(item => {
      if (fs.existsSync(item)) {
        try {
          const stats = fs.statSync(item);
          if (stats.isDirectory()) {
            fs.rmSync(item, { recursive: true, force: true });
            console.log(   `Удалена директория: ${item}`);
          } else {
            fs.unlinkSync(item);
            console.log(   `Удален файл: ${item}`);
          }
        } catch (error) {
          console.log(   `Не удалось удалить ${item}: ${error.message}`);
        }
      }
    });
    
    // 2. Запуск тестов с правильными параметрами
    console.log('\n2. Запуск тестов Playwright...\n');
    
    // Вариант 1: Используем правильный синтаксис
    const command = 'npx playwright test comportLevel_1 --reporter=json';
    
    console.log('Команда:', command);
    console.log('--- Начинаю выполнение ---\n');
    
    const result = runCommand(command);
    
    if (!result.success) {
      console.log('\n⚠️ Тесты завершились с ошибкой');
      console.log('Попробую альтернативный способ...\n');
      
      // Альтернативный способ: сохраняем вывод в файл
      console.log('Альтернативный способ: сохраняю вывод в results.txt...');
      runCommand('npx playwright test comportLevel_1 --reporter=list > results.txt 2>&1');
      
      if (fs.existsSync('results.txt')) {
        const output = fs.readFileSync('results.txt', 'utf8');
        console.log('\nВывод тестов:');
        console.log(output.substring(0, 500));
        console.log('...');
      }
    }
    
    // 3. Ищем файл с результатами
    console.log('\n3. Поиск файла с результатами...');
    
    let resultsFile = null;
    
    // Проверяем различные места
    const possibleLocations = [
      { path: 'test-results', isDir: true },
      { path: 'playwright-report', isDir: true },
      { path: 'results.json', isDir: false },
      { path: 'test-results.json', isDir: false }
    ];
    
    for (const location of possibleLocations) {
      if (fs.existsSync(location.path)) {
        const stats = fs.statSync(location.path);
        
        if (location.isDir && stats.isDirectory()) {
          console.log(   `Найдена директория: ${location.path}`);
          const files = fs.readdirSync(location.path);
          const jsonFiles = files.filter(f => f.endsWith('.json') && f !== '.last-run.json');
          
          if (jsonFiles.length > 0) {
            resultsFile = path.join(location.path, jsonFiles[0]);
            console.log(   `Найден JSON файл: ${jsonFiles[0]}`);
            break;
          }
        } else if (!location.isDir && stats.isFile()) {
          console.log(   `Найден файл: ${location.path}`);
          resultsFile = location.path;
          break;
        }
      }
    }
    
    if (!resultsFile) {
      console.log('❌ Файл результатов не найден');
console.log('\n💡 Попробуйте запустить тесты вручную:');
      console.log('   npx playwright test comportLevel_1 --reporter=json');
      console.log('   (Вывод будет в консоли, скопируйте его в файл results.json)');
      return;
    }
    
    console.log(`✅ Использую файл: ${resultsFile}`);
    
    // 4. Проверяем содержимое файла
    console.log('\n4. Проверка содержимого файла...');
    try {
      const content = fs.readFileSync(resultsFile, 'utf8');
      const stats = fs.statSync(resultsFile);
      
      console.log(   `Размер: ${stats.size} байт`);
      console.log(   `Первые 300 символов:`);
      console.log(content.substring(0, 300));
      console.log('   ...');
      
      // Пытаемся распарсить
      const parsed = JSON.parse(content);
      console.log('   ✅ JSON валиден');
      
      if (parsed.suites) {
        console.log(   `Найдено suites: ${parsed.suites.length}`);
      }
      
      if (parsed.stats) {
        console.log(   `Статистика: ${parsed.stats.expected} тестов, ${parsed.stats.unexpected} неудачных`);
      }
      
    } catch (error) {
      console.log(   `❌ Ошибка при чтении файла: ${error.message}`);
    }
    
    // 5. Запуск отправки результатов
    console.log('\n5. Запуск отправки результатов в Test IT...\n');
    
    // Сначала проверяем, есть ли файл sendResultsToTestIT-fixed.js
    if (!fs.existsSync('sendResultsToTestIT-fixed.js')) {
      console.log('❌ Файл sendResultsToTestIT-fixed.js не найден');
      console.log('Создайте его по инструкции выше');
      return;
    }
    
    require('./sendResultsToTestIT-fixed.js');
    
  } catch (error) {
    console.error('\n❌ Непредвиденная ошибка:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Запускаем
main();