import svg from '../Assets/DigitalNumber.svg';
import './Digit.css'

/**
 * One digit of DigitalNumber block
 * @param {Element} parent - where to place block
 * @param {Object}  params - block settings
 * @param {Number}  params.digit - digit to display
 */
function Digit(parent, params)
{
    /**
     * Elements of the block
     * @type {Object}
     */
    var DOM =
        {
            container: null,
            digit: null,
        };
    
    /**
     * CSS classes of the block
     * @type {Object}
     */
    var CSS =
        {
            container: 'digital-number__digit-container',
            digit: 'digital-number__digit',
        };

    /**
     * Current displayed digit
     * @type {Undefined|Number}
     */
    var currentDigit;

    /**
     * Displays passed number
     * @param {Undefined|Number} digit
     */
    this.display = function(digit)
    {
        if (currentDigit !== undefined)
        {
            DOM.digit.classList.remove(CSS.digit + '-' + currentDigit);
        }

        if (digit >= 0 && digit <= 9)
        {
            DOM.digit.classList.add(CSS.digit + '-' + digit);
            currentDigit = digit;
            return;
        }

        currentDigit = undefined;
    }

    /**
     * Removes block from dom
     */
    this.destroy = function()
    {
        parent.removeChild(DOM.container);
    }

    DOM.container = document.createElement('div');
    DOM.container.classList.add(CSS.container);
    DOM.container.innerHTML = svg;
    parent.appendChild(DOM.container);

    DOM.digit = DOM.container.children[0];
    DOM.digit.classList.add(CSS.digit);

    if (params)
    {
        this.display(params.digit);
    }
}

export default Digit;
