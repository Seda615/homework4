import React, {Component} from "react";

class List extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            currentSort: 'default'
        }
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
        if (maxAverageIndex !== undefined) {
            this.setState({list: [...this.state.list, {...data[maxAverageIndex], rateAverage: maxAverage}]})
        }
    }

    onSort = () => {
        const {currentSort} = this.state;
        let nextSort;
        if (currentSort === 'up' || currentSort === 'default') {
            nextSort = 'down';
        } else {
            nextSort = 'up';
        }
        this.setState({currentSort: nextSort});
    }

    listSort = () => {
        const {currentSort} = this.state;

        if (currentSort === 'up') {
            return ((l1, l2) => l2.rateAverage - l1.rateAverage);
        } 
        if (currentSort === 'down') {
            return ((l1, l2) => l1.rateAverage - l2.rateAverage);
        }
        if (currentSort === 'default') {
            return ((a, b) => a)
        }
    }

    removeColumn = (index, id) => {
        const list = {...this.state.list};

        this.setState(list.splice(index, 1));
        this.props.removeColumn(id);
    }

    render() {

        const {list} = this.state;

        return (
            <div className="list">
                <button onClick={this.addHighestAverage} className="button">+</button>
                <button onClick={this.onSort} className="button">sort</button>
                <ul>
                    {list
                        .sort(this.listSort())
                        .map((list, index) => (
                            <li key={list.id}>
                                <p>{list.name}</p><p> {list.rateAverage}</p>
                                <button onClick={() => this.removeColumn(index, list.id)} className="button">-</button>
                            </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default List