import React, { Component, Fragment } from 'react';
import './pagination.css';

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.currentPage = 1;
        this.pageLength = props.pageLength;
        this.state = {
            value: "5",
            currentPage: props.currentPage || 1
        }
        this.onPageLengthChange = this.onPageLengthChange.bind(this);
    }

    //lấy số dòng tối đa hiển thị cho bảng
    onPageLengthChange = (e) => {
        e.preventDefault();
        this.setState({
            value: e.target.value
        })
        this.props.onPageLengthChange(e.target.value);
    }

    //chuyển đến phân trang liền trước
    onPrevPage = (e) => {
        if(this.state.currentPage === 1) return;
        this.onGotoPage(this.state.currentPage - 1);
    }

    //chuyển đến phân trang liền sau
    onNextPage = (e) => {
        if(this.state.currentPage > this.pages - 1) return;
        this.onGotoPage(this.state.currentPage + 1);
    }

    //chuyển phân trang
    onGotoPage = (pageNo) => {
        if(pageNo === this.state.currentPage){
            return;
        }
        if(this.currentPageInput) {
            this.currentPageInput.value = pageNo;
        }
        this.setState({
            currentPage: pageNo
        })
        this.props.onGotoPage(pageNo);
    }

    //tạo số phân trang 1 2 3...
    _getPaginationButton = (text) => {
        let className = 'pagination-btn';
        if(this.state.currentPage === text){
            className += '-current-page';
        }

        let html = (
            <span key = {`btn-${text}`}
                id={`btn-${text}`}
                className={className}
                onClick={(e) => {this.onGotoPage(text)}}>
                    {text}
                </span>
        );
        return html;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentPage !== prevState.currentPage) {
            return {
               currentPage: nextProps.currentPage 
            }
        }
        return null;
    }

    //hiển thị
    render() {
        let totalRecords = this.props.totalRecords; // tổng số object trong data
        let pages = Math.ceil(totalRecords/this.props.pageLength); // số lượng phân trang
        this.pages = pages;
        //selector lựa chọn số lượng hiển thị 5 10 15 object mỗi phân trang
        let pageSelector = (
            <Fragment key ="f-page-selector">
                <span key="page-selector" className="page-selector">
                    <select key = "page-input" onChange={this.onPageLengthChange} value={this.state.value}>
                        <option value = "5">5</option>
                        <option value = "10">10</option>
                        <option value = "15">15</option>
                    </select>
                </span>
            </Fragment>
        )

        //button chuyển phân trang liền trước
        let prevButton = (
            <span key="prev"
                className="pagination-btn prev"
                onClick={this.onPrevPage}>
                    {"<"}
                </span>
        )
        //button chuyển phân trang liền sau
        let nextButton = (
            <span key="next"
                className="pagination-btn next"
                onClick={this.onNextPage}>
                    {">"}
                </span>
        )

        //button các phân trang 1 2 3 ...
        let buttons = [];
        for(let i = 1; i <=pages; i++){
            buttons.push(this._getPaginationButton(i));
        }
        return (
            <div className="pagination">
                {
                    [pageSelector, prevButton, buttons, nextButton]
                }
            </div>
        )
    }
}
