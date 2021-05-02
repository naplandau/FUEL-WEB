import React, { useRef, useEffect, useState } from "react";
import "@toast-ui/chart/dist/toastui-chart.min.css";
import { connect, ConnectedProps } from 'react-redux';
import { BarChart } from "@toast-ui/react-chart";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { RootState } from "../../reducers/root.reducer";
import { fetchAmountChart, setAmount } from '../../reducers/station.reducer';

import "../../styles/components/ListStations/BarChart.scss";
import { widthScreens } from "../../configs/sizes.config";

const statesToProps = (state: RootState) => ({
    amount: state.stationReducer.amount
});

const dispatchToProps = {
    fetchAmountChart
};

type BasicProps = {
    open: boolean;
    onClose: () => void
}

const connector = connect(statesToProps, dispatchToProps);

type StationDetailsProps = ConnectedProps<typeof connector> & BasicProps;

const BarChartView = ({
    amount,
    fetchAmountChart,
    open,
    onClose
}: StationDetailsProps) => {
    const [stations, setStations] = useState([]);
    const [amounts, setAmounts] = useState([]);

    useEffect(() => {
        fetchAmountChart();
    }, []);

    useEffect(() => {
        if (amount) {
            setStations(Object.keys(amount));
            setAmounts(Object.values(amount));
        }
    }, [amount])

    const chartRef = useRef(null);
    const data = {
        categories: stations,
        series: [
            {
                name: "Amount",
                data: amounts
            }
        ]
    };

    const options = {
        chart: {
            width: 600,
            height: 300,
        },
        yAxis: {
            title: "Cây xăng"
        },
        xAxis: {
            title: "Doanh thu",
            widthScreens: "10px"
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
                <DialogTitle className="BarChart__title" id="form-dialog-title">Biểu đồ doanh thu</DialogTitle>
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

export default connector(BarChartView);