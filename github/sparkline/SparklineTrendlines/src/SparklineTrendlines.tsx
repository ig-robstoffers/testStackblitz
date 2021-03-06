import { IgrSparkline } from 'igniteui-react-charts';
import { IgrSparklineModule } from 'igniteui-react-charts';
import { IgrSparklineCoreModule } from 'igniteui-react-charts';

import * as React from "react";
import "../styles.css";
import "./SharedStyles.css";
import { SharedComponent } from "./SharedComponent";
import { SharedData } from "./SharedData";

IgrSparklineCoreModule.register();
IgrSparklineModule.register();

export default class SparklineTrendlines extends SharedComponent {
    public data: any[];

    public sparkline: IgrSparkline;

    constructor(props: any) {
        super(props);

        this.onSparklineRef = this.onSparklineRef.bind(this);
        this.onTrendlineChanged = this.onTrendlineChanged.bind(this);

        this.data = SharedData.getSharedData();
    }

    public render() {
        return (
            <div className="sampleContainer">
                <div className="options">
                    <span className="optionItem">Trendline Type: </span>
                    <select
                    onChange={this.onTrendlineChanged}
                    defaultValue="ExponentialFit">
                        <option>CubicFit</option>
                        <option>CumulativeAverage</option>
                        <option>ExponentialAverage</option>
                        <option>ExponentialFit</option>
                        <option>LinearFit</option>
                        <option>LogarithmicFit</option>
                        <option>ModifiedAverage</option>
                        <option>None</option>
                        <option>PowerLawFit</option>
                        <option>QuadraticFit</option>
                        <option>QuarticFit</option>
                        <option>QuinticFit</option>
                        <option>SimpleAverage</option>
                        <option>WeightedAverage</option>
                    </select>
                </div>
                <div className="chart">
                    <IgrSparkline height="calc(100% - 30px)" width="100%"
                        ref={this.onSparklineRef}
                        dataSource={this.data}
                        valueMemberPath="Value"
                        displayType="Area"
                        trendLineThickness={3}
                        trendLinePeriod={5}
                        trendLineType="ExponentialFit"
                        trendLineBrush="Red"/>
                </div>
            </div >
        );
    }

    public onTrendlineChanged(e: any) {
        const selection = e.target.value.toString();
        this.sparkline.trendLineType = selection;
    }

    public onSparklineRef(sparkline: IgrSparkline) {
        if (sparkline != null) {
            this.sparkline = sparkline;
        }
    }
}
