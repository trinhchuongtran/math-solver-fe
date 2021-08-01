import React, { useState } from "react";
import 'antd/dist/antd.css';
import { Card } from 'antd';
// import { Divider } from 'antd';
// import { Typography } from "antd";
import MathJax from 'react-mathjax2'

// const { Title } = Typography;

function Results(prop) {
    // console.log(prop);
    var [result, setResult] = useState("");
    var [isLoading, setIsLoading] = useState(true);
    // fetch("http://127.0.0.1:6900/api/polynomial_vnkey", {
    fetch("http://api.bkmathapp.tk/api/polynomial_vnkey", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input: prop.tex,
            variable: prop.var
            // variable: "x"
        })
    }).then(res => {
        res.json().then(db => {

            var result_api = "";
            let valuesArray = Object.values(db.result);
            // let i = 1;
            // result_api = " \\begin{ array } { l }"
            for (let value of valuesArray) {

                if (typeof value == "number") {
                    continue;
                }
                if (typeof value == "object") {
                    let valuesArray1 = Object.values(value);

                    for (let value of valuesArray1) {

                        result_api = result_api + value + "\\";
                        // i++;
                    }
                } else {
                    result_api = result_api + value + "\\";
                    // i++;
                }
            }
            // result_api = result_api + " \\end{ array }"
            setResult(result_api)
            setIsLoading(false)
        })
    }).catch(err => {

        console.log("test1");
    })
    // let logicJS = (brd) => {
    //     var c = brd.create('functiongraph', [function (x) { return x + 1; }, -4, 4], { strokeColor: '#000000', strokeWidth: 3 });
    //     brd.unsuspendUpdate();
    // }
    return (
        <Card loading={isLoading} title="Lời giải chi tiết">
            {/* <math-field style={{ height: "200px" }}>{result}</math-field> */}
            <MathJax.Context input='tex'
                options={{
                    displayAlign: 'left',
                    mathmlSpacing: false,
                    displayIndent: '0',
                    paddingLeft: true,
                    skipHtmlTags: [
                        '+'
                    ],
                    inlineMath: [['$', '$'], ['\\(', '\\)']],
                    processEscapes: true,
                    tex: {
                        packages: { '[+]': ['color'] },
                    }
                }}
            >
                <div>
                    <MathJax.Node>{result}</MathJax.Node>
                </div>
            </MathJax.Context>
        </Card>
    )
};

export default Results;
