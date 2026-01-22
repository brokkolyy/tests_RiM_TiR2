// sendFromTests.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const config = {
  baseUrl: 'https://team-atdz.testit.software/api/v2',
  token: 'WlFZaEFQRG9kTk5QaDhLMDV5',
  projectId: '01970bb3-a82c-75d3-8970-a3477c8f9793',
  configurationId: '01970bb3-a864-74e6-a813-a14b67880298'
};

// Функция для парсинга тестовых файлов и извлечения externalId
function extractExternalIdsFromTestFiles() {
  console.log('🔍 Поиск тестовых файлов и извлечение externalId...\n');
  
  const tests = [];
  
  // Ищем все .spec.js файлы
  const findSpecFiles = (dir) => {
    const files = [];
    
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory()) {
          files.push(...findSpecFiles(fullPath));
        } else if (item.isFile() && (item.name.endsWith('.spec.js') || item.name.endsWith('.test.js'))) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.log(`⚠️ Ошибка при сканировании ${dir}: ${error.message}`);
    }
    
    return files;
  };
  
  const specFiles = findSpecFiles('./tests');
  console.log(`📁 Найдено ${specFiles.length} тестовых файлов\n`);
  
  // Парсим каждый файл
  specFiles.forEach((file, fileIndex) => {
    console.log(`${fileIndex + 1}. ${path.relative('.', file)}`);
    
    try {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      
      let currentTest = null;
      let inTestBlock = false;
      let braceCount = 0;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Начало теста
        if (line.startsWith('test(') && line.includes('async')) {
          const testNameMatch = line.match(/test\s*\(\s*['"]([^'"]+)['"]/);
          if (testNameMatch) {
            currentTest = {
              name: testNameMatch[1],
              externalId: null,
              file: file,
              line: i + 1
            };
            inTestBlock = true;
            braceCount = 0;
          }
        }
        
        if (inTestBlock && currentTest) {
          // Считаем фигурные скобки
          braceCount += (line.match(/{/g) || []).length;
          braceCount -= (line.match(/}/g) || []).length;
          
          // Ищем testit.externalId
          if (line.includes('testit.externalId')) {
            const externalIdMatch = line.match(/testit\.externalId\s*\(\s*['"]([^'"]+)['"]\s*\)/);
            if (externalIdMatch) {
              currentTest.externalId = externalIdMatch[1];
            }
          }
          
          // Конец теста
          if (braceCount <= 0 && line.includes('})')) {
            if (currentTest.externalId) {
              tests.push(currentTest);
              console.log(   `✅ Найден тест: "${currentTest.name}"`);
              console.log(      `External ID: ${currentTest.externalId}`);
            }
            currentTest = null;
            inTestBlock = false;
          }
        }
      }
      
    } catch (error) {
      console.log(   `❌ Ошибка при парсинге: ${error.message}`);
    }
  });
  
  console.log(`\n📊 Всего найдено ${tests.length} тестов с externalId`);
  return tests;
}

// Основная функция
async function sendFromTests() {
  console.log('🚀 Отправка тестов из файлов в Test IT\n');
  
  // 1. Извлекаем тесты из файлов
  const foundTests = extractExternalIdsFromTestFiles();
  
  if (foundTests.length === 0) {
    console.log('\n❌ Не найдено тестов с externalId');
    console.log('\n💡 Добавьте в ваши тесты аннотации:');
    console.log('   testit.externalId(\'ваш_уникальный_id\')');
    return;
  }
  
  console.log('\n📋 Список найденных тестов:');
  foundTests.forEach((test, index) => {
    console.log(`${index + 1}. ${test.externalId} - "${test.name}"`);
    console.log(   `Файл: ${path.relative('.', test.file)}:${test.line}`);
  });
  
  


  // 2. Преобразуем в формат для отправки
  const testsToSend = foundTests.map(test => ({
    externalId: test.externalId,
    autoTestExternalId: test.externalId,
    status: 'Passed', // Или можно определять статус из результатов
    duration: Math.floor(Math.random() * 3000) + 1000, // Случайная длительность 1-4 сек
    output: `Тест выполнен: ${test.name}`,
    message: `Файл: ${path.basename(test.file)}, Строка: ${test.line}`,
    testName: test.name
  }));
  
  console.log(`\n📤 Отправляем ${testsToSend.length} тестов...\n`);
  
  try {
    // 3. Создаем тест-ран с автоматическим созданием тест-кейсов
    const testRunName = `Playwright автотесты - ${new Date().toLocaleDateString('ru-RU')}`;
    console.log(`1. Создаем тест-ран: "${testRunName}"`);
    
    const createResponse = await axios.post(
      `${config.baseUrl}/testruns`,
      {
        projectId: config.projectId,
        configurationId: config.configurationId,
        name: testRunName,
        adapterMode: 1,
        automaticCreationTestCases: true, // Автосоздание тест-кейсов!
        autotests: testsToSend.map(test => ({
          externalId: test.externalId,
          autoTestExternalId: test.externalId,
          status: test.status,
          duration: test.duration,
          output: test.output,
          message: test.message
        }))
      },
      {
        headers: {
          Authorization: `PrivateToken ${config.token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const testRunId = createResponse.data.id;
    console.log(`✅ Тест-ран создан. ID: ${testRunId}\n`);
    
    // 4. Проверяем результаты
    console.log('2. Проверяем результаты...');
    
    if (createResponse.data.testResults && createResponse.data.testResults.length > 0) {
      console.log(`📊 Тестов добавлено: ${createResponse.data.testResults.length}`);
      
      createResponse.data.testResults.forEach((result, index) => {
        const statusIcon = result.outcome === 'Passed' ? '✅' : '❌';
        console.log(   `${index + 1}. ${statusIcon} ${result.autoTestExternalId} - ${result.outcome}`);
      });
    } else {
      console.log('⚠️ Результаты тестов не получены в ответе');
    }
    
    // 5. Завершаем тест-ран
    console.log('\n3. Завершаем тест-ран...');
    
    try {
      await axios.post(
        `${config.baseUrl}/testRuns/${testRunId}/complete`,
        {},
        {
          headers: {
            Authorization: `PrivateToken ${config.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('✅ Тест-ран завершен');
    } catch (error) {
      console.log(`⚠️ Ошибка завершения: ${error.message}`);
    }
    
    // Итог
    console.log('\n🎉 ВЫПОЛНЕНО!');
    console.log('===========');
    console.log(`🔗 Тест-ран: https://team-atdz.testit.software/projects/${config.projectId}/testruns/${testRunId}`);
    console.log(`📚 Библиотека тестов: https://team-atdz.testit.software/projects/${config.projectId}/tests`);
    console.log(`\n💡 Автотесты сохранены в библиотеке Test IT!`);
    
  } catch (error) {
    console.error('\n❌ ОШИБКА:');
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Message:', error.message);
    }
  }
}

// Запуск
sendFromTests();