import React from "react";
import PopupProblem from "../api/Popup";
import { List, Card } from "antd";
import { Button } from "antd";
import { Row, Col } from "antd";
import { Checkbox, Divider } from "antd";
import { Select } from "antd";

import "antd/dist/antd.css";
import "../css/style.css";

const { Option } = Select;

const apiURL = process.env.REACT_APP_API_URL;

class ContentProblem extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        listProblem: [],
        idProblem: "",
        nameProblem: "",
        
        checkedAll: true,
        checked: [],
        grade: [],
        selectedGrade: "",
        isLoad: false,
        checkedList: [],
  
        
        indeterminate: true,
  
        checkAll: true,
        listSubject: [],
        selectedSubject: []
      };
      fetch(`${apiURL}/api/listproblem`, {
        method: "GET",
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
        });
      });
    }
  
    handleClose = (event) => {
      this.setState({ isOpen: !this.state.isOpen });
      document.getElementById("listProblem").style.display = null;
    };
  
    handleClick = (event, problemData) => {
      this.setState({
        isOpen: !this.state.isOpen,
        problemData: problemData
      });
      document.getElementById("listProblem").style.display = "none";
    };
  
    onChange = (list) => {
      this.setState({
        checkedList: list,
        indeterminate:
          !!list.length && list.length < this.state.listSubject.length,
        checkAll: list.length === this.state.listSubject.length,
      });
    };
  
    onCheckAllChange = (e) => {
      this.setState({
        checkedList: e.target.checked ? this.state.listSubject : [],
        checkAll: e.target.checked,
      });
    };
  
    render() {
      return (
        <>
          <Card
            loading={!this.state.isLoad}
            className="problem_list_card"
            id="listProblem"
          >
            <Row style={{ display: "block" }}>
              <Col span={24} style={{ padding: "0px 12px" }}>
                <Row gutter={16}>
                  <Col span={18} style={{ paddingBottom: "8px" }}>
                    <Col span={24}>
                      <Divider>Môn học</Divider>
                      {/* <React.Fragment key="allsubject"> */}
                      <Checkbox
                        // indeterminate={this.state.indeterminate}
                        onChange={(list) => this.onCheckAllChange(list)}
                        checked={this.state.checkAll}
                      >
                        Tất cả
                      </Checkbox>
                      {/* </React.Fragment> */}
                    </Col>
                    <Col span={24}>
                      <Checkbox.Group
                        style={{ padding: "4px 0", width: "100%" }}
                        value={this.state.checkedList}
                        onChange={(e) => this.onChange(e)}
                      >
                        <Row>
                          {this.state.listSubject.map((value) => {
                            return (
                              <React.Fragment key={value}>
                                <Col span={6} style={{ padding: "4px 0" }}>
  
                                  <Checkbox value={value}>
                                    {value}
                                  </Checkbox>
  
                                  </Col>
                              </React.Fragment>
  
                                
                            );
                          })}
                        </Row>
                      </Checkbox.Group>
                    </Col>
                  </Col>
  
                  <Col span={6}>
                    <Divider>Lớp</Divider>
                    <Row justify="center">
                      <Select
                        defaultValue={this.state.selectedGrade}
                        style={{ width: 120 }}
                        onChange={(event) => {
                          this.setState({ selectedGrade: event });
                        }}
                      >
                        <React.Fragment key="all">
                        <Option value="">Tất cả</Option>
                        </React.Fragment>
                        {this.state.grade.map((value) => {
                          return (
                            <React.Fragment key={value}>
                              <Option value={value}>
                                {"Lớp " + value}
                              </Option>
                              ;
                            </React.Fragment>
                          );
                        })}
                      </Select>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <div>
                  <List>
                    {this.state.listProblem.map((element) => {
                      var selectedSubject = this.state.checkedList;
                      if (this.state.checkAll) {
                        selectedSubject = this.state.listSubject;
                      }
                      if (
                        selectedSubject.includes(element.subject) &&
                        (this.state.selectedGrade === "" ||
                          this.state.selectedGrade === element.grade)
                      ) {
                        return (
                          <React.Fragment key={element.id}>
                            <List.Item
                              className="problen_listitem"
                              style={{ display: "block" }}
                            >
                              <Card
                                title={element.name}
                                extra={
                                  <Button
                                    type="primary"
                                    onClick={(e) =>
                                      this.handleClick(
                                        e,
                                        element
                                      )
                                    }
                                  >
                                    Chọn
                                  </Button>
                                }
                              >
                                {element.data.baitoan.description}
                              </Card>
                            </List.Item>
                          </React.Fragment>
                        );
                      }
                      else{
                        return(
                          <></>
                        )
                      }
                    })}
                  </List>
                </div>
              </Col>
            </Row>
          </Card>
          {this.state.isOpen && (
            <PopupProblem
            problemData={this.state.problemData}
              handleClose={this.handleClose}
            />
          )}
        </>
      );
    }
  }

  export default ContentProblem;