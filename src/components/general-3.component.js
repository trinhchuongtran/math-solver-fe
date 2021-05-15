import React, { Component } from "react";
import Popup from "../api/Popup";
import { List, Card } from 'antd';
import { Button } from 'antd';
import { Row, Col } from 'antd';
import { Checkbox, Divider } from 'antd';
import { Select } from 'antd';
import { Layout } from 'antd';

import 'antd/dist/antd.css';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;
const { Header, Footer, Sider, Content } = Layout;

class ContentProblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      listProblem: [],
      idProblem: "",
      nameProblem: "",
      listSubject: [],
      selectedSubject: [],
      checkedAll: true,
      checked: [],
      grade: [],
      selectedGrade: "",
      isLoad: false,
      checkedList: [],
      indeterminate: true,
      checkAll: true
    };
    fetch("http://127.0.0.1:8000/api/list_problem", {
      method: "POST",
    }).then((res) => {
      res.json().then((db) => {
        var listSubject = [];
        var listGrade = [];
        db.result.forEach((element) => {
          if (!listSubject.includes(element.subject)) {
            listSubject.push(element.subject);
          }
          if (!listGrade.includes(element.grade)) {
            listGrade.push(element.grade);
          }
        });
        this.setState({
          listProblem: db.result,
          listSubject: listSubject,
          checkedList: listSubject,
          grade: listGrade,
          isLoad: true,
        });
        console.log(this.state.isLoad)
      });
    });
  }

  handleClose = (event) => {
    this.setState({ isOpen: !this.state.isOpen });
    document.getElementById("listProblem").style.display = null;
  };

  handleClick = (event, id, nameProblem) => {
    this.setState({ isOpen: !this.state.isOpen, idProblem: id});
    console.log(nameProblem)
    this.setState({nameProblem: nameProblem})
    console.log(this.state.nameProblem)
    document.getElementById("listProblem").style.display = "none";
  };



  onChange = list => {
    this.setState({
      checkedList: list,
      indeterminate: !!list.length && list.length < this.state.listSubject.length,
      checkAll: list.length === this.state.listSubject.length
    })
  };

  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? this.state.listSubject : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  };

  render() {
    const { classes } = this.props;
    return (
      <Row style={{ display: "block"}}>
        {this.state.isLoad && (
          <Row className="listProblem" id="listProblem">
          <Col span={6} style={{padding: "0px 12px"}}>
            <Divider>Subject</Divider>
            <Col span={18} style={{paddingBottom: "8px"}}>
            <Checkbox indeterminate={this.state.indeterminate} onChange={(list) => this.onCheckAllChange(list)} checked={this.state.checkAll}>
              All
            </Checkbox>
            </Col>
            <Col span={18}>
            <Checkbox.Group style={{ padding: '4px 0' }} value={this.state.checkedList} onChange={(e) => this.onChange(e)}>
              <Row>
                {this.state.listSubject.map((value) => {
                  return (
                    <Col span={12} style={{ padding: '4px 0' }}>
                      <Checkbox value={value}>{value}</Checkbox>
                    </Col>
                  )
                })}
                </Row>
              </Checkbox.Group>
            </Col>
            <Divider>Grade</Divider>
            <Select defaultValue={this.state.selectedGrade} style={{ width: 120 }} onChange={(event) => {
                        this.setState({ selectedGrade: event});
                      }}>
              <Option value="">All</Option>
              {this.state.grade.map((value) => {
                  return (<Option value={value}>{"Grade " + value}</Option>)
                })}
            </Select>
          </Col>
          <Col span={18}>
          <div>
                <List>
                  {this.state.listProblem.map((element, i) => {
                    var selectedSubject = this.state.checkedList;
                    if (this.state.checkAll) {
                      selectedSubject = this.state.listSubject
                    }
                    if (
                      selectedSubject.includes(element.subject) &&
                      (this.state.selectedGrade == "" ||
                        this.state.selectedGrade == element.grade)
                    ) {
                      return (
                        <List.Item style={ {display: "block"} }>
                          <Card title={element.name} extra={(<Button type="primary" onClick={(e) => this.handleClick(e, element.id, element.name)}>Choose</Button>)}>
                          {element.description}
                          </Card>
                        </List.Item>
                      );
                    }
                  })}
                </List>
            </div>
        </Col>
        </Row>
        )}
        <div className="popup">
          {this.state.isOpen && (
            <Popup
              idProblem={this.state.idProblem}
              nameProblem = {this.state.nameProblem}
              handleClose={this.handleClose}
            />
          )}
        </div>
      </Row>
    );
  }
}

export default class General3 extends Component {
  render() {
    return (
      <>
      <ContentProblem></ContentProblem>
      </>
    );
  }
}