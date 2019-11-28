import Axes from './Axes/Axes.js';
import Line from './Line/Line.js';
import Markers from './Markers/Markers.js';
import './Plot.css';

/**
 * Draws plot
 * @param {Element} parent - container for block
 * @param {Object}  params - block settings
 * @param {Number}  params.width  - SVG canvas width
 * @param {Number}  params.height - SVG canvas height
 * @param {Number}  params.xScale - pixels in one x-axis step
 * @param {Number}  params.yScale - pixels in one x-axis step
 * @param {Number}  params.maxDotsAmount - amount of displayed dots
 * @param {Object}  params.legendPaddings - object with `x` and `y` fields, free space to draw numbers
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
            plotCanvas: null,
        };
    
    /**
     * CSS classes of the block
     * @type {Object}
     */
    var CSS =
        {
            container: 'plot__container',
            scroller: 'plot__scroller',
            axesCanvas: 'plot__axes-canvas',
            plotCanvas: 'plot__line-canvas',
        };

    /**
     * Free space to draw numbers arong the plot
     * @type {Object}
     */
    var legendPaddings = { x: 25, y: 25 } || params.legendPaddings;

    /**
     * Amount of pixels in one x-step
     * @type {Number}
     * @default 40
     */
    var xScale = params.xScale || 40;

    /**
     * Amount of pixels in one y-step
     * @type {Number}
     * @default 40
     */
    var yScale = params.yScale || 40;

    /**
     * Length of the plot line in `px`
     * @type {Number}
     */
    var plotWidth = 0;

    /**
     * Instance of `Axes` element
     * @type {Axes}
     */
    var axes;

    /**
     * Lines displayed on plot
     * @type {Object[Line]}
     */
    var lines;

    /**
     * Markers and numbers at axes
     * @type {Markers}
     */
    var markers;

    /**
     * Projection lengths of arrow line to axes
     * @type {Object}
     */
    var arrowLength = {};
    arrowLength.a = Math.min(params.height, params.width) / 20;
    arrowLength.b = arrowLength.a * 0.40;

    /**
     * Adds dots array and triggers redraw of line
     * @param {Array[Object]} dots   - dots of line
     */
    this.pushDots = function(dots)
    {
        lines.pushDots(dots);
    }

    /**
     * Sets markers, eeds for class overloading
     * @param {Markers} MarkersClass - marker class (not instance)
     */
    this.setMarkers = function(MarkersClass)
    {
        markers = new MarkersClass(DOM.plotCanvas, DOM.axesCanvas, { legendPaddings, xScale, arrowLength, ...params });
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

    DOM.axesCanvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    DOM.axesCanvas.classList.add(CSS.axesCanvas);
    DOM.axesCanvas.setAttribute('viewBox', `0 0 ${params.width} ${params.height}`);
    DOM.container.appendChild(DOM.axesCanvas);

    this.setMarkers(Markers);
    axes = new Axes(DOM.axesCanvas, { legendPaddings, arrowLength, ...params });
    lines = new Line(DOM.plotCanvas, { legendPaddings, xScale, yScale, ...params });
    lines.onChange = (startPoint) =>
    {
        plotWidth = Math.max(lines.width(), params.width - legendPaddings.x);
        markers.move(startPoint.x, plotWidth);
        markers.yMarkersRedraw(yScale);
        DOM.plotCanvas.setAttribute('viewBox', `0 0 ${plotWidth} ${params.height}`);
        DOM.plotCanvas.style.width = plotWidth + 'px';
    }
}

export default Plot;
