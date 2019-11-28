import './Line.css';

/**
 * Draws plot
 * @param {Element} parent - container for block
 * @param {Object}  params - block settings
 * @param {Number}  params.width  - SVG canvas width
 * @param {Number}  params.height - SVG canvas height
 * @param {Number}  params.xScale - pixels in one x-axis step
 */
function Line(parent, { legendPaddings, ...params })
{
    /**
     * DOM tree of the block
     * @type {Object}
     */
    var DOM =
        {
            line: null,
        };

    /**
     * CSS classes of the block
     * @type {Object}
     */
    var CSS =
        {
            line: 'plot__line',
        }
    
    /**
     * Amount of pixels in one x-step
     * @type {Number}
     * @default 60
     */
    var xScale = params.xScale;

    /**
     * Amount of pixels in one y-step
     * @type {Number}
     * @default 60
     */
    var yScale = params.yScale;

    /**
     * Dots currently displayed at the graph
     * @type {Array[Number]}
     */
    var dots = [];

    /**
     * Amount of displayed dots
     * @type {Number}
     * @default 1000
     */
    var dotsMaxAmount = params.maxDotsAmount || 10;

    /**
     * Calls when plot line was changed
     * @type {Function}
     */
    this.onChange = () => {};

    /**
     * Founds index of last number of given dot in path `d` attribute 
     * @param  {String} path - string in path `d` attrubute
     * @param  {Number} dotIndex - index of dot in dots array
     * @return {Number} - index of dot in path `d` or length of path if not found
     */
    function getEndDotPosition(path, dotIndex)
    {
        var pathCounter = path.indexOf('l'),
            dotCounter = 0;

        while (pathCounter != -1)
        {
            dotCounter ++;

            if (dotCounter === dotIndex)
            {
                return pathCounter;
            }

            pathCounter = path.indexOf('l', pathCounter + 1);
        }

        return path.length;
    }

    /**
     * Gets width of plot in `px`
     * @return {Number}
     */
    this.width = function()
    {
        return DOM.line.getBoundingClientRect().width;
    }
    
    /**
     * Adds dot or dots array and triggers redraw
     * @param {Array[Object]}
     */
    this.pushDots = function(newDots)
    {
        var path = DOM.line.getAttribute('d');
        dots = dots.concat(newDots);

        /**
         * Reducing dots amount in dots array and on screen
         * if theirs amount more then `maxDotsAmount` value
         */
        if (dots.length > dotsMaxAmount)
        {
            var undueDots = dots.length - dotsMaxAmount;
            dots.splice(0, undueDots);

            if (path.length != 0)
            {
                var firstY = params.height - legendPaddings.y - dots[0].y * yScale;
                path = `M0,${firstY}${path.slice(getEndDotPosition(path, undueDots + 1))}`;
            }

            if (newDots.length > dotsMaxAmount)
            {
                newDots.splice(0, newDots.length - dotsMaxAmount);
            }
        }

        this.onChange(dots[0]);

        /**
         * Making first dot to be point
         * not a line segment
         */
        var newDotsStart = dots.length - newDots.length;
        if (newDotsStart == 0)
        {
            newDotsStart ++;
            path += `M0,${params.height - legendPaddings.y - dots[0].y * yScale}`;
        }

        /**
         * Drawing new dots on screen
         */
        for (var counter = newDotsStart; counter < dots.length; counter ++)
        {
            var dot = 
                {
                    x: (dots[counter].x - dots[counter - 1].x) * xScale,
                    y: (dots[counter - 1].y - dots[counter].y) * yScale,
                };

            path += `l${dot.x},${dot.y}`;
        }

        DOM.line.setAttribute('d', path);
    }

    DOM.line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    DOM.line.classList.add(CSS.line);
    DOM.line.setAttribute('d', '');
    parent.appendChild(DOM.line);
}

export default Line;
