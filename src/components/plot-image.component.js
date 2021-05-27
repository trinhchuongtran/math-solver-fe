import React from 'react';
import { Image, Card, Divider } from 'antd';
import "../css/style.css";

function PlotImage(props) {
    return (
        <Card title="Đồ thị" className="graph_img_card">
            {/* {props.result ? */}
            <Image
            width={'100%'}
            //     style={{display: 'flex', justify: 'center'}}
            src={`data:image/jpeg;base64,${props.result}`}/>
            {/* :
            null
            } */}
        </Card>
    )
};

export default PlotImage;