const { ipcRenderer } = require('electron');

/**
 * Event of changing value
 * @param {Element} target - element with value as a child
 */
function onChange(target)
{
    ipcRenderer.send('value', target.textContent);
}

/**
 * Wait for element with value appear on the page  
 * Checking element appearance 100 times with 1s timeout
 */
function waitForTarget()
{
    return new Promise((resolve, reject) => 
    {
        function checkTarget(ticks)
        {
            var target = document.querySelector('[title="On-Access Scan"] .count');

            if (target)
            {
                resolve(target);
            }
            else if (ticks > 100)
            {
                reject({ type: 'TIMEOUT' });
            }
            else
            {
                ticks ++;
                setTimeout(checkTarget(ticks), 1000);
            }
        }

        checkTarget(0);
    });
}

/**
 * Runs when process loaded
 */
process.once('loaded', () =>
{
    window.onload = () =>
    {
        console.log('loaded');
        waitForTarget()
            .then((target) => 
            {
                onChange = onChange.bind(null, target);

                var observer = new MutationObserver(onChange);
                observer.observe(target, { childList: true });
            });
    };
});
