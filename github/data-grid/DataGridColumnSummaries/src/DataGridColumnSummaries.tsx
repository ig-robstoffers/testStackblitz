import * as React from "react";
import "../styles.css";
import "./SharedStyles.css";

import { SharedData } from './SharedData';
import { IgrLiveGridModule } from 'igniteui-react-grids';
import { IgrLiveGrid } from 'igniteui-react-grids';
import { IgrColumnGroupDescription } from 'igniteui-react-grids';
import { IgrColumnSummaryDescription } from 'igniteui-react-grids'
import { SummaryOperand, SummaryCalculator, DefaultSummaryResult, IDataSource, ISummaryResult } from 'igniteui-react-core';
import { IgrTextColumn } from 'igniteui-react-grids';
import { IgrNumericColumn } from 'igniteui-react-grids';
import { IgrDateTimeColumn } from 'igniteui-react-grids';

IgrLiveGridModule.register();

export default class DataGridColumnSummaries extends React.Component<any, any> {

    public data: any[];
    public grid: IgrLiveGrid;

    constructor(props: any) {
        super(props);
        this.onGridRef = this.onGridRef.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.state = { componentVisible: true, isGroupCollapsable: true, summaryScope: "Root", groupSummaryDisplayMode: "RowBottom" }
        this.data = SharedData.getSales(50);
    }

    public render() {
        return (
            <div className="sampleContainer">
                <div className="options">
                    <span className="optionItem" style={{ width: "100px" }}>Summary Scope:</span>
                    <select className="optionItem" style={{ width: "100px" }} defaultValue="Root" onChange={this.onSummaryScopeChanging}>
                        <option>Root</option>  
                        <option>Sections</option>   
                        <option>Both</option>                   
                    </select>                       
                    <span className="optionItem" style={{ width: "100" }}>Group Summary Display Mode:</span>
                    <select className="optionItem" style={{ width: "110px" }} defaultValue="RowBottom" onChange={this.onGroupSummaryDisplayModeChanging}>
                        <option>RowTop</option>  
                        <option>RowBottom</option>   
                        <option>None</option>                   
                    </select>                     
                </div>

                <IgrLiveGrid
                    ref={this.onGridRef}
                    summaryScope = {this.state.summaryScope}
                    groupSummaryDisplayMode = {this.state.groupSummaryDisplayMode}
                    height="calc(100% - 40px)"
                    width="100%"
                    autoGenerateColumns="false"
                    isGroupCollapsable={this.state.isGroupCollapsable}
                    groupHeaderDisplayMode = "combined" 
                    dataSource={this.data}>                     
                        <IgrNumericColumn propertyPath="ProductID" headerText="ID" horizontalAlignment="center" />
                        <IgrTextColumn propertyPath="ProductName" headerText="Product"/>
                        <IgrNumericColumn positivePrefix="$" propertyPath="BundlePrice" showGroupingSeparator="true" headerText="Price" />
                        <IgrNumericColumn propertyPath="OrderItems" headerText="Order Items"/>
                        <IgrNumericColumn propertyPath="OrderValue" showGroupingSeparator="true" headerText="Order Totals" 
                        positivePrefix="$"  />       
                        <IgrDateTimeColumn propertyPath="OrderDate" headerText="Order Date"
                        horizontalAlignment="right"  />                
                        <IgrNumericColumn propertyPath="Profit" showGroupingSeparator="true" headerText="Profit" 
                        positivePrefix="$"  />
                        <IgrTextColumn propertyPath="Countries" headerText="Ship Country"/>
                </IgrLiveGrid>              
            </div>
        );
    }

    public onSummaryScopeChanging = (e: any) => {
        this.grid.summaryScope = e.target.value;
        this.setState( {summaryScope: e.target.value} );
    }
    public onGroupSummaryDisplayModeChanging = (e: any) => {
        this.grid.groupSummaryDisplayMode = e.target.value;
        this.setState( {groupSummaryDisplayMode: e.target.value} );
    }
    public onGridRef(grid: IgrLiveGrid) {
        this.grid = grid;
        this.grid.actualDataSource.isSectionExpandedDefault = true;
    }

    public componentDidMount() {
        window.addEventListener('load', this.onLoad);
    }

    public onLoad() {       
        const productGroup = new IgrColumnGroupDescription();
        productGroup.propertyPath = "ProductName";
        productGroup.displayName = "ProductName";
        this.grid.groupDescriptions.add(productGroup);

        const productCount = new IgrColumnSummaryDescription();
        productCount.propertyPath = "ProductName";
        productCount.operand = SummaryOperand.Count;
        this.grid.summaryDescriptions.add(productCount);

        const priceMin = new IgrColumnSummaryDescription();
        priceMin.propertyPath = "BundlePrice";
        priceMin.operand = SummaryOperand.Min;  
        priceMin.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }); 
        this.grid.summaryDescriptions.add(priceMin);

        const priceMax = new IgrColumnSummaryDescription();
        priceMax.propertyPath = "BundlePrice";
        priceMax.operand = SummaryOperand.Max;  
        priceMax.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }); 
        this.grid.summaryDescriptions.add(priceMax);

        const orderSum = new IgrColumnSummaryDescription();
        orderSum.propertyPath = "OrderItems";
        orderSum.operand = SummaryOperand.Sum;        
        this.grid.summaryDescriptions.add(orderSum);

        const orderValueSum = new IgrColumnSummaryDescription();
        orderValueSum.propertyPath = "OrderValue";
        orderValueSum.operand = SummaryOperand.Sum;    
        orderValueSum.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0});    
        this.grid.summaryDescriptions.add(orderValueSum);

        const orderValueAvg = new IgrColumnSummaryDescription();
        orderValueAvg.propertyPath = "OrderValue";
        orderValueAvg.operand = SummaryOperand.Average;  
        orderValueAvg.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });       
        this.grid.summaryDescriptions.add(orderValueAvg);

        const orderDateMin = new IgrColumnSummaryDescription();
        orderDateMin.propertyPath = "OrderDate";
        orderDateMin.operand = SummaryOperand.Min;
        orderDateMin.calculatorDisplayName = "First"  
        orderDateMin.formatOverride = new Intl.DateTimeFormat('en-EN');
        this.grid.summaryDescriptions.add(orderDateMin);

        const orderDateMax = new IgrColumnSummaryDescription();
        orderDateMax.propertyPath = "OrderDate";
        orderDateMax.operand = SummaryOperand.Max; 
        orderDateMax.calculatorDisplayName = "Last" 
        orderDateMax.formatOverride = new Intl.DateTimeFormat('en-EN');
        this.grid.summaryDescriptions.add(orderDateMax);

        const sum1 = new IgrColumnSummaryDescription();
        sum1.propertyPath = "Profit";
        sum1.operand = SummaryOperand.Sum;       
        sum1.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });     
        this.grid.summaryDescriptions.add(sum1);

        const avg2 = new IgrColumnSummaryDescription();
        avg2.propertyPath = "Profit";
        avg2.operand = SummaryOperand.Average;
        avg2.formatOverride = new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });       
        this.grid.summaryDescriptions.add(avg2);

        const countries = new IgrColumnSummaryDescription();
        countries.propertyPath = "Countries";
        countries.operand = SummaryOperand.Custom;
        countries.calculator = new CustomDomestic();
        this.grid.summaryDescriptions.add(countries);
    }
}

// Custom Calculator - calculates the count for all USA.
class CustomDomestic extends SummaryCalculator
{
    get displayName(): string {
        return "USA";
    }
    public usCountries: number;

    public beginCalculation(a: IDataSource, b: string): void {
        super.beginCalculation(a,b);
        this.usCountries = 0;       
    }
    public endCalculation(): ISummaryResult {
       return new DefaultSummaryResult(this.propertyName, SummaryOperand.Custom, this.usCountries)
    }
    public aggregate(a: any): void {
       if(a.Countries === "USA")
       {
            this.usCountries++;
       }
    }
}
