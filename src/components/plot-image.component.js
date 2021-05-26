import React from 'react';
import { Image, Card, Divider } from 'antd';

function PlotImage(props) {
    return (
        <Card title="Đồ thị" style={{width: '100%'}}>
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