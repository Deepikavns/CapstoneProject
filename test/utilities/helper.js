

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

export const hoveroverEffect = async (element1, element2) => {
    const beforeHover = await element1.getCSSProperty('cursor');
    const initialColor = await element2.getCSSProperty('color');

    await element2.moveTo();

    const hoveredColor = await element2.getCSSProperty('color');
    const afterHover = await element2.getCSSProperty('cursor');
    return { beforeHover, afterHover, initialColor, hoveredColor };


}
