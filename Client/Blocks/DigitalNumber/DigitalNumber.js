import Digit from './Digit/Digit';

/**
 * Displays number just like at digital clocks
 * @param {Element} parent - where to place block
 * @param {Object}  params - block settings
 * @param {Number}  params.category - min number of digits
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
            digits: [],
        };
    
    /**
     * CSS classes of the block
     * @type {Object}
     */
    var CSS =
        {
            container: 'digital-number',
        };
    
    /**
     * Minimal amount of digits in number
     * @type {Number}
     */
    var category = params.category || 1;

    /**
     * Draws number
     * @param {Number} number
     */
    this.display = function(number)
    {
        number = String(number).split('');

        if (number.length > category && number.length > DOM.digits.length)
        {
            let additionalDigits = number.length - DOM.digits.length;

            for (let index = 0; index < additionalDigits; index ++)
            {
                DOM.digits.push(new Digit(DOM.container));
            }
        }
        else
        {
            let diff = category > number.length ? category : number.length,
                unnesessaryDigits = DOM.digits.length - diff;

            for (let index = 0; index < unnesessaryDigits; index ++)
            {
                let destructing = DOM.digits.pop();
                destructing.destroy();
            }

            for (let index = 0; index < DOM.digits.length - number.length; index ++)
            {
                number.splice(0, 0, undefined);
            }
        }

        for (let index = 0; index < number.length; index ++)
        {
            DOM.digits[DOM.digits.length - 1 - index].display(Number(number[number.length - index - 1]));
        }
    }

    DOM.container = document.createElement('div');
    DOM.container.classList.add(CSS.container);
    parent.appendChild(DOM.container);

    for (let index = 0; index < category; index ++)
    {
        DOM.digits.push(new Digit(DOM.container));
    }

    if (params.number)
    {
        this.display(params.number);
    }
}

export default DigitalNumber;
