import React from 'react';
import { Card, Typography, Col, Divider} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const { Title } = Typography;

export default class HomeCard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Col lg={8} style={{display: 'flex', padding: '10px 10px', justifyItems: 'center'}}>
                <Link to={this.props.destination}>
                    <Card
                    style={{textAlign: 'center', height: '100%'}}
                    title={this.props.title}
                    // bordered
                    hoverable={true}
                    cover={<img
                        style={{padding: '1% 1%', objectFit: 'cover'}}
                        src={this.props.source}
                        />}
                    // actions={[
                    //     <Link to={this.props.destination}>
                    //         <ArrowRightOutlined/> Bắt đầu
                    //     </Link>
                    // ]}>
                    >
                    <Divider></Divider>
                        <Meta
                        // title={this.props.title}
                        description={this.props.content}
                        ></Meta>
                    </Card>
                </Link>
            </Col>
        );
    }
}