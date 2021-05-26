import React, { useEffect, useState } from "react";
import MathJax from 'react-mathjax2'
import authHeader from '../services/auth-header';
import PlotImage from '../components/plot-image.component';
import { Row, Col,Card } from 'antd';
import toBoolean from "validator/es/lib/toBoolean";

function Plot(props) {
    var [result, setResult] = useState("");
    var [result_detail, setResultDetail] = useState("");
    const [loading, setLoading] = useState(false);
    const [survey, setSurvey] = useState(false);

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
        // fetch("http://127.0.0.1:6900/api/plot_api", requestOptions)
            .then((res) => {
                res.json().then((db) => {
                    // console.log(db.detail);
                    setSurvey(db.detail? true: false)
                    if (db.detail) {
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
                    }
                    var x = "data:image/png;base64,";
                    console.log(result_api);

                    setResult(db.result);
                    setLoading(true);
                });
            }).catch(err => {
                console.log(err);
        });
    }, [])
        
    // }



    return (
        <div>
            {loading?
                <div>
                {survey?
                        <Row>
                                <Card title="Khảo sát đồ thị" style={{height: '100%'}}>
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
                                                packages: {'[+]': ['color']},
                                            }
                                        }}
                                    >
                                        <div>
                                            <MathJax.Node>{result_detail}</MathJax.Node>
                                        </div>
                                    </MathJax.Context>
                                    {/* {result ? <img style={{"width": "40%"}} src={`data:image/jpeg;base64,${result}`} />: null } */}
                                </Card>
                                {/*</Col>*/}


                        </Row>
                    :null}
                        <Row>
                            <PlotImage result={result} style={{width: '100%'}}/>
                        </Row>
                    </div>
            :
            null}
        </div>
    );
};

export default Plot;
