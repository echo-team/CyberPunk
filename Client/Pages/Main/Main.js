import './Main.css';
import compose from 'compose';

import PlotBase from '../../Blocks/Plot/Plot';
import PlotTimeMarkers from '../../Blocks/Plot/withTimeMarkers/Plot';
import PlotThemeHack from '../../Blocks/Plot/withTheme/Hack/Plot'
const Plot = compose(PlotBase, PlotTimeMarkers, PlotThemeHack);

import StatisticsBase from '../../Blocks/Statistics/Statistics';
import StatisticsThemeHack from '../../Blocks/Statistics/withTheme/Hack/Statistics'
const Statistics = compose(StatisticsBase, StatisticsThemeHack);

/**
 * Runs when new value received
 * @param {String} value - new value
 * @callback
 */
function onData(value, time)
{
    statistics.update('Current:', value);
    plot.pushDots([{ y: value, x: time }]);
}

var statistics = new Statistics(document.querySelector('.page__statistics'), {
    variables: [
        { name: 'Current:', value: '0' },
        { name: 'In 5sec:', value: '0' },
    ],
});

var plot = new Plot(document.querySelector('.page__plot'), {
    width: 600, height: 400,
    maxDotsAmount: 16,
    legendPaddings: { x: 25, y: 50 },
    secondsOffset: true, measures: 3,
    xScale: 8,
});

/**
 * This part is server-query WebSockets emulation
 * Remove then create one
 */
var time = 48255;

function generateValue()
{
    onData(Math.round(Math.random() * 7), time);
    time += 5;
    setTimeout(generateValue, 5000);
}

generateValue();
