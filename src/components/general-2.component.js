import React, { useState } from "react";

import { Button } from "antd";

import Plot from "../api/Plot";
import authService from "../services/auth.service";
import General3 from "./general-3.component";

import { EditOutlined } from "@ant-design/icons";

// export default class General2 extends Component {
function General2() {
  var [input_latex, setInputLatex] = useState(""); 

  return (
    <div>
      {/* <math-field id="formula" style={{
        backgroundColor: "#c0cacc",
        height: "50px",
        borderRadius: "10px",
        color: "#000000",
        fontSize: "20px",
        width: "100%"
      }}></math-field>
    
      <Button style={{
        marginTop: "10px"
      }} onClick={() => {
        setInputLatex(document.getElementById('formula').getValue("latex"));
      }} id="submit">Submit</Button>
      <Plot id="result" tex={input_latex}></Plot>  */}
    </div> 
  )
}

export default General2;