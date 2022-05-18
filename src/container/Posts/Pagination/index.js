import React, {Component} from "react";

class Pagination extends Component {

    render() {
        const {pages, pageSizeOptions, changePageSize, currentPage} = this.props;

        return (
            <div>
                <form action="#" onChange={(e) => changePageSize(e)}>
                    <select>
                        {pageSizeOptions.map(pageSizeOption => (
                            <option value={pageSizeOption} key={pageSizeOption}>{pageSizeOption}</option>
                        ))}
                    </select>
                </form>
                <ul className="pagination">
                    {currentPage > 1 &&
                        <li>
                            <button onClick={() => this.props.changePage(currentPage - 1)}>{"<"}</button>
                        </li>
                    }
                    {pages.map(page => (
                        <li key={page}>
                            <button onClick={() => this.props.changePage(page)} className={page === currentPage ? "blue" : ""}>
                                {page}
                            </button>
                        </li>
                    ))}
                    {currentPage < pages.length &&
                        <li>
                            <button onClick={() => this.props.changePage(currentPage + 1)}>{">"}</button>
                        </li>
                    }   
                </ul>
            </div>
        )
    }

}

export default Pagination