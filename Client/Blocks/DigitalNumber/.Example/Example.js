import DigitalNumber from '../DigitalNumber';
import './Example.css';

var number = new DigitalNumber(document.querySelector('.digital-number-container'),
    { category: 4, number: 1234567890 },
);

var numbers = [1111, 222, 33, 1234567890, 999999],
    current = 0;

var stop = setInterval(() =>
{
    number.display(numbers[current]);
    current ++;

    if (current >= numbers.length)
    {
        clearInterval(stop);
    }
}, 2000);
