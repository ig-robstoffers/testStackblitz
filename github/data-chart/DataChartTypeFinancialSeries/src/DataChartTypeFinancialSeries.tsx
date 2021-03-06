// axis' modules:
import { IgrNumericYAxis } from 'igniteui-react-charts';
import { IgrCategoryXAxis } from 'igniteui-react-charts';
// series' modules:
import { IgrFinancialPriceSeries } from 'igniteui-react-charts';
import { IgrBollingerBandsOverlay } from 'igniteui-react-charts';
import { IgrMedianPriceIndicator } from 'igniteui-react-charts';

// data chart's modules:
import { IgrDataChart } from 'igniteui-react-charts';
import { IgrDataChartCoreModule } from 'igniteui-react-charts';
import { IgrDataChartInteractivityModule } from 'igniteui-react-charts';

import * as React from "react";
import "../styles.css";
import "./SharedStyles.css";
import { SharedComponent } from "./SharedComponent";
import { SampleFinancialData } from "./SampleFinancialData";

IgrDataChartCoreModule.register();
IgrDataChartInteractivityModule.register();

export default class DataChartTypeFinancialSeries extends SharedComponent {
    public data: any[];
    public chart: IgrDataChart;

    constructor(props: any) {
        super(props);

        this.state = {
            displayTypeIndicator: "Line",
            displayTypeSeries: "Candlestick" }
        this.data = SampleFinancialData.create();
    }

    public onDisplayTypeSeriesChanged = (e: any) =>{
        const type = e.target.value.toString();
        this.setState({displayTypeSeries: type});
    }

    public onDisplayTypeIndicatorChanged = (e: any) =>{
        const type = e.target.value.toString();
        this.setState({displayTypeIndicator: type});
    }

    public render() {
        return (
        <div className="sample">
            <div className="options">
                <span className="optionLabel"> Series Display Type: </span>
                <select value={this.state.markersType}
                    onChange={this.onDisplayTypeSeriesChanged}>
                    <option>Candlestick</option>
                    <option>OHLC</option>
                </select>
                <span className="optionLabel"> Indicator Display Type: </span>
                <select value={this.state.markersType}
                    onChange={this.onDisplayTypeIndicatorChanged}>
                    <option>Line</option>
                    <option>Area</option>
                    <option>Column</option>
                </select>
            </div>
            <div className="chart" style={{height: "calc(100% - 35px)"}} >
                <IgrDataChart
                    width="100%"
                    height="100%"
                    dataSource={this.data}
                    isHorizontalZoomEnabled={true}
                    isVerticalZoomEnabled={true} >

                    <IgrCategoryXAxis name="xAxis" label="Label" labelAngle={90} />
                    <IgrNumericYAxis  name="yAxis1" labelLocation="OutsideRight"
                     title="Financial Prices"/>
                    <IgrNumericYAxis  name="yAxis2" labelLocation="OutsideLeft"
                    title="Indicator Values" majorStrokeThickness={0} maximumValue={800}/>

                    <IgrBollingerBandsOverlay
                    name="series1"
                    xAxisName="xAxis"
                    yAxisName="yAxis1"
                    highMemberPath="High"
                    lowMemberPath="Low"
                    closeMemberPath="Close"
                    openMemberPath="Open"
                    brush="rgba(171, 82, 235, 0.39)"/>

                    <IgrFinancialPriceSeries
                    name="series2"
                    xAxisName="xAxis"
                    yAxisName="yAxis1"
                    displayType={this.state.displayTypeSeries}
                    highMemberPath="High"
                    lowMemberPath="Low"
                    closeMemberPath="Close"
                    openMemberPath="Open"
                    volumeMemberPath="Volume" />

                    <IgrMedianPriceIndicator
                    name="series3"
                    xAxisName="xAxis"
                    yAxisName="yAxis2"
                    displayType={this.state.displayTypeIndicator}
                    highMemberPath="High"
                    lowMemberPath="Low"
                    closeMemberPath="Close"
                    openMemberPath="Open"
                    volumeMemberPath="Volume" />

                </IgrDataChart>
            </div>
        </div>
        );
    }
}
