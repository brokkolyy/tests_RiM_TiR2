class LoggingPage {
    constructor(page){
        this.page = page;
    }
    async goto(){
        await this.page.goto('http://localhost:5173/log');
    }
}
module.exports = LoggingPage;