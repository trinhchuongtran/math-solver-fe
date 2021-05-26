import React, {useState, useEffect, useCallback} from 'react';
import { Table, Tag, Space, Button } from 'antd';
import authHeader from "../services/auth-header";

const { Column, ColumnGroup } = Table;
function MonitorComponent(props) {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(true);

    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    useEffect(() => {
            fetch('http://127.0.0.1:6900/api/users', requestOptions)
                .then((res) => {
                    res.json().then((db) => {
                        setLoading(false);
                        for (let value of db) {
                            value.is_superuser = value.is_superuser ? "Quản trị viên": "Người định nghĩa";
                        }
                        setData(db);
                        console.log(db);
                    });
                }).catch(err => {
                console.log(err);
            })
        }
    );
    function upgrade(id) {
        fetch(`http://128.0.0.1:6900/api/users/${id}`, {
            method: 'PUT',
            headers: authHeader(),
        }).then((res) => {
            res.json().then((data) =>{
                console.log(data);
            })
        }).catch((err) => {
            console.log(err);
        })
    };

    function delete_user(id) {
        fetch(`http://128.0.0.1:6900/api/user/${id}`, {
            method: 'DELETE',
            headers: authHeader(),
            // body: JSON.stringify({
                // "id": id,
            // })
        }).then((res) => {
            res.json().then((data) => {
                console.log(data);
            })
        }).catch((err) => {
            console.log(err);
        })
    };

    function test(text) {
        console.log(text);
    }
    return (
        <Table dataSource={data} loading={loading}>
            <Column title="ID" dataIndex="id" key="id"/>
            <ColumnGroup title={"Tên"}>
                <Column title="Họ" dataIndex="first_name" key="first_name"/>
                <Column title="Tên" dataIndex="last_name" key="last_name"/>
            </ColumnGroup>
            <Column title="Email" dataIndex="email" key="email"/>
            <Column title="Quyền quản lý" dataIndex="is_superuser" key="is_superuser"/>
            <Column
                title="Hành động"
                key="action"
                render={(record) => (
                    <Space size="middle">
                        {/*<Button onClick={() => test(record.id)}>Test</Button>*/}
                        {/*<Button onClick={() => upgrade(record.id)}>Nâng cấp quyền</Button>*/}
                        <Button onClick={() => delete_user(record.id)}>Xoá tài khoản</Button>
                    </Space>
                    )}/>
        </Table>
    );
};

export default MonitorComponent;