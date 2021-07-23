import React from "react";
import { List, Card } from "antd";
import { Button } from "antd";
import { Row, Col } from "antd";
import { Select } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import MathJax from "react-mathjax2";

import "antd/dist/antd.css";
import "../css/style.css";
import listExer from '../staticdata/exercisedata.json';
import ContentProblem from "../components/ContentProblem";


const { SubMenu } = Menu;

export default function Problem() {
  const listfunc = [
    {
      key: "dathuc",
      title: "Đa thức",
      sub: [
        {
          key: "ptb1",
          title: "PT bậc 1",
        },
        {
          key: "ptb2",
          title: "PT bậc 2",
        },
        {
          key: "ptb4",
          title: "PT bậc 4 trùng phương",
        },
        {
          key: "ptbc",
          title: "PT bậc cao",
        },
      ],
    },
    {
      key: "trigo",
      title: "Lượng giác",
      sub: [
        {
          key: "ptb1_trigo",
          title: "PT bậc 1",
        },
        {
          key: "ptb2_trigo",
          title: "PT bậc 2",
        },
        {
          key: "ptb4_trigo",
          title: "PT bậc 4 trùng phương",
        },
      ],
    },
    {
      key: "hpt",
      title: "Hệ PT",
      sub: [
        {
          key: "hptb1",
          title: "Hệ PT bậc 1",
        },
      ],
    },
    {
      key: "ptc",
      title: "PT căn",
      sub: [
        {
          key: "ptc",
          title: "PT căn",
        },
      ],
    },
  ];

  return (
    <Row
      gutter={12}
      style={{ marginTop: "24px", minWidth: "100%", minHeight: "80vh" }}
    >
      <Col span={6}>
        <Row>
          <Col span={24}>
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              className="menu"
            >
              {listfunc.map((item) => {
                return (
                  <React.Fragment key={item.key}>
                  <SubMenu title={item.title}>
                    {item.sub.map((subitem) => {
                      return (
                        <React.Fragment key={subitem.key}>
                        <Menu.Item>
                          <Link
                            to={{
                              pathname: "/polynomial",
                              state: { selectedType: subitem.key },
                            }}
                          >
                            {subitem.title}
                          </Link>
                        </Menu.Item>
                        </React.Fragment>
                      );
                    })}
                  </SubMenu>
                  </React.Fragment>
                );
              })}
            </Menu>
          </Col>
          <Col span={24}>
            <Card title="Bài tập" className="polynomial_exer_card">
              <List>
                <Row>
                  {listExer.map((item) => {
                    return (
                      <React.Fragment key={item.key}>
                      <Col span={24} className="polynomial_poly_item">
                        <Link
                          to={{
                            pathname: "/exercise",
                            state: { polynomial: item.value },
                          }}
                        >
                          <Button className="polynomial_poly_button" block>
                            <MathJax.Context>
                              <MathJax.Node>{item.value}</MathJax.Node>
                            </MathJax.Context>
                          </Button>
                        </Link>
                      </Col>
                      </React.Fragment>
                    );
                  })}
                </Row>
              </List>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={18} className="problem_contentproblem">
        <ContentProblem />
      </Col>
    </Row>
  );
}
