class MonitoringPage {
    constructor(page){
        this.page = page;

        this.manual = this.page.getByRole('menuitem', { name: 'Ручной ввод' })
        this.signal = this.page.getByRole('menuitem', { name: 'Редактор сигнала' })
        //ручной ввод
        this.acceptM = this.page.getByRole('button', { name: 'Ручной ввод - Применить' });
        this.cancelM = this.page.getByRole('button', { name: 'Ручной ввод - Отмена' });
        //редактор сигнала
        this.acceptS = this.page.getByRole('button', { name: 'Применить' })


        this.addInf = this.page.getByRole('menuitem', { name: 'Дополнительная информация' })
    }

    async goto() {
        await this.page.goto('http://localhost:5173/monitoring');
    }

    async clickManualEntry() { await this.manual.click()}
    async clickSignalEditor() { await this.signal.click()}

    async clickAcceptS() { await this.acceptS()}

    async clickAcceptM() { await this.acceptM.click()}
    async clickCancelM() { await this.cancelM.click()}

    async clickAdditInf() { await this.addInf.click()}
}

module.exports = MonitoringPage;