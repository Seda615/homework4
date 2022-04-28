import React, {Component} from "react";
import data from "../../data"
import Posts from "../posts";
import List from "../list1";

class Main extends Component {
    constructor() {
        super()
        this.state = {data}
    }

    addHighestAverage = () => {
        const {data} = this.state;
        const averages = data.map(data => {
            let sum = 0;
            if (!data.disabled) {
                for (let i = 0; i < data.comments.length; i++) {
                    sum += data.comments[i].rate
                }
            }
            return sum/data.comments.length
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

        return {maxAverageIndex, maxAverage}
        
    }



    render() {
        return (
            <div className="container">
                <Posts data={data} />
                <div className="lists">
                    <List data={data} addHighestAverage={this.addHighestAverage}  />
                    <List data={data} addHighestAverage={this.addHighestAverage}  />
                </div>
            </div>
        )
    }
}

export default Main;