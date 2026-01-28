import fs from "fs";
import { TESTIT } from "./config.js";

const report = JSON.parse(
    fs.readFileSync("playwright-report/report.json", "utf-8")
);

async function createTestRun() {
    const res = await fetch(`${TESTIT.baseUrl}/api/v2/testRuns`, {
        method: "POST",
        headers: {
            "Authorization": `PrivateToken ${TESTIT.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Local Playwright Run",
            projectId: TESTIT.projectId
        })
    });

    return (await res.json()).id;
}

(async () => {
    const testRunId = await createTestRun();
    const results = [];

    for (const suite of report.suites) {
        for (const test of suite.tests) {
            results.push({
                externalId: test.title.split("|")[0].trim(),
                outcome: test.status === "passed" ? "Passed" : "Failed",
                duration: test.duration
            });
        }
    }

    await fetch(
        `${TESTIT.baseUrl}/api/v2/testRuns/${testRunId}/results`,
        {
            method: "POST",
            headers: {
                "Authorization": `PrivateToken ${TESTIT.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(results)
        }
    );

    console.log("✅ Результаты отправлены в Test IT");
})();
