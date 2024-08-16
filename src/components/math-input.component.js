import React from "react";
import { Row, Col, Button} from "antd";

function MathInput() {
    return (
        <Row>
            <Col span={21}>
                <math-field
                    id="formula"
                    style={{
                    width: "100%",
                    backgroundColor: "#c0cacc",
                    height: "40px",
                    borderRadius: "10px",
                    color: "#000000",
                    fontSize: "20px",
                    }}
                ></math-field>
            </Col>
            <Col span={3}>
            <Button
              type="primary"
              block
              style={{ height: "40px" }}
            //   onClick={handleClickOpen}
            >
              Submit
            </Button>
            </Col>
        </Row>
    )
}
export default MathInput;