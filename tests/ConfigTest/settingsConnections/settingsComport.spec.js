const path = require('path');
const { test, expect } = require('@playwright/test');
const ConfigPage = require(path.join(process.cwd(), 'pages', 'Configuration', 'ConfigPage.js'));

test('Фокус в поле название элемента "Последовательный порт"', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();

    await expect(field).toBeFocused();
});

test('Максимальная длина(30 символов), поле название элемента "Последовательный порт"', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = '123456789012345678901234567890';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    const error = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('123456789012345678901234567890');
    expect(error).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввод больше максимальной длины (31 символ), поле название элемента "Последовательный порт"', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = '1234567890123456789012345678901';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    
    const error = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('1234567890123456789012345678901');
    expect(error).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввод минимальной длины (1 символ), поле название элемента "Последовательный порт"', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = '1';
    await field.fill(inputVal);
    await field.press('Enter');
    const val = await field.inputValue();
    
    const error = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('1');
    expect(error).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввод недопустимых символов, поле название элемента "Последовательный порт"', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = 'ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю-.,_=+\/|":;><?!№%?*()`~@#$&';
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбю-.,_=+\/|":;><?!№%?*()`~@#$&');
    expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Оставить поле пустым, поле название элемента "Последовательный порт"', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('');
    await field.press('Enter');
    
    const val = await field.inputValue();
    const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('');
    expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввести сначала цифру, потом букву, поле название элемента "Последовательный порт"', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
    const field = page.getByRole('textbox', { name: 'Название' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = '1t';
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('1t');
    expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввести название интерфейса, потом букву, поле интерфейс элемента "Последовательный порт"', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
    const field = page.getByRole('textbox', { name: 'Интерфейс info' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = 'ttyS1';
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    await expect(val).toBe('ttyS1');
});

test('Оставить поле пустым, потом букву, поле интерфейс элемента "Последовательный порт"', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
    const field = page.getByRole('textbox', { name: 'Интерфейс info' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('');
    await field.press('Enter');
    
    const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    expect(val).toBe('');
    expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввод только чисел, потом букву, поле интерфейс элемента "Последовательный порт"', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
    const field = page.getByRole('textbox', { name: 'Интерфейс info' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = '1234567';
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    await expect(val).toBe('1234567');
    await expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввод недопустимых символов, поле интерфейс элемента "Последовательный порт"', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
    const field = page.getByRole('textbox', { name: 'Интерфейс info' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ~!@#$%^&*()-_=+[{]}\\|;:",<.>/?';
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    await expect(val).toBe('абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ~!@#$%^&*()-_=+[{]}\\|;:",<.>/?');
    await expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Ввод через пробел, поле интерфейс элемента "Последовательный порт"', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // контекстное меню прием
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
    const field = page.getByRole('textbox', { name: 'Интерфейс info' });
    await field.focus();

    await expect(field).toBeFocused();

    await field.fill('');
    const inputVal = 'tty S0';
    await field.fill(inputVal);
    await field.press('Enter');
    
    const val = await field.inputValue();
    const errIcon = page.locator('svg').filter({ hasText: 'Имя узла должно начинаться с буквы или подчеркивания и содержать только латински' }).nth(1);
    await expect(val).toBe('tty S0');
    await expect(errIcon).toBeVisible();
    const buttonError = page.getByRole('button', { name: 'Показать ошибки' });
    await expect(buttonError).toBeVisible();
});

test('Выбрать 19200 в выпадающем списке "Скорость"', async ({ page }) => {
  const config = new ConfigPage(page);

  await config.goto();
  await config.contextMenuReception();    // открыть контекстное меню "Прием"
  await config.clickComport();

  await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();

  const item = page.getByRole('combobox', { name: 'Скорость' });

  await item.click();

  const op19200 = page.getByRole('option', { name: '19200' });
  await expect(op19200).toBeVisible(); 
  await op19200.click();
  await expect(page.getByRole('listbox', { name: 'Скорость' })).toBeHidden();
  // 1) Если combobox — input/textarea с value:
  //await expect(item).toHaveValue('19200');

  // 2) Или если текст выбранного значения показывается внутри триггера:
  await expect(item).toHaveText('19200');

  // 3) Если список закрывается после выбора, можно дополнительно проверить невидимость:
  //await expect(item).toBeHidden();
  await item.click();
  await expect(page.locator('.chakra-select__itemIndicator > .css-s3mb0o').first()).toBeVisible();;
});

test('Выбрать 38400 в выпадающем списке "Скорость"', async ({ page }) => {
  const config = new ConfigPage(page);

  await config.goto();
  await config.contextMenuReception();    // открыть контекстное меню "Прием"
  await config.clickComport();

  await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();

  const item = page.getByRole('combobox', { name: 'Скорость' });

  await item.click();

  const op38400 = page.getByRole('option', { name: '38400' });
  await expect(op38400).toBeVisible(); 
  await op38400.click();
  await expect(page.getByRole('listbox', { name: 'Скорость' })).toBeHidden();

  await expect(item).toHaveText('38400');
  await item.click();
  await expect(page.locator('[id="select::r19::option:38400"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();;
});

test('Выбрать 57600 в выпадающем списке "Скорость"', async ({ page }) => {
  const config = new ConfigPage(page);

  await config.goto();
  await config.contextMenuReception();    // открыть контекстное меню "Прием"
  await config.clickComport();

  await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();

  const item = page.getByRole('combobox', { name: 'Скорость' });

  await item.click();

  const op57600 = page.getByRole('option', { name: '57600' });
  await expect(op57600).toBeVisible(); 
  await op57600.click();
  await expect(page.getByRole('listbox', { name: 'Скорость' })).toBeHidden();

  await expect(item).toHaveText('57600');
  await item.click();
  await expect(page.locator('[id="select::r19::option:57600"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('Выбрать 115200 в выпадающем списке "Скорость"', async ({ page }) => {
  const config = new ConfigPage(page);

  await config.goto();
  await config.contextMenuReception();    // открыть контекстное меню "Прием"
  await config.clickComport();

  await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();

  const item = page.getByRole('combobox', { name: 'Скорость' });

  await item.click();

  const op115200 = page.getByRole('option', { name: '115200' });
  await expect(op115200).toBeVisible(); 
  await op115200.click();
  await expect(page.getByRole('listbox', { name: 'Скорость' })).toBeHidden();

  await expect(item).toHaveText('115200');
  await item.click();
  await expect(page.locator('[id="select::r19::option:115200"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('Выбрать 230400 в выпадающем списке "Скорость"', async ({ page }) => {
  const config = new ConfigPage(page);

  await config.goto();
  await config.contextMenuReception();    // открыть контекстное меню "Прием"
  await config.clickComport();

  await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();

  const item = page.getByRole('combobox', { name: 'Скорость' });

  await item.click();

  const op230400 = page.getByRole('option', { name: '230400' });
  await expect(op230400).toBeVisible(); 
  await op230400.click();
  await expect(page.getByRole('listbox', { name: 'Скорость' })).toBeHidden();
 
  await expect(item).toHaveText('230400');
  await item.click();
  await expect(page.locator('[id="select::r19::option:230400"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('Выпадающий список "Стоп-бит" 1', async ({ page }) => {
  const config = new ConfigPage(page);

  await config.goto();
  await config.contextMenuReception();    // открыть контекстное меню "Прием"
  await config.clickComport();

  await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();

  const item = page.getByRole('combobox', { name: 'Стоп-бит' });

  await item.click();

  const op1 = page.getByRole('option', { name: '1' });
  await expect(op1).toBeVisible(); 
  await op1.click();
  await expect(page.getByRole('listbox', { name: 'Стоп-бит' })).toBeHidden();
 
  await expect(item).toHaveText('1');
  await item.click();
  await expect(page.locator('.chakra-select__itemIndicator > .css-s3mb0o').first()).toBeVisible();;
});

test('Выпадающий список "Стоп-бит" 2', async ({ page }) => {
  const config = new ConfigPage(page);

  await config.goto();
  await config.contextMenuReception();    // открыть контекстное меню "Прием"
  await config.clickComport();

  await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();

  const item = page.getByRole('combobox', { name: 'Стоп-бит' });

  await item.click();

  const op2 = page.getByRole('option', { name: '2' });
  await expect(op2).toBeVisible(); 
  await op2.click();
  await expect(page.getByRole('listbox', { name: 'Стоп-бит' })).toBeHidden();

  await expect(item).toHaveText('2');
  await item.click();
  await expect(page.locator('[id="select::r1b::option:2"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('Выпадающий список "Паритет" (нет)', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();    // открыть контекстное меню "Прием"
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();

    const item = page.getByRole('combobox', { name: 'Паритет' });

    await item.click();

    const opNo = page.getByRole('option', { name: 'Нет' });
    //await expect(opNo).toBeVisible(); 
    await opNo.click();
    await expect(page.getByRole('listbox', { name: 'Паритет' })).toBeHidden();

    await expect(item).toHaveText('Нет');
    await item.click();
    await expect(page.locator('[id="select::r1b::option:2"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('Выпадающий список "Паритет" (бит четности)', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
    
    const item = page.getByRole('combobox', { name: 'Паритет' });

    await item.click();

    const op1 = page.getByRole('option', { name: 'Бит четности' });
    await expect(op1).toBeVisible();
    await op1.click();
    await page.getByRole('listbox', { name: 'Паритет' }).toBeHidden();

    await expect(item).toHaveText('Бит четности');
    await item.click();
    await expect(page.locator('[id="select::r1d::option:even"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
});

test('Выпадающий список "Паритет" (бит нечетности)', async ({ page }) => {
    const config = new ConfigPage(page);

    await config.goto();
    await config.contextMenuReception();
    await config.clickComport();

    await page.locator('div').filter({ hasText: /^COMttyS0115200comport$/ }).nth(1).click();
    
    const item = page.getByRole('combobox', { name: 'Паритет' });

    await item.click();

    const op1 = page.getByRole('option', { name: 'Бит нечетности' });
    await expect(op1).toBeVisible();
    await op1.click();
    await page.getByRole('listbox', { name: 'Паритет' }).toBeHidden();

    await expect(item).toHaveText('Бит нечетности');
    await item.click();
    await expect(page.locator('[id="select::r1d::option:odd"] > .chakra-select__itemIndicator > .css-s3mb0o')).toBeVisible();
})