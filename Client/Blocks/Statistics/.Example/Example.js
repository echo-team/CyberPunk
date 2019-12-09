import './Example.css';
import Statistics from '../Statistics';
import withBlockValue from '../withBlockValue/Statistics';
import withThemeHack from '../withTheme/Hack/Statistics';
import compose from 'compose';

const StatisticsChildren = compose(Statistics, withBlockValue, withThemeHack);

var statistics = new Statistics(
    document.getElementById('statistics'),
    {
        variables: [
            { name: 'Current amount:', value: 5643 },
            { name: 'In 5s:', value: '146' },
        ]
    }
);

var innerBlock = document.createElement('span'),
    statisticsChildren = new StatisticsChildren(
    document.getElementById('with-block-value'),
    {
        variables: [
            { name: 'With inner block:' },
        ]
    }
);

innerBlock.textContent = 'Hoooray!';
statisticsChildren.update('With inner block:', innerBlock);