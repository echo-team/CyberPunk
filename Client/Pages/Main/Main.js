import compose from 'compose';

import PlotBase from '../../Blocks/Plot/Plot';
import PlotTimeMarkers from '../../Blocks/Plot/withTimeMarkers/Plot';
import PlotThemeHack from '../../Blocks/Plot/withTheme/Hack/Plot'
const Plot = compose(PlotBase, PlotTimeMarkers, PlotThemeHack);

import StatisticsBase from '../../Blocks/Statistics/Statistics';
import StatisticsBlockValue from '../../Blocks/Statistics/withBlockValue/Statistics';
import StatisticsThemeHack from '../../Blocks/Statistics/withTheme/Hack/Statistics'
const Statistics = compose(StatisticsBase, StatisticsBlockValue, StatisticsThemeHack);

import DigitalNumber from '../../Blocks/DigitalNumber/DigitalNumber';

import './Main.css';

/**
 * Runs when new value received
 * @param {String} value - new value
 * @callback
 */
function onData(value, time)
{
    current.display(value);
    plot.pushDots([{ y: value, x: time }]);
}

var statistics = new Statistics(document.querySelector('.page__statistics'), {
    variables: [
        { name: 'Current:', value: '' },
        { name: 'In 5sec:', value: '' },
    ],
});

var current = new DigitalNumber(
        document.querySelectorAll('.statistics__value')[0],
        { category: 4 }
    ),
    prediction = new DigitalNumber(
        document.querySelectorAll('.statistics__value')[1],
        { category: 4 }
    );

var plot = new Plot(document.querySelector('.page__plot'), {
    width: 600, height: 400,
    maxDotsAmount: 16,
    legendPaddings: { x: 50, y: 50 },
    secondsOffset: true, measures: 3,
    xScale: 8, yScale: 0.25,
});

/**
 * Current timezone
 * Used for extending time sent from server
 * @type {Number}
 */
var timezone = -60 * (new Date()).getTimezoneOffset();

/**
 * Previous received value to calculate delta with next
 * @type {Number|Null}
 */
var previousValue = null;

/**
 * Connecting to server via WebSocket to receive value
 * @type {WebSocket}
 */
var connection = new WebSocket('ws://127.0.0.1:8000');

/**
 * Connection id
 * Sent from server when connected
 * @type {String|Null}
 */
var id = null;

/**
 * Getting data from server
 * @param {Event} event
 */
connection.onmessage = function(event)
{
    /**
     * Catching controlling sequance
     */
    if (event.data[0] == '$')
    {
        id = event.data;
        return;
    }

    var data = event.data.split('.').map((num) => Number(num));

    if (previousValue !== null)
    {
        var value = data[1] - previousValue;

        current.display(value);
        plot.pushDots([{ x: data[0] + timezone, y: value }]);
    }

    previousValue = data[1];
};

/**
 * Close WebSocket connection
 * Runs before page closed
 */
window.addEventListener('beforeunload', () =>
{
    connection.send(id);
    connection.close(1000);
});
