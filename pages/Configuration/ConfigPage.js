class ConfigPage {
    constructor(page){
        this.page = page;
        this.comport = this.page.getByRole('menuitem', { name: 'Создать "Comport"' });
        this.gpio = this.page.getByRole('menuitem', { name: 'Создать "GPIO"'});
        this.iec104_C = this.page.getByRole('menuitem', { name: 'Создать "IEC-104 Клиент"'});
        this.iec104_S = this.page.getByRole('menuitem', { name: 'Создать "IEC-104 Сервер"'})
        this.modbusTCP_C = this.page.getByRole('menuitem', { name: 'Создать "Modbus-TCP Клиент"'});
        this.modbusTCP_S = this.page.getByRole('menuitem', { name: 'Создать "Modbus-TCP Сервер"'});
        this.folder = this.page.getByRole('menuitem', { name: 'Создать "Папка"' });

        this.folderVariable = this.page.getByRole('menuitem', { name: 'Создать папку' });
        this.variable_1 = this.page.getByRole('menuitem', { name: 'Создать переменную (1)' });
        this.variable_2 = this.page.getByRole('menuitem', { name: 'Создать переменную (2)'});
        this.variable_3 = this.page.getByRole('menuitem', { name: 'Создать переменную (3)'});
        this.variable_5 = this.page.getByRole('menuitem', { name: 'Создать переменную (5)'});
        this.variable_10 = this.page.getByRole('menuitem', { name: 'Создать переменную (10)'});

        this.buttonConfig = this.page.locator('section').getByRole('button', { name: 'Конфигурация' });
        this.buttonRouter = this.page.getByRole('button', { name: 'Роутер' });

        this.buttonAddConnectionRecep = this.page.locator('[id=":r8:"]'); //прием 
        this.buttonIgnorRecep = this.page.locator('[id="tooltip::rb::trigger"]');
        this.buttonRecep = this.page.locator('[id="tooltip::rc::trigger"]');

        this.buttonAddConnectionBroad = this.page.locator('[id=":rf:"]');  //передача
        this.buttonIgnorBroad = this.page.locator('[id="tooltip::ri::trigger"]');
        this.buttonBroad = this.page.locator('[id="tooltip::rj::trigger"]');

        this.buttonAddVariable = this.page.locator('[id="tooltip::rs:]');  //переменные
        this.buttonAddFolder = this.page.locator('[id="tooltip::rt::trigger"]');
        this.buttonIgnorVar = this.page.locator('[id="tooltip::ru::trigger"]');
        this.buttonVar = this.page.locator('[id="tooltip::rv::trigger"]');

    }

    async goto() {
        await this.page.goto('http://localhost:5173/configuration');
        await this.page.getByRole('button', { name: 'Close' }).click();
    }

    async contextMenuReception(){
        await this.page.locator('div').filter({ hasText: /^Прием$/ }).nth(2).click({button: 'right'});
    }
    async contextMenuBroadcast(){
        await this.page.locator('div').filter({ hasText: /^Передача$/ }).nth(2).click({button: 'right'});
    }
    async contextMenuVariable(){
        await this.page.locator('div').filter({ hasText: /^Переменные$/ }).nth(2).click({button: 'right'});
    }

    async clickFolder(){ await this.folder.click();}
    async clickComport(){ await this.comport.click();}
    async clickGpio(){ await this.gpio.click();}
    async clickIec104_C(){ await this.iec104_C.click();}
    async clickIec104_S(){ await this.iec104_S.click();}
    async clickModbusTCP_C(){ await this.modbusTCP_C.click();}
    async clickModbusTCP_S(){ await this.modbusTCP_S.click();}

    async clickVariable_1(){ await this.variable_1.click();}
    async clickVariable_2(){ await this.variable_2.click();}
    async clickVariable_3(){ await this.variable_3.click();}
    async clickVariable_5(){ await this.variable_5.click();}
    async clickVariable_10(){ await this.variable_10.click();}
    async clickFolderVatiable(){ await this.folderVariable.click();}

    async buttonConfigClick(){ await this.buttonConfig.click();}
    async buttonRouterClick(){ await this.buttonRouter.click();}

    async clickButtonAddConnRecep(){ await this.buttonAddConnectionRecep.click();}
    async clickButtonIgnorRecep(){ await this.buttonIgnorRecep.click();}
    async clickButtonRecep(){ await this.buttonRecep.click();}
    
    async clickButtonAddConnBroad(){ await this.buttonAddConnectionBroad.click();}
    async clickButtonIgnorBroad(){ await this.buttonIgnorBroad.click();}
    async clickButtonBroad() { await this.buttonBroad.click();}

    async clickButtonAddVar(){ await this.buttonAddVariable.click({force: true});}
    async clickButtonAddFolder(){ await this.buttonAddFolder.click();}
    async clickButtonIgnorVar(){ await this.buttonIgnorVar.click();}
    async clickButtonVar(){ await this.buttonVar.click();}
}

module.exports = ConfigPage;

