import React, {Component} from "react";

class List extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            currentSort: 'default'
        }
    }

    addHighestAverage = () => {

        const {data} = this.props;
        const {list} = this.state;

        const {maxAverageIndex, maxAverage} = this.props.addHighestAverage();
        if (maxAverageIndex !== undefined) {
            this.setState({list: [...list, {...data[maxAverageIndex], rateAverage: maxAverage}], currentSort: 'default'})
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
        const {list} = this.state;

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