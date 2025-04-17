

export const verifyMultipleClickOnElement = async (element, timeout = 3000) => {
    for (let i = 0; i < 10; i++) {
        await element.waitForClickable({ timeout });
        await element.click();
    }
};

