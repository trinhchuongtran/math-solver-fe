import React from "react";
import { HashRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Home } from "@material-ui/icons";

const breadcrumbNameMap = {
    "/login": "Đăng nhập",
    "/profile": "Hồ sơ",
    // "/solve": "Giải cơ bản",
    "/polynomial": "Đa thức",
    "/graph": "Đồ thị",
    "/problem": "Tổng hợp",
    "/define": "Định nghĩa bài toán",
    "/monitor": "Quản lý",
};

const MathSolver = withRouter(props => {
    const { location } = props;
    const pathSnippets = location.pathname.split("/").filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        return(
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        <Breadcrumb.Item>
            <Link to={"/"}>
                <HomeOutlined/>
            </Link>
        </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems);
    return (
        <div>
           <Breadcrumb separator=">">{breadcrumbItems}</Breadcrumb>
        </div>
    )
});

export default MathSolver;
