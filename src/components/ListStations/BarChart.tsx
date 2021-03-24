import { XYPlot, HorizontalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import { Paper } from '@material-ui/core';
import '../../styles/components/ListStations/BarChart.scss';

const BarChart = () => {
    const data = [
        { x: 2, y: 1 },
        { x: 10, y: 2 },
        { x: 20, y: 3 },
        { x: 30, y: 4 }

    ];

    return (
        <div className="BarChart">
            <Paper className='BarChart__paper'>
                <XYPlot height={300} width={300} color='red'>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <HorizontalBarSeries barWidth={0.5} data={data} color='red' stroke={30} />
                </XYPlot>
            </Paper>
        </div>
    );
}

export default BarChart;