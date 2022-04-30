import React, {Component} from "react";
import data from "../../data"
import Posts from "../posts";
import List from "../list";

class Main extends Component {
    constructor() {
        super()
        this.state = {data}
    }

    addHighestAverage = () => {
        const {data} = this.state;

        const averages = data.map(data => {
            let sum;
            if (!data.disabled) {
                sum = data.comments.reduce((acc, com) => acc += com.rate, 0)
            }
            return sum/data.comments.length;
        })

        let maxAverage = averages[0];
        let maxAverageIndex;

        for (let i = 0; i < averages.length; i++) {
            if (maxAverage < averages[i]) {
                maxAverageIndex = i;
                maxAverage = averages[i]
            }
        }
        
        data[maxAverageIndex].disabled = true;

        this.setState({data});

        return {maxAverageIndex, maxAverage}
        
    }

    removeColumn = (id) => {
        const {data} = this.state;

        data.map(data => {
            if (data.id === id) {
                data.disabled = false;
            }
            return data;
        })

        this.setState({data})
    }



    render() {

        const {data} = this.state;

        return (
            <div className="container">
                <Posts data={data} />
                <div className="lists">
                    <List data={data} addHighestAverage={this.addHighestAverage} removeColumn={this.removeColumn} />
                    <List data={data} addHighestAverage={this.addHighestAverage} removeColumn={this.removeColumn} />
                </div>
            </div>
        )
    }
}

export default Main;