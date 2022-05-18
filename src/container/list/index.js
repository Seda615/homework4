import React, {Component} from "react";

class List extends Component {

    constructor(props) {
        super(props)
        this.state = {list: []}
    }

    calculateItemsAverage = () => {
        let items = [...this.props.data];
        const averages = items.map(item => {
            let sum = item.comments.reduce((acc, com) => acc += com.rate, 0)

            return sum/item.comments.length;
        })
        return averages;
    }

    getMaxAverage = (items) => {
        const averages = this.calculateItemsAverage(items);
        let maxAverage = 0;
        let maxAverageIndex;

        for (let i = 0; i < averages.length; i++) {
            if (maxAverage <= averages[i] && !items[i].disabled) {
                maxAverage = averages[i]
                maxAverageIndex = i;
            }
        }
        
        return {maxAverageIndex, maxAverage};
    }

    addHighestAverage = () => {

        const data = [...this.props.data];
        const {maxAverage, maxAverageIndex} = this.getMaxAverage(data);
        this.props.disableMaxAverage(maxAverageIndex);
        console.log(maxAverage, maxAverageIndex)
        if (maxAverageIndex !== undefined) {
            this.setState({list: [...this.state.list, {...data[maxAverageIndex], rateAverage: maxAverage}]})
        }
    }

    sort = () => {
        let list = [...this.state.list];
        this.setState(list.sort((l1, l2) => l1.rateAverage - l2.rateAverage ))

    }

    removeColumn = (index, id) => {
        const {list} = this.state;

        this.setState(list.splice(index, 1));
        this.props.removeColumn(id);
    }

    render() {

        const {list} = this.state;

        return (
            <div className="list">
                <button onClick={this.addHighestAverage}>+</button>
                <button onClick={this.sort}>sort</button>
                <ul>
                    {list.map((list, index) => (
                        <li key={list.id}>
                            <p>{list.name}</p><p> {list.rateAverage}</p>
                            <button onClick={() => this.removeColumn(index, list.id)}>-</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default List