import React, { useRef } from "react";
import "@toast-ui/chart/dist/toastui-chart.min.css";
import { BarChart } from "@toast-ui/react-chart";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import "../../styles/components/ListStations/BarChart.scss";

type BasicProps = {
    open: boolean;
    onClose: () => void
}

const BarChartView = ({
    open,
    onClose
}: BasicProps) => {
    const chartRef = useRef(null);
    const data = {
        categories: ["June", "July", "Aug", "Sep", "Oct", "Nov", "Jan"],
        series: [
            {
                name: "Budget",
                data: [5000, 3000, 5000, 7000, 6000, 4000, 8000]
            },
            {
                name: "Income",
                data: [8000, 1000, 7000, 2000, 5000, 3000, 3000]
            }
        ]
    };

    const options = {
        chart: {
            width: 650,
            height: 500,
        },
        yAxis: {
            title: "Month"
        },
        xAxis: {
            title: "Amount"
        }
    };

    // const handleClickButton = () => {
    //     console.log(
    //         "type:",
    //         chartRef.current.getInstance(),
    //         chartRef.current.getInstance().getOptions()
    //     );

    //     chartRef.current.getInstance().hideTooltip();
    // };

    return (
        <div className="BarChart">
            <Dialog className="BarChart__wrapper" open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle className="BarChart__title" id="form-dialog-title">Biểu đồ lượng tiêu thụ</DialogTitle>
                <DialogContent>
                    <BarChart
                        ref={chartRef}
                        data={data}
                        options={options}
                    />
                    {/* <button onClick={handleClickButton}>test options</button> */}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default BarChartView;