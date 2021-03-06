const { ipcRenderer } = require('electron');

/**
 * Event of time interval for value derivative passed  
 * Sends new value appeared by this interval
 * @param {Element} target - element with value as a child
 * @param {Number}  time   - when value was recorded
 */
function onTime(target, time)
{
    ipcRenderer.send('value', String(Math.floor(time / 1000)) + '.' + target.textContent);
}

/**
 * Wait for element with value appear on the page  
 * Checking element appearance 100 times with 1s timeout
 * @return {Promise}
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
 * Runs callback every 5sec, syncronyzed with day time
 * @param {Function} callback
 */
function waitForTime(callback)
{
    var currentTime = Date.now(),
        time = 5000 - currentTime % 5000;
    setTimeout(() =>
    {
        callback(currentTime + 5000);
        waitForTime(callback);
    }, time);
}

/**
 * Runs when process loaded
 */
process.once('loaded', () =>
{
    window.onload = () =>
    {
        waitForTarget()
            .then((target) =>
            {
                onTime = onTime.bind(null, target);
                waitForTime(onTime);
            })
    };
});
