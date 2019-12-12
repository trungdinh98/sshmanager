import React from 'react';
import ReactDOM from 'react-dom';
import './datatable.css';
import {Redirect} from 'react-router-dom';

export default class DataTable extends React.Component {
    _preSearchData = null;
    constructor(props) {
        super(props);

        this.state = {
            headers: props.headers,
            data: props.data,
            sortby: null,
            descending: null,
            search: false,
            direct: false
        }

        this.keyField = props.keyField || "id";
        this.noData = props.noData || "No records found!";
        this.width = props.width || "100%";
    }

    renderTableHeader = () => {
        let { headers } = this.state;
        headers.sort((a, b) => {
            if (a.index > b.index) return 1;
            return -1;
        });

        let headerView = headers.map((header, index) => {
            let title = header.title;
            let cleanTitle = header.accessor;
            let width = header.width;
            console.log(width);

            return (
                <th key={cleanTitle}
                    ref={(th) => this[cleanTitle] = th}
                    style={{ width: width }}
                    data-col={cleanTitle}>
                    <span data-col={cleanTitle} className="header-cell">
                        {title}
                    </span>
                </th>
            );
        });
        return headerView;
    }

    renderNoData = () => {
        return (
            <tr>
                <td colSpan={this.props.headers.length}>
                    {this.noData}
                </td>
            </tr>
        )
    }

    onUpdate = (e) => {
        e.preventDefault();
        let input = e.target.firstChild;
        let header = this.state.headers[this.state.edit.cell];
        let rowId = this.state.edit.rowId;

        this.setState({
            edit: null
        });
        this.props.onUpdate(header.accessor, rowId, input.value);
    }



    onFormReset = (e) => {
        if (e.keyCode === 27) {
            this.setState({
                edit: null
            })
        }
    }

    onDelete = (e) => {
        let rowId = this.state.edit.rowId;

        this.setState({
            edit: null
        });

        this.props.onDelete(rowId);
    }

    renderContent = () => {
        let { headers, data } = this.state;
        let contentView = data.map((row, rowIdx) => {
            let id = row[this.keyField];
            let edit = this.state.edit;
            let tds = headers.map((header, index) => {
                let content = row[header.accessor];
                let hdr = this[header.accessor];
                let cell = header.cell;
                if (cell) {
                    if (typeof (cell) === "object") {
                        if (cell.type === "image" && content) {
                            content = <img style={cell.style} src={content} alt="avatar" />
                        } else if (cell.type === "button") {
                        }
                    } else if (typeof (cell) === "function") {
                        content = cell(content);
                    }
                }

                if (this.props.edit) {
                    if (header.dataType && (header.dataType === "number" ||
                        header.dataType === "string") &&
                        header.accessor !== this.keyField) {
                        if (edit && edit.row === rowIdx && edit.cell === index) {
                            content = (
                                <form onSubmit={this.onUpdate} style={{ width: hdr.accessor + "px" }}>
                                    <input type="text" defaultValue={content}
                                        onKeyUp={this.onFormReset} />
                                </form>
                            );
                        }
                    } else if (header.dataType && header.dataType === "number" && header.accessor === this.keyField) {
                        if (edit && edit.row === rowIdx && edit.cell === index) {
                            if (window.confirm("Delete user has id: " + id)) {
                                this.onDelete();
                            }
                        }
                    }
                }

                return (
                    <td key={index} data-id={id} data-row={rowIdx}>
                        {content}
                    </td>
                )
            });
            return (
                <tr key={rowIdx}>
                    {tds}
                </tr>
            );
        });

        return contentView;
    }

    onSort = (e) => {
        let data = this.state.data.slice();
        let colIndex = ReactDOM.findDOMNode(e.target).parentNode.cellIndex;
        let colTitle = e.target.dataset.col;

        let descending = !this.state.descending;

        data.sort((a, b) => {
            let sortValue = 0;
            if (a[colTitle] < b[colTitle]) {
                sortValue = -1;
            } else if (a[colTitle] > b[colTitle]) {
                sortValue = 1;
            }

            if (descending) {
                sortValue = -1 * sortValue;
            }
            return sortValue;
        });

        this.setState({
            data,
            sortby: colIndex,
            descending
        })
    }

    onSearch = (e) => {
        let { headers } = this.state;

        let data = this._preSearchData;

        let searchData = data.filter((row) => {
            let show = true;

            for (let i = 0; i < headers.length; i++) {
                let fieldName = headers[i].accessor;
                let fieldValue = row[fieldName];
                let inputId = 'inp' + fieldName;
                let input = this[inputId];
                if (!fieldValue === '') {
                    show = true;
                } else {
                    show = fieldValue.toString().toLowerCase().indexOf(input.value.toLowerCase()) > -1;
                    if (!show) break;
                }
            }
            return show;
        });

        // UPdate the state
        this.setState({
            data: searchData,
        });
    }

    renderSearch = () => {
        let { search, headers } = this.state;
        if (!search) {
            return null;
        }

        let searchInputs = headers.map((header, idx) => {
            let hdr = this[header.accessor];
            let inputId = 'inp' + header.accessor;

            return (
                <td key={idx}>
                    <input name="inputSearch" type="text"
                        ref={(input) => this[inputId] = input}
                        style={{ width: hdr.widthClient - 10 + "px" }}
                        data-idx={idx} />
                </td>
            );
        });
        return (
            <tr onChange={this.onSearch}>
                {searchInputs}
            </tr>
        );
    }

    onShowEditor = (e) => {
        let id = e.target.dataset.id;
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                rowId: id,
                cell: e.target.cellIndex
            }
        })
    }

    addNewUser = () => {
        this.setState({redirect:true})
    }

    renderTable = () => {
        let title = this.props.title || "User Table";
        let headerView = this.renderTableHeader();
        let contentView = this.state.data.length > 0 ?
            this.renderContent() :
            this.renderNoData();

        return (
            <table className="data-inner-table">
                <caption className="data-table-caption">
                    {title}
                    {/* <Link to="/users/add" style={{ float: 'right' }}>New User</Link> */}
                    <button onClick={this.addNewUser } style={{ float: 'right' }}>New User</button>
                </caption>
                <thead onClick={this.onSort}>
                    <tr>
                        {headerView}
                    </tr>
                </thead>
                <tbody onDoubleClick={this.onShowEditor}>
                    {this.renderSearch()}
                    {contentView}
                </tbody>
            </table>
        );
    }

    onToggleSearch = (e) => {
        if (this.state.search) {
            this.setState({
                data: this._preSearchData,
                search: false
            });
            this._preSearchData = null;
        } else {
            this._preSearchData = this.state.data;
            this.setState({
                search: true
            })
        }
    }

    renderToolbar = () => {
        return (
            <div className="toolbar">
                <button onClick={this.onToggleSearch}>
                    Search
                </button>
            </div>
        );
    }

    renderNote = () => {
        return (
            <div className="note">
                <div>Double Click <strong>ID</strong> to delete</div>
                <div>Double Click <strong>SOMETHING</strong> to edit</div>
            </div>
        )
    }
    render() {
        const { redirect } = this.state;
        return (
            <div className={this.props.className}>
                {this.renderTable()}
                {this.renderToolbar()}
                {this.renderNote()}
                {redirect && (
                    <Redirect push to="/users/add" />
                )}
            </div>
        );
    }
}