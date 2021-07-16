import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { List, Card } from "antd";
import { Steps, Step } from "react-step-builder";
import { Button } from "antd";
import { Row, Col } from "antd";
import { Checkbox, Divider } from "antd";
import { Select } from "antd";
import { Layout } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import DefineInfo from "./define/defineInfo"
import DefineStepOne from "./define/defineStepOne";
import defineStepTwo from "./define/defineStepTwo";
import DefineProplem from "./define/defineProplem";
const { Option } = Select;
const initialSchema1 = {
  "nodes": [
    {
      "id": "node-1",
      "content": "Bài toán gốc",
      "cal": "",
      "con": "",
      "des": "",
      "handle": "",
      "coordinates": [
        400,
        200
      ],
      "outputs": [
        {
          "id": "node-1",
          "alignment": "bottom"
        }
      ]
    }
  ]
};
const Navigation = (props) => {
  console.log({ props });


  return (
    <div>
      <Row align="center">
        <div>{props.title}</div>
        <div>{props.allSteps[props.current - 1].title}</div>
      </Row>
      <Row align="center">
        <Col>
          <Button type="primary" onClick={props.prev} style={{ marginRight: 10 }}>
            Quay lại
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={props.next}>
            Tiếp theo
          </Button>
        </Col>
      </Row>
    </div>

  );
};
const config = {
  navigation: {
    component: Navigation, // a React component with special props provided automatically
    location: "after" // or before
  }
};

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
      checkAll: true,
      data: null
    };
    fetch("http://api.bkmathapp.tk/api/listproblem", {
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
  handleClickNew = (event, id, nameProblem) => {

    this.setState({
      isOpen: !this.state.isOpen,
      idProblem: id,
      nameProblem: nameProblem,
      data: initialSchema1
    });
    this.setState({ nameProblem: nameProblem });
    console.log(this.state.nameProblem);
    document.getElementById("listProblem").style.display = "none";
  };


  handleClose = (event) => {
    this.setState({ isOpen: !this.state.isOpen });
    document.getElementById("listProblem").style.display = null;
  };

  handleClick = (event, id, nameProblem) => {

    this.setState({
      isOpen: !this.state.isOpen,
      idProblem: id,
      nameProblem: nameProblem,
    });
    this.setState({ nameProblem: nameProblem });
    console.log(this.state.nameProblem);
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
      indeterminate: false,
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
          <Button onClick={(e) =>
            this.handleClickNew(
              e,
              "1",
              "2",
            )
          }>Định nghĩa bài toán mới</Button>
          <Row style={{ display: "block" }}>
            <Col span={24} style={{ padding: "0px 12px" }}>
              <Row gutter={16}>
                <Col span={18} style={{ paddingBottom: "8px" }}>
                  <Col span={24}>
                    <Divider>Môn học</Divider>
                    <Checkbox
                      indeterminate={this.state.indeterminate}
                      onChange={(list) => this.onCheckAllChange(list)}
                      checked={this.state.checkAll}
                    >
                      Tất cả
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox.Group
                      style={{ padding: "4px 0" }}
                      value={this.state.checkedList}
                      onChange={(e) => this.onChange(e)}
                    >
                      <Row>
                        {this.state.listSubject.map((value) => {
                          return (
                            <Col span={6} style={{ padding: "4px 0" }}>
                              <Checkbox value={value}>{value}</Checkbox>
                            </Col>
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
                      <Option value="">Tất cả</Option>
                      {this.state.grade.map((value) => {
                        return <Option value={value}>{"Lớp " + value}</Option>;
                      })}
                    </Select>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <div>
                <List>
                  {this.state.listProblem.map((element, i) => {
                    var selectedSubject = this.state.checkedList;
                    if (this.state.checkAll) {
                      selectedSubject = this.state.listSubject;
                    }
                    if (
                      selectedSubject.includes(element.subject) &&
                      (this.state.selectedGrade == "" ||
                        this.state.selectedGrade == element.grade)
                    ) {
                      return (
                        <>
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
                                      element.id,
                                      element.name
                                    )
                                  }
                                >
                                  Chọn
                                </Button>
                              }
                            >
                              {element.description}
                            </Card>
                          </List.Item>
                        </>
                      );
                    }
                  })}
                </List>
              </div>
            </Col>
          </Row>
        </Card>
        {this.state.isOpen && (
          <Steps style={{ height: "1000px" }} config={config}>
            <Step style={{ height: "100%" }} component={DefineInfo} title="Bước 1: Nhập thông tin bài toán " />
            <Step style={{ height: "100%" }} component={DefineStepOne} title="Bước 1: Định nghĩa đề bài" />
            <Step style={{ height: "100%" }} component={defineStepTwo} title="Định nghĩa biến số " />
            <Step style={{ height: "100%" }} component={DefineProplem} title="Định nghĩa bài giải" />
          </Steps>
        )
        }
      </>
    );
  }
}





export default class BoardModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (!user) this.setState({ redirect: "/login" });
    else if (!["moderator", "admin"].includes(user.role)) this.setState({ redirect: "/home" });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="container">
        <header className="jumbotron">
          <ContentProblem></ContentProblem>
        </header>
      </div>
    );
  }
}
