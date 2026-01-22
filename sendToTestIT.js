const axios = require('axios');

const config = {
  url: 'https://team-atdz.testit.software/api/v2/testruns',
  token: 'WlFZaEFQRG9kTk5QaDhLMDV5',
  projectId: '01970bb3-a82c-75d3-8970-a3477c8f9793',
  configurationId: '01970bb3-a864-74e6-a813-a14b67880298'
};

async function sendToTestIT() {
  try {
    const response = await axios.post(
      config.url,
      {
        projectId: config.projectId,
        configurationId: config.configurationId,
        name: 'Playwright autotests',
        adapterMode: 2,
        autotests: [
          {
            externalId: '9bc4ae00-1ddc-4128-9fa5-4990f93e2d70',
            status: 'Passed',
            duration: 1200,
            output: 'Test passed'
          }
        ]
      },
      {
        headers: {
          Authorization: `PrivateToken ${config.token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Успешно отправлено в Test IT');
    console.log(response.data);
  } catch (error) {
    if (error.response) {
      console.error('❌ Ошибка отправки в Test IT:');
      console.error('Status:', error.response.status);
      console.error(error.response.data);
    } else {
      console.error('❌ Ошибка:', error.message);
    }
  }
}

sendToTestIT();