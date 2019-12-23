import React from 'react';
import ReactDOM from 'react-dom';
import './datatable.css';
import Pagination from '../Pagination';

export default class DataTable extends React.Component {
    _preSearchData = null;
    constructor(props) {
        super(props);

        this.state = {
            headers: props.headers,
            data: props.data,
            pagedData: props.data,
            sortby: null,
            descending: null,
            search: false,
            direct: false,
            pageLength: props.pagination.pageLength || 5,
            currentPage: 1,
        }
        this.keyField = props.keyField || "user_id";
        this.noData = props.noData || "No records found!";
        this.width = props.width || "100%";

        this.pagination = this.props.pagination || {};
    }

    //hiển thị header của bảng
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

            return (
                <th key={cleanTitle}
                    ref={(th) => this[cleanTitle] = th}
                    style={{ width: width }}
                    data-col={cleanTitle}>
                    <span data-col={cleanTitle} className="header-cell" >
                        {title}
                    </span>
                </th>
            );
        });
        return headerView;
    }

    //hiển thị thông tin bảng không có dữ liệu
    renderNoData = () => {
        return (
            <tr>
                <td colSpan={this.props.headers.length} >
                    {this.noData}
                </td>
            </tr>
        )
    }

    //cập nhật thông tin row khi edit
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

    //ấn Esc để thoát chỉnh sửa thông tin
    onFormReset = (e) => {
        if (e.keyCode === 27) {
            this.setState({
                edit: null
            })
        }
    }

    //hiển thị thông tin body của bảng
    renderContent = () => {
        let { headers } = this.state;
        let data = this.pagination ? this.state.pagedData : this.state.data;
        let contentView = data.map((row, rowIdx) => {
            let id = row[this.keyField];
            let edit = this.state.edit;
            let tds = headers.map((header, index) => {
                let content = row[header.accessor];
                let hdr = this[header.accessor];

                //hiển thị form edit, kiểm tra ô khác với user_id cho phép chỉnh sửa
                if (this.props.edit) {
                    if (header.dataType && (header.dataType === "number" ||
                        header.dataType === "string") &&
                        header.accessor !== this.keyField) {
                        if (edit && edit.row === rowIdx && edit.cell === index) {
                            content = (
                                <form onSubmit={this.onUpdate} style={{ width: hdr.accessor + "px" }} >
                                    <input type="text"
                                        defaultValue={content}
                                        onKeyUp={this.onFormReset} />
                                </form>
                            );
                        }
                    }
                }

                return (
                    <td key={index} data-id={id} data-row={rowIdx} >
                        {content}
                    </td>)
            });
            return (
                <tr key={rowIdx} >
                    {tds}
                </tr>
            );
        });

        return contentView;
    }
    // sắp xếp bảng theo cột                
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
        }, () => {
            this.onGotoPage(this.state.currentPage)
        })
    }

    //tìm kiếm user theo 1 thông tin nhập vào                    
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
                    if (!show)
                        break;
                }
            }
            return show;
        });
        // hiển thị thông tin tìm kiếm được
        this.setState({
            data: searchData,
            pagedData: searchData,
            totalRecords: searchData.length
        }, () => {
            if (this.pagination.enabled) {
                this.onGotoPage(1);
            }
        });
    }

    //hiển thị form để nhập thông tin tìm kiếm
    renderSearch = () => {
        let { search, headers } = this.state;

        if (!search) {
            return null;
        }
        //lấy ra giá trị tìm kiếm                
        let searchInputs = headers.map((header, idx) => {
            let hdr = this[header.accessor];
            let inputId = 'inp' + header.accessor;
            return (
                <td key={idx} >
                    <input id="inputSearch"
                        type="text"
                        ref={(input) => this[inputId] = input}
                        style={{ width: hdr.widthClient - 20 + "px" }}
                        data-idx={idx} />
                </td >
            );
        });
        return (
            <tr onChange={this.onSearch} >
                {searchInputs}
            </tr>
        );
    }

    //thông tin về ô sẽ chỉnh sửa khi double click
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

    //hiển thị bảng
    renderTable = () => {
        let title = this.props.title || "User Table";
        let headerView = this.renderTableHeader();
        let contentView = this.state.data.length > 0 ? this.renderContent() : this.renderNoData();

        return (
            <table className="data-inner-table" >
                <caption className="data-table-caption" >
                    {title}
                    <button onClick={this.onToggleSearch} className="toolbar" style={{ float: 'right' }} >Search</button>
                </caption >
                <thead onClick={this.onSort} >
                    <tr >
                        {headerView}
                    </tr>
                </thead >
                <tbody onDoubleClick={this.onShowEditor} >
                    {this.renderSearch()}
                    {contentView}
                </tbody>
            </table >
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

    //hiển thị ghi chú
    renderNote = () => {
        return (
            <div className="note" >
                <div> Double Click <strong> SOMETHING </strong> to edit</div>
            </div>
        )
    }

    //lấy dữ liệu từng trang khi phân trang
    getPagedData = (pageNo, pageLength) => {
        let startOfRecord = (pageNo - 1) * pageLength;
        let endOfRecord = startOfRecord + pageLength;
        let data = this.state.data;
        let pagedData = data.slice(startOfRecord, endOfRecord);
        return pagedData;
    }

    //lấy số lượng dòng của bảng khi có thay đổi
    onPageLengthChange = (pageLength) => {
        this.setState({
            pageLength: parseInt(pageLength, 10)
        }, () => {
            this.onGotoPage(this.state.currentPage);
        });
    }

    //di chuyển đến phân trang khác
    onGotoPage = (pageNo) => {
        let pagedData = this.getPagedData(pageNo, this.state.pageLength);
        this.setState({
            pagedData: pagedData,
            currentPage: pageNo
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        
        // console.log(nextProps.data.length, prevState.data.length)
        if (nextProps.data.length === 0) {
            return {
                data: nextProps.data,
                pagedData: nextProps.data,
            }
        } 

        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.data.length !== 0 && prevState.data === prevState.pagedData) {
            this.getPagedData(1, 5);
            this.onGotoPage(1);
        }
    }

    //hiển thị toàn bộ trang
    render() {
        return (
            <div className={this.props.className} >
                {this.pagination.enabled &&
                    <Pagination
                        totalRecords={this.state.data.length}
                        pageLength={this.state.pageLength}
                        onPageLengthChange={this.onPageLengthChange}
                        onGotoPage={this.onGotoPage}
                        currentPage={this.state.currentPage}
                    />
                }
                {this.renderTable()}
                {this.renderNote()}
            </div>
        );
    }
}
