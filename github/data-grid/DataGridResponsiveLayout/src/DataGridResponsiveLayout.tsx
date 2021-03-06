import * as React from "react";
import "../styles.css";
import "./SharedStyles.css";

import { SharedData } from './SharedData';

export default class DataGridResponsiveLayout extends React.Component<any, any> {

    public data: any[];

    constructor(props: any) {
        super(props);

        this.state = { componentVisible: true }
        this.data = SharedData.getEmployees();
    }

    public render() {
        return (
            <div className="sampleContainer">
            <p>TODO implement render() in {this.constructor.name}.tsx file</p>
            </div>
        );
    }

}