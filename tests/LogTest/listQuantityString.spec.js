const path = require('path');
const { test, expect } = require('@playwright/test');
const LoggingPage = require(path.join(process.cwd(), 'pages', 'Logging', 'LoggingPage.js'));

test.describe('Навигация', () => {
    test.beforeEach(async ({page}) => {
        const log = new LoggingPage(page)
        await log.goto()

    });
test('Выпадающий список "Количество отображаемых строк 100"', async({page}) => {
    
    const list = page.getByRole('listbox', { name: 'Количество отображаемых строк:' })
    const box = page.getByRole('combobox', { name: 'Количество отображаемых строк:' })
    await box.click()
    await expect(list).toBeVisible()
    await expect(box).toBeVisible()
    await page.getByRole('option', { name: '100', exact: true }).click();
    await expect(box).toHaveText('100')
    await expect(list).toBeHidden()
})

test('Выпадающий список "Количество отображаемых строк 250"', async({page}) => {
   

    const list = page.getByRole('listbox', { name: 'Количество отображаемых строк:' })
    const box = page.getByRole('combobox', { name: 'Количество отображаемых строк:' })
    await box.click()
    await expect(list).toBeVisible()
    await expect(box).toBeVisible()
    await page.getByRole('option', { name: '250', exact: true }).click();
    await expect(box).toHaveText('250')
    await expect(list).toBeHidden()
})


test('Выпадающий список "Количество отображаемых строк 500"', async({page}) => {


    const list = page.getByRole('listbox', { name: 'Количество отображаемых строк:' })
    const box = page.getByRole('combobox', { name: 'Количество отображаемых строк:' })
    await box.click()
    await expect(list).toBeVisible()
    await expect(box).toBeVisible()
    await page.getByRole('option', { name: '500', exact: true }).click();
    await expect(box).toHaveText('500')
    await expect(list).toBeHidden()
})

test('Выпадающий список "Количество отображаемых строк 1000"', async({page}) => {
    const list = page.getByRole('listbox', { name: 'Количество отображаемых строк:' })
    const box = page.getByRole('combobox', { name: 'Количество отображаемых строк:' })
    await box.click()
    await expect(list).toBeVisible()
    await expect(box).toBeVisible()
    await page.getByRole('option', { name: '1000', exact: true }).click();
    await expect(box).toHaveText('1000')
    await expect(list).toBeHidden()
})

test('Выпадающий список "Количество отображаемых строк 2500"', async({page}) => {

    const list = page.getByRole('listbox', { name: 'Количество отображаемых строк:' })
    const box = page.getByRole('combobox', { name: 'Количество отображаемых строк:' })
    await box.click()
    await expect(list).toBeVisible()
    await expect(box).toBeVisible()
    await page.getByRole('option', { name: '2500', exact: true }).click();
    await expect(box).toHaveText('2500')
    await expect(list).toBeHidden()
})

test('Выпадающий список "Количество отображаемых строк 5000"', async({page}) => {

    const list = page.getByRole('listbox', { name: 'Количество отображаемых строк:' })
    const box = page.getByRole('combobox', { name: 'Количество отображаемых строк:' })
    await box.click()
    await expect(list).toBeVisible()
    await expect(box).toBeVisible()
    await page.getByRole('option', { name: '5000', exact: true }).click();
    await expect(box).toHaveText('5000')
    await expect(list).toBeHidden()
})
})