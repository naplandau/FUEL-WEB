import { XYPlot, HorizontalBarSeries } from 'react-vis';
import '../../styles/components/ListStations/BarChart.scss';

const BarChart = () => {
    const data = [
        { x: 0, y: 'A' },
        { x: 1, y: 'B' },
        { x: 2, y: 'C' },
        { x: 3, y: 'D' },
        { x: 4, y: 'E' },
        { x: 5, y: 'F' },
        { x: 6, y: 'G' },
        { x: 7, y: 'H' },
        { x: 8, y: 'I' },
        { x: 9, y: 'K' }
    ];

    return (
        <div className="BarChar">
            <XYPlot
                color='red'
                height={300}
                width={300}>
                <HorizontalBarSeries
                    barWidth={300}
                    data={data} />
            </XYPlot>
        </div>
    );
}

export default BarChart;