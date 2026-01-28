import fs from "fs";
import { TESTIT } from "./config.js";
import { testCases } from "./testCases.js";

// Читаем JSON-репорт Playwright
const report = JSON.parse(
    fs.readFileSync("playwright-report/report.json", "utf-8")
);

async function createAutotest(test) {
    if (!test?.title) {
        console.warn("⚠️ Пропущен тест без title", test);
        return;
    }

    // externalId берём до |
    const externalId = test.title.split("|")[0].trim();

    const response = await fetch(
        `${TESTIT.baseUrl}/api/v2/projects/${TESTIT.projectId}/autotests`,
        {
            method: "POST",
            headers: {
                Authorization: `PrivateToken ${TESTIT.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                externalId,
                name: test.title,
                classname: test.file,
                workItemIds: [testCases[externalId]],
                labels: [
                    { name: "framework", value: "Playwright" },
                    { name: "module", value: "Comport" }
                ]
            })
        }
    );

    if (!response.ok) {
        console.error(
            `❌ Ошибка создания автотеста ${externalId}`,
            await response.text()
        );
    } else {
        console.log(`✅ Автотест создан: ${externalId}`);
    }
}

(async () => {
    for (const rootSuite of report.suites ?? []) {
        for (const suite of rootSuite.suites ?? []) {
            for (const spec of suite.specs ?? []) {
                const test = {
                    title: spec.title,
                    file: spec.file
                };

                await createAutotest(test);
            }
        }
    }
})();
