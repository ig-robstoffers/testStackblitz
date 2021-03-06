import { IgrRadialGauge } from 'igniteui-react-gauges';
import { IgrRadialGaugeModule } from 'igniteui-react-gauges';
import * as React from "react";
import "../styles.css";
import "./SharedStyles.css";
import { SharedComponent } from "./SharedComponent";

IgrRadialGaugeModule.register();

export default class RadialGaugeTickmarks extends SharedComponent {
    constructor(props: any) {
        super(props);

        this.state = { componentVisible: true }
    }

    public render() {
        return (
            <div className="sampleFlexRows">
             <IgrRadialGauge
                tickStartExtent={0.5}
                tickEndExtent={0.57}
                tickStrokeThickness={2}
                tickBrush="DodgerBlue"

                minorTickCount={4}
                minorTickEndExtent={0.520}
                minorTickStartExtent={0.57}
                minorTickStrokeThickness={1}
                minorTickBrush="DarkViolet"

                height="100%"
                width="100%"
                minimumValue={0} value={50}
                maximumValue={80} interval={10} />
            </div>
        );
    }
}