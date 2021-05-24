import React from 'react';
import { Image, Card } from 'antd';

function PlotImage(props) {
    return (
        <Card title="Đồ thị" loading={props.loading}>
            {/* {props.result ? */}
            <Image
            width={'100%'}
            src={`data:image/jpeg;base64,${props.result}`}/>
            {/* :
            null
            } */}
        </Card>
    )
};

export default PlotImage;