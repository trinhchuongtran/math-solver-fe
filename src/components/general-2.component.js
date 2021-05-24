import React, { useState } from "react";

import BoardUser from "./board-user.component";
import MathInput from "./math-input.component";
import Plot from '../api/Plot';
import { Tabs, Button, Row, Col} from 'antd';

// export default class General2 extends Component {
const { TabPane } = Tabs;
function General2() {
  const [input_latex, setInputLatex] = useState('');
  return (
    // <div className="card-container">
    //   <MathInput></MathInput>
    //   <Tabs type="card">
    //     <TabPane tab="Đa thức" key="polynomial">
    //       <BoardUser></BoardUser>
    //     </TabPane>
    //     <TabPane tab="Đồ thị" key="graph">
    //       <p>Đồ thị</p>
    //     </TabPane>
    //   </Tabs>
    // </div>
    <div>
      <Row style={{ padding: '16px 0'}}>
        <Col span={21}>
        <math-field id="formula" style={{
          backgroundColor: "#c0cacc",
          height: "50px",
          borderRadius: "10px",
          color: "#000000",
          fontSize: "20px",
          width: "100%"
        }}></math-field>
        </Col>
        <Col span={3}>
          <Col span={22} offset={1}>
            <Button style={{
              marginTop: "10px"
              }} onClick={() => {
              setInputLatex(document.getElementById('formula').getValue("latex"));
              }} id="submit">Submit</Button>      
          </Col>
        </Col>
      </Row>
      
    
      
      <Plot id="result" tex={input_latex}></Plot>
    </div>
  )
}

export default General2;