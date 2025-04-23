

export const verifyMultipleClickOnElement = async (element, timeout = 3000) => {
    for (let i = 0; i < 10; i++) {
        await element.waitForClickable({ timeout });
        await element.click();
    };
}



export async function waitUntil(conditionFn, timeout = 10000, timeoutMsg = 'Condition not met in time') {
    await browser.waitUntil(
        conditionFn,
        {
            timeout,
            timeoutMsg
        }
    );
}
