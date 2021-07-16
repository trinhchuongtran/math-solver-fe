import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";

export default function FooterContent() {
  return (
    <Row
      style={{
        backgroundColor: "white",
        height: "50px",
        position: "fixed",
        bottom: "0",
        width: "100%",
      }}
    >
      <Row
        justify="space-between"
        style={{ padding: "0 150px", width: "100%" }}
      >
        <Col span={8} style={{ margin: "auto 0", paddingLeft: "20px" }}>
          Ứng dụng hỗ trợ cho học sinh THCS giải bài tập
        </Col>
        <Col span={4} style={{ margin: "auto 0", textAlign: "end" }}>
          Copyright © 2021
        </Col>
      </Row>
    </Row>
  );
}
