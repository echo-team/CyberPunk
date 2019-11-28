import './Plot.css';

/**
 * Draws plot
 * @param {Element} parent - container for block
 * @param {Object}  params - block settings
 * @param {Number}  params.width  - SVG canvas width
 * @param {Number}  params.height - SVG canvas height
 * @param {Number}  params.xScale - pixels in one x-axis step
 */
function Plot(parent, params)
{
    /**
     * Elements of the block
     * @type {Object}
     */
    var DOM =
        {
            container: null,
            scroller: null,
            axesCanvas: null,
            axes: null,
            plotCanvas: null,
            plot: null
        };
    
    /**
     * CSS classes of the block
     */
    var CSS =
        {
            container: 'plot__container',
            scroller: 'plot__scroller',
            axesCanvas: 'plot__axes-canvas',
            axes: 'plot__axes',
            plotCanvas: 'plot__plot-canvas',
            plot: 'plot__plot'
        };

    /**
     * Free space to draw numbers arong the plot
     * @type {Object}
     */
    var legendPaddings = { x: 25, y: 25 };

    /**
     * Projection lengths of arrow line to axes
     * @type {Object}
     */
    var arrowLength = {};
    arrowLength.a = Math.min(params.height, params.width) / 20;
    arrowLength.b = arrowLength.a * 0.40;

    /**
     * Amount of pixels in one x-step
     * @type {Number}
     * @default 1
     */
    var xScale = 60;

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
    var dotsMaxAmount = 10;

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
     * Draws axes
     * @param {Element} canvas - SVG canvas to draw axes
     */
    function drawAxes(canvas)
    {
        var path = `M${legendPaddings.x - arrowLength.b},${arrowLength.a}L${legendPaddings.x},0` + 
            `L${legendPaddings.x + arrowLength.b},${arrowLength.a}` + `M${legendPaddings.x},0` +
            `V${params.height - legendPaddings.y}` + `H${params.width}` +
            `M${params.width - arrowLength.a},${params.height - legendPaddings.y - arrowLength.b}` + 
            `L${params.width},${params.height - legendPaddings.y}` +
            `L${params.width - arrowLength.a},${params.height - legendPaddings.y + arrowLength.b}`;
        
        DOM.axes = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        DOM.axes.classList.add(CSS.axes);
        DOM.axes.setAttribute('d', path);
        canvas.appendChild(DOM.axes);
    }
    
    /**
     * Adds dot or dots array and triggers redraw
     * @param {Array[Object]}
     */
    this.pushDots = function(newDots)
    {
        var path = DOM.plot.getAttribute('d');
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
                var firstY = params.height - legendPaddings.y - dots[0].y;
                path = `M0,${firstY}${path.slice(getEndDotPosition(path, undueDots + 1))}`;
            }

            if (newDots.length > dotsMaxAmount)
            {
                newDots.splice(0, newDots.length - dotsMaxAmount);
            }
        }

        /**
         * Making first dot to be point
         * not a line segment
         */
        var newDotsStart = dots.length - newDots.length;
        if (newDotsStart == 0)
        {
            newDotsStart ++;
            path += `M0,${params.height - legendPaddings.y - dots[0].y}`;
        }

        /**
         * Drawing new dots on screen
         */
        for (var counter = newDotsStart; counter < dots.length; counter ++)
        {
            var dot = 
                {
                    x: (dots[counter].x - dots[counter - 1].x) * xScale,
                    y: dots[counter - 1].y - dots[counter].y
                };

            path += `l${dot.x},${dot.y}`;
        }

        DOM.plot.setAttribute('d', path);
    }

    DOM.container = document.createElement('div');
    DOM.container.classList.add(CSS.container);
    parent.appendChild(DOM.container);

    DOM.scroller = document.createElement('div');
    DOM.scroller.classList.add(CSS.scroller);
    DOM.scroller.style.width = `${100 * (params.width - legendPaddings.x) / params.width}%`;
    DOM.container.appendChild(DOM.scroller);

    DOM.plotCanvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    DOM.plotCanvas.classList.add(CSS.plotCanvas);
    DOM.plotCanvas.setAttribute('viewbox', `0 0 ${params.width} ${params.height}`);
    DOM.scroller.appendChild(DOM.plotCanvas);
    
    DOM.plot = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    DOM.plot.classList.add(CSS.plot);
    DOM.plot.setAttribute('d', '');
    DOM.plotCanvas.appendChild(DOM.plot);

    DOM.axesCanvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    DOM.axesCanvas.classList.add(CSS.axesCanvas);
    DOM.axesCanvas.setAttribute('viewbox', `0 0 ${params.width} ${params.height}`);
    DOM.container.appendChild(DOM.axesCanvas);

    drawAxes(DOM.axesCanvas);
}

export default Plot;