import React, {useState, useEffect, useCallback} from 'react';
import { Table, Tag, Space, Button, Popconfirm } from 'antd';
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
                        // setUpdateLoading(false);
                        // for (let value of db) {
                        //     value.is_superuser = value.is_superuser ? "Quản trị viên": "Người định nghĩa";
                        // }
                        setData(db);
                        console.log(db);
                    });
                }).catch(err => {
                console.log(err);
            })
        }
    );
    function upgrade(id) {
        fetch(`http://127.0.0.1:6900/api/users/${id}`, {
        // fetch(`http://api.bkmathapp.tk/api/user/${id}`, {
            method: 'PUT',
            headers: authHeader(),
            body: JSON.stringify({
                "is_superuser": true
            })
        }).then((res) => {
            res.json().then((data) =>{
                console.log(data);
            })
        }).catch((err) => {
            console.log(err);
        })
    };

    function delete_user(id) {
        setLoading(true);
        fetch(`http://127.0.0.1:6900/api/users/${id}`, {

        // fetch(`http://api.bkmathapp.tk/api/user/${id}`, {
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
        });
        setLoading(false);
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
            <Column title="Quyền quản lý"
                    render={(record) => (!!record.is_superuser ? "Quản trị viên" : "Người định nghĩa")}/>
            <Column
                title="Hành động"
                key="action"
                render={(record) => (
                    <div>
                        {/*<Button onClick={() => test(record.id)}>Test</Button>*/}
                        {!record.is_superuser ? (
                    <Space size="middle">
                                <Button onClick={() => upgrade(record.id)}>Nâng cấp quyền</Button>
                                <Button onClick={() => delete_user(record.id)}>Xoá tài khoản</Button>
                    </Space>
                            )
                            : null}
                    </div>

                    )}/>
        </Table>
    );
};

export default MonitorComponent;