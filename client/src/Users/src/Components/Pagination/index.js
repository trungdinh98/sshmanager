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

    onPageLengthChange = (e) => {
        e.preventDefault();
        this.setState({
            value: e.target.value
        })
        this.props.onPageLengthChange(e.target.value);
    }

    onPrevPage = (e) => {
        if(this.state.currentPage === 1) return;
        this.onGotoPage(this.state.currentPage - 1);
    }

    onNextPage = (e) => {
        if(this.state.currentPage > this.pages - 1) return;
        this.onGotoPage(this.state.currentPage + 1);
    }

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

    _getPaginationButton = (text) => {
        let className = 'pagination-btn';
        if(this.state.currentPage == text){
            className += '-current-page';
        }

        let html = (
            <text key = {`btn-${text}`}
                id={`btn-${text}`}
                className={className}
                onClick={(e) => {this.onGotoPage(text)}}>
                    {text}
                </text>
        );
        return html;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentPage != prevState.currentPage) {
            return {
               currentPage: nextProps.currentPage 
            }
        }
        return null;
    }

    render() {
        let totalRecords = this.props.totalRecords;
        let pages = Math.ceil(totalRecords/this.props.pageLength);
        this.pages = pages;
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

        let prevButton = (
            <text key="prev"
                className="pagination-btn prev"
                onClick={this.onPrevPage}>
                    {"<"}
                </text>
        )
        let nextButton = (
            <text key="next"
                className="pagination-btn next"
                onClick={this.onNextPage}>
                    {">"}
                </text>
        )

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