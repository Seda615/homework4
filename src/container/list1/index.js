import React, {Component} from "react";

class List extends Component {

    constructor(props) {
        super(props)
        this.state = {list1: []}
    }

    addHighestAverage = () => {
        const {data} = this.props;
        const {maxAverageIndex, maxAverage} = this.props.addHighestAverage()

        this.setState({list1: [...this.state.list1, {...data[maxAverageIndex], rateAverage: maxAverage}]})
    }

    sort = () => {
        this.setState(this.state.list1.sort((l1, l2) => l1.rateAverage - l2.rateAverage ))
    }

    removeColumn = (index, id) => {
        const {data} = this.props;
        this.setState(this.state.list1.splice(index, 1));
        data.map(data => {
            if (data.id === id) {
                data.disabled = false;
            }
            return data;
        })
    }

    render() {
        const {list1} = this.state;
        return (
            <div className="list">
                <button onClick={this.addHighestAverage}>+</button>
                <button onClick={this.sort}>sort</button>
                <ul>
                    {list1.map((list, index) => (
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