class ConfigPageElements {
    constructor (page){
        this.page = page;
        this.modbusRTU_Master = this.page.getByRole('menuitem', { name: 'Создать "Modbus-RTU Master"' }); //прием
        this.tcpBridge_Server = this.page.getByRole('menuitem', { name: 'Создать "TCP-мост (сервер)"' });

        this.functionGroup = this.page.getByRole('menuitem', { name: 'Создать "Функциональная группа"' });

        this.modbusRTU_Slave = this.page.getByRole('menuitem', { name: 'Создать "Modbus-RTU Slave"' }); //передача
        this.tcpBridge_Client = this.page.getByRole('menuitem', { name: 'Создать "TCP-мост (клиент)"' });

        this.object_1 = this.page.getByRole('menuitem', { name: 'Создать "Объект данных" (1)' });
        this.object_2 = this.page.getByRole('menuitem', { name: 'Создать "Объект данных" (2)' });
        this.object_3 = this.page.getByRole('menuitem', { name: 'Создать "Объект данных" (3)' });
        this.object_5 = this.page.getByRole('menuitem', { name: 'Создать "Объект данных" (5)' });
        this.object_10 = this.page.getByRole('menuitem', { name: 'Создать "Объект данных" (10)' });

        this.asdu = this.page.getByRole('menuitem', { name: 'Создать "ASDU"' });
    }

    async clickModbusRTU_Master(){ await this.modbusRTU_Master.click();}     //прием
    async clickTcpBridge_Server(){ await  this.tcpBridge_Server.click();}

    async clickFunctionGroup(){ await this.functionGroup.click();}

    async clickModbusRTU_Slave(){ await this.modbusRTU_Slave.click();}  //передача
    async clickTcpBridge_Client(){ await this.tcpBridge_Client.click();}

    async clickAsdu(){ await this.asdu.click();}

    async clickObject_1(){ await this.object_1.click();}
    async clickObject_2(){ await this.object_2.click();}
    async clickObject_3(){ await this.object_3.click();}
    async clickObject_5(){ await this.object_5.click();}
    async clickObject_10(){ await this.object_10.click();}
}

module.exports = ConfigPageElements;