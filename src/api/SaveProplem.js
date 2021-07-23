import React, { useEffect, useState } from "react";
import MathJax from "react-mathjax2";
import authHeader from "../services/auth-header";
import PlotImage from "../components/plot-image.component";
import { Row, Col, Card } from "antd";
import { Redirect } from "react-router-dom";

function SaveProplem(props) {
    console.log(props);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var raw = JSON.stringify(props);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://api.bkmathapp.tk/api/defineproblem", requestOptions)
        .then((response) => {
            response.json().then((db) => {
                console.log(db);
            })
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

export default SaveProplem;