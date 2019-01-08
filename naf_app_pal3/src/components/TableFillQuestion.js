import React,{Component} from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Switch1 from "../images/Switch1.png";
import Switch2 from "../images/Switch2.png";
import Switch3 from "../images/Switch3.png";
import Switch4 from "../images/Switch4.png";


class TableFillQuestion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      triggered: false
    }
    this.renderEditable = this.renderEditable.bind(this);
    this.getColumnWidth = this.getColumnWidth.bind(this);
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.props.sendTableFillContent(this.props.id, cellInfo.index, cellInfo.column.id, e.target.innerHTML);
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  getColumnWidth (rows, accessor, headerText) {
    const maxWidth = 400
    const magicSpacing = 10
    const cellLength = Math.max(
      ...rows.map(row => (`${row[accessor]}` || '').length),
      headerText.length,
    )
    return Math.min(maxWidth, cellLength * magicSpacing)
  }

  componentDidMount() {

  }

  render() {
    // const images = ['../images/Switch1.png', '../images/Switch2.png', '../images/Switch3.png','../images/Switch2.png'];
    const images = [Switch1, Switch2, Switch3, Switch4];

    let {data} = this.state;
    data = data.map((row,index)=>{
        row.symbol = images[index];
        return row;
    });

    const columns = this.props.columns.map(column => {
      if(column.Header !== "Symbol"){
        return {
          ...column,
          Cell: this.renderEditable,
          maxWidth: 400,
          minWidth: Math.min(400, column.Header.length * 11)
        }
      }else {
        return { ...column,
                 Cell: (row) => {
                    return <div><img height={44} src={row.original.symbol}/></div>
                  }
               }
      }
    });

    let numAnswered = 0;
    data.forEach((object) => {
        if(object['breaks'] !== "")
          numAnswered++;
        if(object['poles'] !== "")
          numAnswered++;
        if(object['throws'] !== "")
          numAnswered++;
    });
    // if(numAnswered > 0 && !this.state.triggered) {
    //   this.props.triggerMark(this.props.id);
    //   this.state.triggered = true;
    // }
    // if(numAnswered == 0 && this.state.triggered) {
    //   this.props.triggerMark(this.props.id);
    //   this.state.triggered = false;
    // }
    // console.log(numAnswered);

    console.log(columns)

    return (
        <div>
          <ReactTable
            data = {data}
            columns = {columns}
            defaultPageSize={data.length}
            showPagination={false}
            className="-striped -highlight"
          />
          <br />
          <p><small><em>You have filled in {numAnswered} {numAnswered === 1 ? 'blank' : 'blanks'} in the table</em></small></p>
          <br />
        </div>
    )
  }

}


export default TableFillQuestion;
