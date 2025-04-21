

export const verifyMultipleClickOnElement = async (element, timeout = 3000) => {
    for (let i = 0; i < 10; i++) {
        await element.waitForClickable({ timeout });
        await element.click();
    }
};

export const waitforElement= async(condition,errorMsg='condition not met in time', timeout=6000) =>
{
    await browser.waitUntil(
        async() =>{
            try{
                const result = await condition();
                console.log('Condition result:', result);
                return result;
            }catch(err){
                console.warn('Condition threw error:', err.message);
                return false;

            }
         },
    {
       timeout,
        timeoutmsg:errorMsg
    }

)


}

