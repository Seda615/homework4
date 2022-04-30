import React, {Component} from "react";

class List extends Component {

    constructor(props) {
        super(props)
        this.state = {list: []}
    }

    addHighestAverage = () => {

        const {data} = this.props;

        const {maxAverageIndex, maxAverage} = this.props.addHighestAverage()

        this.setState({list: [...this.state.list, {...data[maxAverageIndex], rateAverage: maxAverage}]})

    }

    sort = () => {
        const {list} = this.state;

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