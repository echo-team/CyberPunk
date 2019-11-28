import './Markers.css';
import Base from '../../Markers/Markers';
import compose from 'compose';

/**
 * Mod which adds time line markers on the x-axis.  
 * Template - `hh:mm:ss`, days will be truncated.
 * @param {Object} params - block settings
 * @param {Number} params.measures - 1 - only hours, 2 - 1 with minutes, 3 - 2 with seconds
 * @param {Number} params.secondsOffset - display seconds on separate line
 */
function Markers(xParent, yParent, params)
{
    /**
     * Template of marker string
     * @type {Array}
     */
    var measures = params.measures || 2;

    /**
     * Display seconds on separate line
     * @type {Boolean}
     */
    var secondsOffset = params.secondsOffset || false;

    /**
     * Text at marker under `index` point on x-axis, 
     * @param  {Number}  index   - index of marker
     * @param  {Element} element - svg text element
     * @return {String}
     */
    this.xText = function(index, element)
    {
        index = index % 86400;

        var time = [Math.floor(index / 3600), 0, index % 60],
            text = '';
        time[1] = Math.floor((index - time[0] * 3600) / 60);

        for (var counter = 0; counter < measures; counter ++)
        {
            var mTime = Math.floor(time[counter] / 10) > 0 ? time[counter] : '0' + String(time[counter]);
            text += `:${mTime}`;
        }

        if (measures === 3 && secondsOffset)
        {
            var seconds = text.substr(text.length - 3),
                other = text.substr(1, text.length - 4);
            
            element.setAttribute('y', element.getAttribute('y') - 13);
            element.textContent = other;
            
            var tSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tSpan.setAttribute('x', element.getAttribute('x'));
            tSpan.setAttribute('dy', '1.1em');
            tSpan.textContent = seconds;
            element.appendChild(tSpan);
        }
        else
        {
            element.textContent = text;
        }
    }
}

export default compose(Base, Markers);
