import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import $ from 'jquery'
import UserInput from "./UserInput";
import gitlab from '../Images/gitlab.png'

type state = {
    data: any
    projectId: string;
    accessToken: string;
    startDate: string;
    endDate: string
}

let getDate = (offset: number) => {
    let date = new Date()
    date.setDate(date.getDate() + offset)
    return `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

class Content extends React.Component<any, state> {
    constructor(props: any) {
        super(props)
        this.state = {
            data: [],
            projectId: "",
            accessToken: "",
            startDate: getDate(-30),
            endDate: getDate(0)
        }
    }

    createChart = (): void => {
        let startDate = new Date(`${this.state.startDate} 00:00:01`)
        let endDate = new Date(`${this.state.endDate} 23:59:59`)
        let relevantData = []
        for (let i = 0; i < this.state.data.length; i++) {
            if (startDate.getTime() <= this.state.data[i].date.getTime() && endDate.getTime() + 1000 >= this.state.data[i].date.getTime()) {
                relevantData.push(this.state.data[i])
            }
        }
        am4core.useTheme(am4themes_animated);
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.data = relevantData;

        // Create axes
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        // dateAxis.renderer.minGridDistance = 20;
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Styling 
        valueAxis.title.text = "Commits";
        valueAxis.title.fontWeight = "bold";
        valueAxis.strictMinMax = true
        valueAxis.min = 0
        valueAxis.maxPrecision = 0

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.tooltipText = "{value}"

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "none"

    }

    callBackHandler = (key: string, data: any) => {
        if (key in this.state) {
            let newState = { [key]: data } as Pick<state, keyof state>;
            if (key !== "projectId" && key !== "accessToken") {
                this.setState(newState, () => {
                    this.createChart();
                })
            } else {
                this.setState(newState)
            }
        }
    }

    /**
     * Gets data from gitlab commit api
     * @param page api page to get
     * @returns promise with data
     */
    apiRequest = (page: number): any => {
        return $.ajax({
            url: `https://gitlab.stud.idi.ntnu.no/api/v4/projects/${this.state.projectId}/repository/commits?page=${page}`,
            type: 'GET',
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${this.state.accessToken}`
            },
            success: function (msg) {
                console.log("Success!")
            },
            error: function (jqXhr, textStatus, errorMessage) {
                console.log('Error: ' + errorMessage);
            }
        })
    }

    /**
     * Reads and formats data from all pages in gitlab commit api
     */
    dataCollection = async () => {
        let page = 1
        let data = []
        while (true) {
            let response = await this.apiRequest(page)
            if (response.length > 0) {
                let selectedDate = new Date(response[0].committed_date.substring(0, 10))
                let temp = { date: new Date(selectedDate.getTime()), value: 1 }
                for (let i = 1; i < response.length; i++) {
                    let currentDate = new Date(response[i].committed_date.substring(0, 10))
                    if (currentDate.getTime() !== selectedDate.getTime()) {

                        data.push(temp)
                        selectedDate = currentDate
                        temp = { date: new Date(selectedDate.getTime()), value: 1 }
                    } else {
                        temp.value++
                    }
                }
                data.push(temp)        
            } else {
                break
            }
            page++;
        }
        this.setState({data: data}, () => {
            this.createChart()
        })
    }

    /**
     * Button clickhandler
     */
    clickHandler = () => {
        const { projectId, accessToken } = this.state;
        sessionStorage.setItem("projectID", projectId);
        sessionStorage.setItem("accessToken", accessToken);

        this.dataCollection()
    }

    componentDidMount() {
        this.createChart()

        let projId = sessionStorage.getItem("projectID");
        let accToken = sessionStorage.getItem("accessToken");
        if (projId !== null) {
            this.setState({ projectId: projId });
        }
        if (accToken !== null) {
            this.setState({ accessToken: accToken }, () => { this.dataCollection() });
        }
    }

    render() {
        return (
            <div className="content">
                <div className="loginContainer">
                    <UserInput keyName="projectId" label="Project ID" type="text" defaultValue={this.state.projectId} callBack={this.callBackHandler} />
                    <UserInput keyName="accessToken" label="Project access token" type="text" defaultValue={this.state.accessToken} callBack={this.callBackHandler} />
                    {/* Button for fetching data from gitlab */}
                    <button type="button" onClick={this.clickHandler}>Get data from GitLab</button>
                </div>

                <div className="contentInternal">
                    <div className="imgDiv">
                        <img id="gitlabPhoto" src={gitlab} alt="gitlab" />
                    </div>
                    <div id="chartdiv"></div>
                </div>
                <div id="userInteraction">
                    <UserInput keyName="startDate" label="Start-date" type="date" defaultValue={this.state.startDate} callBack={this.callBackHandler} />
                    <UserInput keyName="endDate" label="End-date" type="date" defaultValue={this.state.endDate} callBack={this.callBackHandler} />
                </div>
            </div>
        )
    }
}

export default Content