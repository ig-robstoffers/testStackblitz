import * as React from "react";
import "../styles.css";
import "./SharedStyles.css";
import { SharedComponent, IComponentState } from "./SharedComponent";
import { SharedData } from './SharedData';
import { IgrLiveGrid } from 'igniteui-react-grids';
import { IgrLiveGridModule } from 'igniteui-react-grids';
import { IgrTextColumn } from 'igniteui-react-grids';
import { IgrNumericColumn } from 'igniteui-react-grids';
import { IgrDateTimeColumn } from 'igniteui-react-grids';
import { IgrColumnGroupDescription } from 'igniteui-react-grids';
import { ListSortDirection } from 'igniteui-react-core';

import { Pager } from './Pager';

IgrLiveGridModule.register();

export default class DataGridRowPaging extends React.Component<any, any> {

    private data: any[];
    private grid: IgrLiveGrid;
    private pager: Pager;

    constructor(props: any) {
        super(props);

        this.onGridRef = this.onGridRef.bind(this);
        this.onPagerRef = this.onPagerRef.bind(this);
        this.data = SharedData.getEmployees();
    }

    public onGridRef(grid: IgrLiveGrid) {
        this.grid = grid;

        const desc = new IgrColumnGroupDescription();
        desc.propertyPath = "Country";
        desc.displayName = "Country";
        desc.sortDirection = ListSortDirection.Descending;
        this.grid.groupDescriptions.add(desc);
    }
    public onPagerRef(pager: Pager) {
        this.pager = pager;

        if (this.grid) {
            if (this.grid.sortDescriptions.count > 0) {
                this.onSortChanged();
            }
            if (this.grid.groupDescriptions.count > 0) {
                this.onGroupChanged();
            }
            if (this.grid.filterExpressions.size() > 0) {
                this.onFilterChanged();
            }
        }
    }

    public render() {
        return (
            <div className="sampleContainer">
                <IgrLiveGrid
                    ref={this.onGridRef}
                    width="100%"
                    height="calc(100% - 65px)"
                    autoGenerateColumns={false}
                    sortDescriptionsChanged={this.onSortChanged}
                    groupDescriptionsChanged={this.onGroupChanged}
                    filterExpressionsChanged={this.onFilterChanged}>
                    <IgrTextColumn propertyPath="FirstName" headerText="First Name" />
                    <IgrTextColumn propertyPath="LastName" headerText="Last Name" />
                    <IgrTextColumn propertyPath="Street" headerText="Street" width="140" />
                    <IgrTextColumn propertyPath="City" headerText="City" />
                    <IgrNumericColumn propertyPath="Salary" headerText="Salary" positivePrefix="$" showGroupingSeparator="true" />
                    <IgrNumericColumn propertyPath="Sales" headerText="Sales" positivePrefix="$" showGroupingSeparator="true" />
                    <IgrDateTimeColumn propertyPath="Birthday" headerText="Date of Birth" />
                    <IgrNumericColumn propertyPath="Age" headerText="Age" />
                </IgrLiveGrid>

                <Pager
                    ref={this.onPagerRef}
                    dataSource={this.data}
                    pageSize={20}
                    pagedChanged={this.onPageChanged}/>
            </div>
        );
    }

    private onSortChanged = () => {
        if (this.pager) {
            this.pager.applySorts(this.grid.sortDescriptions);
        }
    }
    private onGroupChanged = () => {
        if (this.pager) {
            this.pager.applyGroups(this.grid.groupDescriptions);
        }
    }
    private onFilterChanged = () => {
        if (this.pager) {
            this.pager.applyFilters(this.grid.filterExpressions);
        }
    }
    private onPageChanged = (pageNumber: number, data: any[]) => {
        this.grid.dataSource = data;
        this.grid.flush();
        this.grid.scrollToRowByIndex(0);
    };
}