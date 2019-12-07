import svg from './Assets/DigitalNumber.svg';
import './DigitalNumber.css'

/**
 * Digital number (as like as one at the digital clock)
 * @param {Element} parent - where to place block
 * @param {Object}  params - block settings
 * @param {Number}  params.number - number to display
 */
function DigitalNumber(parent, params)
{
    /**
     * Elements of the block
     * @type {Object}
     */
    var DOM =
        {
            container: null,
            number: null,
        };
    
    /**
     * CSS classes of the block
     * @type {Object}
     */
    var CSS =
        {
            container: 'digital-number__container',
            number: 'digital-number',
            numbers: 'digital-number__',
        };

    /**
     * Current displayed number
     * @type {Undefined|Number}
     */
    var currentNumber;

    /**
     * Displays passed number
     * @param {Undefined|Number} number
     */
    this.display = function(number)
    {
        if (currentNumber !== undefined)
        {
            DOM.number.classList.remove(CSS.current + currentNumber);
        }

        if (number >= 0 && number <= 9)
        {
            DOM.number.classList.add(CSS.numbers + number);
            currentNumber = number;
            return;
        }

        currentNumber = undefined;
    }

    DOM.container = document.createElement('div');
    DOM.container.classList.add(CSS.container);
    DOM.container.innerHTML = svg;
    parent.appendChild(DOM.container);

    DOM.number = DOM.container.children[0];
    DOM.number.classList.add(CSS.number);

    if (params)
    {
        this.display(params.number);
    }
}

export default DigitalNumber;
