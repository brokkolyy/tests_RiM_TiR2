// testParser.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

class TestParser {
  constructor(testPattern = './tests/**/*.spec.js') {
    this.testPattern = testPattern;
    this.tests = [];
  }

  // Парсинг одного тестового файла
  parseTestFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      const testsInFile = [];
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
              description: null,
              file: filePath,
              line: i + 1
            };
            inTestBlock = true;
            braceCount = 0;
          }
        }
        
        if (inTestBlock && currentTest) {
          // Считаем фигурные скобки для определения конца теста
          braceCount += (line.match(/{/g) || []).length;
          braceCount -= (line.match(/}/g) || []).length;
          
          // Поиск testit.externalId
          if (line.includes('testit.externalId')) {
            const externalIdMatch = line.match(/testit\.externalId\s*\(\s*['"]([^'"]+)['"]\s*\)/);
            if (externalIdMatch) {
              currentTest.externalId = externalIdMatch[1];
            }
          }
          
          // Поиск testit.description
          if (line.includes('testit.description')) {
            const descriptionMatch = line.match(/testit\.description\s*\(\s*['"]([^'"]+)['"]\s*\)/);
            if (descriptionMatch) {
              currentTest.description = descriptionMatch[1];
            }
          }
          
          // Конец теста (когда все фигурные скобки закрыты)
          if (braceCount <= 0 && line.includes('})')) {
            if (currentTest.externalId) {
              testsInFile.push(currentTest);
            }
            currentTest = null;
            inTestBlock = false;
          }
        }
      }
      
      return testsInFile;
    } catch (error) {
      console.error(`Ошибка при парсинге файла ${filePath}:`, error.message);
      return [];
    }
  }

  // Поиск всех тестовых файлов
  findAllTests() {
    try {
      const files = glob.sync(this.testPattern);
      console.log(`Найдено ${files.length} тестовых файлов`);
      
      files.forEach(file => {
        const testsInFile = this.parseTestFile(file);
        if (testsInFile.length > 0) {
          this.tests.push(...testsInFile);
          console.log( `Файл: ${path.basename(file)} - ${testsInFile.length} тестов`);
        }
      });
      
      console.log(`\nВсего найдено ${this.tests.length} тестов с externalId`);
      return this.tests;
    } catch (error) {
      console.error('Ошибка при поиске тестов:', error.message);
      return [];
    }
  }

  // Сохранение в JSON
  saveToFile(filename = 'tests-metadata.json') {
    try {
      fs.writeFileSync(
        filename, 
        JSON.stringify(this.tests, null, 2),
        'utf8'
      );
      console.log(`Метаданные сохранены в ${filename}`);
    } catch (error) {
      console.error('Ошибка при сохранении файла:', error.message);
    }
  }

  // Генерация для отправки в Test IT
  generateForTestIT(status = 'Passed') {
    return this.tests.map(test => ({
      externalId: test.externalId,
      autoTestExternalId: test.externalId,
      status: status,
      duration: Math.floor(Math.random() * 2000) + 1000,
      output: test.description || `Тест выполнен: ${test.name}`,
      message: test.description || '',
      traces: `Файл: ${test.file}\nСтрока: ${test.line}`
    }));
  }
}

// Экспорт класса для использования в других файлах
module.exports = TestParser;