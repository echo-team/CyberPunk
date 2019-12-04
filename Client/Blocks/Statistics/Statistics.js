import './Statistics.css';

/**
 * Block for displaying statistics
 * @param {Element} parent - container for the block
 * @param {Object}  params - block settings
 * @param {Number}  params.variables - list of displaying variables
 * @param {Number}  params.variables.name  - variable name
 * @param {Number}  params.variables.value - variable value
 */
function Statistics(parent, params)
{
    /**
     * Elements of the block
     * @type {Object}
     */
    var DOM =
        {
            container: null,
            variables: {},
        };
    
    /**
     * CSS classes of the block
     * @type {Object}
     */
    var CSS =
        {
            container: 'statistics__container',
            variable: 'statistics__variable',
            header: 'statistics__header',
            value: 'statistics__value',
        };

    /**
     * Creates new value in list
     * @param {String} name  - variable name
     */
    function createVariable(name)
    {
        var variable = document.createElement('div');
        variable.classList.add(CSS.variable);
        
        var header = document.createElement('h4');
        header.classList.add(CSS.header);
        header.textContent = name;
        variable.appendChild(header);

        var value = document.createElement('span');
        value.classList.add(CSS.value);
        variable.appendChild(value);

        DOM.container.appendChild(variable);
        DOM.variables[name] = [header, value];
    }

    /**
     * Sets/updates value of given variable
     * @param {Object} DOM   - DOM tree of the class
     * @param {String} name  - variable name
     * @param {String} value - new value
     */
    this.setValue = function(DOM, name, value)
    {
        DOM.variables[name][1].textContent = value;
    }
    
    /**
     * Push new value or changes older one
     * @param {String} name  - variable name
     * @param {String} value - value to display
     */
    this.update = function(name, value)
    {
        if (!DOM.variables[name])
        {
            createVariable(name);
        }

        this.setValue(DOM, name, value);
    }

    DOM.container = document.createElement('div');
    DOM.container.classList.add(CSS.container);
    parent.appendChild(DOM.container);

    if (params.variables)
    {
        params.variables.forEach((variable) =>
        {
            variable.name ? createVariable(variable.name) : null;
            variable.value ? this.setValue(DOM, variable.name, variable.value) : null;
        })
    }
}

export default Statistics;
