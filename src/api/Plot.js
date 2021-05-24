import React, { useEffect, useState } from "react";
import MathJax from 'react-mathjax2'
import authHeader from '../services/auth-header';
import PlotImage from '../components/plot-image.component';
import { Row, Col,Card } from 'antd';

function Plot(props) {
    var [result, setResult] = useState("");
    var [result_detail, setResultDetail] = useState("");
    const [loading, setLoading] = useState(false);

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "input": props.tex,
        "variable": "x",
    });

    var requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: raw,
        redirect: 'follow'
    };

    
    // function handleClick(e) {
    //     e.preventDefault();
    useEffect(() => {

        fetch("http://api.bkmathapp.tk/api/plot_api", requestOptions)
            .then((res) => {
                res.json().then((db) => {
                    // console.log(db.detail);
                    var result_api = "";
                    let valuesArray = Object.values(db.detail);
                    let i = 1;
                    for (let value of valuesArray) {
                        // console.log(value);
                        if (typeof value == "number") {
                            continue;
                        }
                        if (typeof value == "object") {
                            let valuesArray1 = Object.values(value);

                            for (let value of valuesArray1) {
                                result_api = result_api + value + "\\" + "\\";
                                i++;
                            }
                        } else {
                            result_api = result_api + value + "\\" + "\\";
                            i++;
                        }
                    }
                    setResultDetail(result_api);
                    var x = "data:image/png;base64,";
                    console.log(result_api);

                    setResult(db.result);
                    setLoading(true);
                });
            }).catch(err => {
                console.log(err);
        });
    })
        
    // }



    return (
        <div>
        <Row>
            <Col span={18}>
                <Card title="Khảo sát đồ thị" loading={!loading}>
                <MathJax.Context
                input='tex'
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
                    <MathJax.Node>{result_detail}</MathJax.Node>
                </div>
                </MathJax.Context>
            {/* {result ? <img style={{"width": "40%"}} src={`data:image/jpeg;base64,${result}`} />: null } */}
                </Card>
            </Col>
            <Col span={6}>
                <PlotImage result={result} loading={!loading}/>
            </Col>
        </Row>
        
        </div>
    )
};

export default Plot;
