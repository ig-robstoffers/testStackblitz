import { IgrFinancialChart } from 'igniteui-react-charts';
import { IgrFinancialChartModule } from 'igniteui-react-charts';
import { IgrLegend } from 'igniteui-react-charts';
import { IgrLegendModule } from 'igniteui-react-charts';
import * as React from "react";
import "../styles.css";
import "./SharedStyles.css";
import { SharedComponent } from "./SharedComponent";
import { StocksHistory } from "./StocksHistory";

IgrFinancialChartModule.register();
IgrLegendModule.register();

export default class FinancialChartOverview extends SharedComponent {

    public data: any[];
    public chart: IgrFinancialChart;
    public legend: IgrLegend;

    constructor(props: any) {
        super(props);

        this.onChartRef = this.onChartRef.bind(this);
        this.onLegendRef = this.onLegendRef.bind(this);
        this.state = { chartType: "Auto" }
        this.initData();
    }

    public render() {
        return (
            <div className="sample" >
                <div className="legend">
                    <IgrLegend ref={this.onLegendRef}
                            orientation="Horizontal" />
                </div>
                <div className="chart" style={{height: "calc(100% - 25px)"}}>
                    <IgrFinancialChart
                        width="100%"
                        height="100%"
                        chartType="Bar"
                        zoomSliderType="Bar"
                        chartTitle="Tesla vs Amazon"
                        subtitle="Between 2013 and 2017"
                        isToolbarVisible={true}
                        dataSource={this.data}
                        yAxisMode="PercentChange"
                        thickness={2} />
                </div>
            </div>
        );
    }

    public onChartRef(chart: IgrFinancialChart) {
        this.chart = chart;
        if (this.legend) {
            this.chart.legend = this.legend;
        }
    }

    public onLegendRef(legend: IgrLegend) {
        this.legend = legend;
        if (this.chart) {
            this.chart.legend = this.legend;
        }
    }

    public initData() {
        this.data = [
            StocksHistory.getAmazon(),
            StocksHistory.getTesla()
        ];
    }
}

