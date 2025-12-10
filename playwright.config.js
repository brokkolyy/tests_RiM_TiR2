const { defineConfig, devices } = require('@playwright/test');


module.exports = defineConfig({
    testDir: '.',

    testMatch:[
        'tests/**/*.spec.js',
        'tests/**/*.spec.ts',
        'other-tests/**/*.spec.js',
        'other-tests/**/*.spec.ts'
    ],

    projects: [
        {
            name: 'Chromium',
            use: { browserName: 'chromium' }
        },
        /*
        {
            name: 'Opera',
            use: { browserName: 'chromium' }
        },
        {
            name: 'Firefox',
            use: { browserName: 'firefox' }
        },
        {
            name: 'WebKit',
            use: { browserName: 'webkit' }
        }
            */
    ]
});