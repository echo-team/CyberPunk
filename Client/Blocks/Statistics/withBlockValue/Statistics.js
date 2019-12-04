/**
 * Adds ability to append elements as a values
 */
function Statistics()
{
    /**
     * Sets/updates value of given variable
     * @param {Object} DOM  - DOM tree of the class
     * @param {String} name - variable name
     * @param {String|Element} value - new value
     */
    this.setValue = function(DOM, name, value)
    {
        if (typeof value === 'string')
        {
            DOM.variables[name][1].textContent = value;
        }
        else
        {
            DOM.variables[name][1].innerHTML = '';
            DOM.variables[name][1].appendChild(value);
        }
    }
}

export default Statistics;
