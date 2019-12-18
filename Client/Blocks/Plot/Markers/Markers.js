import './Markers.css';

/**
 * Draws plot axes
 * @param {Element} xParent - container for x markers
 * @param {Element} xParent - container for y markers
 * @param {Object}  params - block settings
 * @param {Number}  params.width  - SVG canvas width
 * @param {Number}  params.height - SVG canvas height
 * @param {Number}  params.xScale - pixels in one x-axis step
 * @param {Object}  params.legendPaddings - object with `x` and `y` fields, free space to draw numbers
 * @param {Number}  params.markerPaddings - padding between text markers and axes
 */
function Markers(xParent, yParent, { legendPaddings, xScale, arrowLength, ...params})
{
    /**
     * DOM tree of the class
     * @type {Object}
     */
    var DOM = 
        {
            x: null,
            y: null,
        };
    
    /**
     * CSS classes of block
     * @type {Object}
     */
    var CSS =
        {
            textMarker: 'plot__text-marker',
            textMarkerY: 'plot__text-marker-y',
            strokeMarker: 'plot__stroke-marker',
        };
    
    /**
     * Plot offset in px
     * @type {Object}
     */
    var offset = { x: 0, y: 0 };

    /**
     * Size of text at markers
     * @type {Number}
     */
    var textSize = { x: 40, y: 12 };

    /**
     * Padding between text markers and axes
     * @type {Numer}
     */
    var paddings = params.markerPaddings || 15;

    /**
     * Amount of markers in one xStep
     * `5` - amount of symbols in marker text
     * @type {Object}
     */
    var markerScale = { x: getMarkerScale('x', xScale), y: 1 };

    /**
     * Length of stroke marker on axes
     * @type {Number}
     */
    var strokeSize = 5;

    /**
     * Calculates marker scale in dot amount at the axis
     * @param  {Number} step - pixels in one dot
     * @param  {String} axis - `x` or `y`
     * @return {Number}
     */
    function getMarkerScale(axis, step)
    {
        if (textSize[axis] > step)
        {
            return (Math.ceil(textSize[axis] / step));
        }

        return 1 / (Math.floor(step / textSize[axis]));
    }

    /**
     * Text at marker under `index` point on x-axis, 
     * @param  {Number} index - index of marker
     * @return {String}
     */
    this.xText = function(index, element)
    {
        element.textContent = index;
    }

    /**
     * Redraws markers on the x axis
     * @param {Number} width - width of max plot line in `px` at the x axis
     */
    this.xMarkersRedraw = function(width)
    {
        if (DOM.x)
        {
            xParent.removeChild(DOM.x);
        }

        var step = markerScale.x * xScale,
            pxOffset = (offset.x - Math.floor(offset.x / markerScale.x) * markerScale.x) * xScale;
        
        var stroke = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
            path = '';

        DOM.x = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        DOM.x.appendChild(stroke);

        for (var counter = 0; pxOffset + counter * step < width - arrowLength.a; counter ++)
        {
            var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.classList.add(CSS.textMarker);
            text.setAttribute('font-size', textSize.y);
            text.setAttribute('x', counter * step + pxOffset);
            text.setAttribute('y', params.height - legendPaddings.y + paddings + textSize.y);
            this.xText(offset.x + pxOffset / xScale + markerScale.x * counter, text);
            DOM.x.appendChild(text);

            path += `M${counter * step + pxOffset},${params.height - legendPaddings.y - strokeSize / 2}v${strokeSize}`;
        }

        stroke.setAttribute('d', path);
        stroke.classList.add(CSS.strokeMarker);

        xParent.appendChild(DOM.x);
    }

    /**
     * Redraws markers on the y axis
     * @param {Number} yScale - `px` in one dot at the y axis
     */
    this.yMarkersRedraw = function(yScale)
    {
        if (DOM.y)
        {
            yParent.removeChild(DOM.y);
        }

        var stroke = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
            path = '';

        markerScale.y = getMarkerScale('y', yScale);

        var step = markerScale.y * yScale;
        DOM.y = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        DOM.y.appendChild(stroke);

        for (var counter = 0; counter * step < params.height - arrowLength.a - legendPaddings.y; counter ++)
        {
            var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.classList.add(CSS.textMarker, CSS.textMarkerY);
            text.setAttribute('font-size', textSize.y);
            text.setAttribute('x', legendPaddings.x - paddings);
            text.setAttribute('y', params.height - legendPaddings.y - counter * step);
            text.textContent = markerScale.y * counter;
            DOM.y.appendChild(text);

            path += `M${legendPaddings.x - strokeSize / 2},${params.height - legendPaddings.y - step * counter}h${strokeSize}`;
        }

        stroke.setAttribute('d', path);
        stroke.classList.add(CSS.strokeMarker);

        yParent.appendChild(DOM.y);
    }
    
    /**
     * Moves coord markers at `x` axis
     * @param {Number} firstDotX - new start point
     * @param {Number} width - width of max plot line in `px` at the x axis
     */
    this.move = function(firstDotX, width)
    {
        offset.x = firstDotX;
        this.xMarkersRedraw(width);
    }
}

export default Markers;
