import { IgrCategoryChart } from 'igniteui-react-charts';
import { IgrCategoryChartModule } from 'igniteui-react-charts';
import * as React from "react";
import "../styles.css";
import "./SharedStyles.css";
import { SharedComponent } from "./SharedComponent";
import { SharedData } from "./SharedData";

IgrCategoryChartModule.register();

export default class CategoryChartHighVolume extends SharedComponent {
    public dataPoints: number = 500000;
    public dataSource: any;

    constructor(props: any) {
        super(props);

        this.dataSource = SharedData.generateItems(0, this.dataPoints, true);
        this.state = {
            dataInfo: SharedData.toShortString(this.dataPoints),
            dataPoints: this.dataPoints,
            dataSource: this.dataSource
        }
    }

    public render() {
        return (
        <div className="sampleContainer">
            <div className="options">
                <label className="optionLabel">Data Points: </label>
                <label className="optionValue">
                    {this.state.dataInfo}
                </label>
                <input className="slider" type="range" min="10000" max="1000000" step="1000"
                    value={this.state.dataPoints}
                    onChange={this.onDataPointsChanged}/>
                <button onClick={this.onDataGenerateClick}>Generate Data</button>
            </div>

            <div className="chart" style={{height: "calc(100% - 30px)"}} >
                <IgrCategoryChart
                    width="100%"
                    height="100%"
                    chartType="Line"
                    dataSource={this.state.dataSource}/>
            </div>
        </div>
        );
    }

    public onDataPointsChanged = (e: any) => {
        this.dataPoints = e.target.value;
        const info = SharedData.toShortString(this.dataPoints);
        this.setState({ dataPoints: this.dataPoints, dataInfo: info });
    }


    public onDataGenerateClick = (e: any) => {
        if (this.dataPoints === undefined){
            this.dataPoints = 10000;
        }
        this.generateData();
    }

    public generateData() {
        this.dataSource = SharedData.generateItems(0, this.dataPoints, true);
        this.setState({dataSource: this.dataSource});
    }

}
