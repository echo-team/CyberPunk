import './Axes.css';

/**
 * Draws plot axes
 * @param {Element} parent - container for block
 * @param {Object}  params - block settings
 * @param {Number}  params.width  - SVG canvas width
 * @param {Number}  params.height - SVG canvas height
 * @param {Number}  params.xScale - pixels in one x-axis step
 * @param {Object}  params.legendPaddings - object with `x` and `y` fields, free space to draw numbers
 */
function Axes(parent, { legendPaddings, arrowLength, ...params })
{
    /**
     * DOM tree of the block
     * @type {Object}
     */
    var DOM =
        {
            axes: null,
        };

    /**
     * CSS classes of the block
     * @type {Object}
     */
    var CSS =
        {
            axes: 'plot__axes',
        }

    var path = `M${legendPaddings.x - arrowLength.b},${arrowLength.a}L${legendPaddings.x},0` + 
            `L${legendPaddings.x + arrowLength.b},${arrowLength.a}` + `M${legendPaddings.x},0` +
            `V${params.height - legendPaddings.y}` + `H${params.width}` +
            `M${params.width - arrowLength.a},${params.height - legendPaddings.y - arrowLength.b}` + 
            `L${params.width},${params.height - legendPaddings.y}` +
            `L${params.width - arrowLength.a},${params.height - legendPaddings.y + arrowLength.b}`;
        
    DOM.axes = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    DOM.axes.classList.add(CSS.axes);
    DOM.axes.setAttribute('d', path);
    parent.appendChild(DOM.axes);
}

export default Axes;
