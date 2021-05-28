import React, { Component, useState, useEffect } from "react";
import Result from "../api/Result";
import MathJax from "react-mathjax2";

import { Row, Col } from "antd";
import { Layout } from "antd";
import { Divider } from "antd";
import { Modal, Button } from "antd";
import { List, Card } from "antd";
import { Typography } from "antd";
import { Menu } from "antd";

import { Switch, Route, Link } from "react-router-dom";

// import Rightsidemenu from "../subcomponents/menu"
import "../css/style.css";

const { SubMenu } = Menu;

const { Title } = Typography;

const { Header, Footer, Sider, Content } = Layout;
const { parse } = require("equation-parser");

const style = {};

var emails = [];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, onOpen, value } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value, type) => {
    console.log(value);
    console.log(type);
    if (type == "check") {
      onClose(null);
      onOpen(value);
    } else {
      onClose(value);
    }
  };
  var [testMathjax, setMathJax] = useState("x");

  return (
    // <>
    <Modal
      footer={null}
      title="Chúng tôi có thể giúp gì cho bạn ?"
      visible={open}
      onCancel={handleClose}
    >
      {value.map((email) => (
        <Button
          type="text"
          block
          onClick={() => handleListItemClick(email.variable, email.type)}
        >
          <MathJax.Context>
            <MathJax.Node>
              {"\\text{" + email.detail + "}" + email.variable}
            </MathJax.Node>
          </MathJax.Context>
        </Button>
      ))}
    </Modal>

    // {/* <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" style={{
    //   padding: "0px 20px 0px 20px"
    // }} open={open}>
    //   <DialogTitle id="simple-dialog-title"><div style={{
    //     color: "#147f8f"
    //   }}> Chúng tôi có thể giúp gì cho bạn ?</div>
    //   </DialogTitle>
    //   <button onClick={() => {
    //     console.log(value)
    //   }}
    //   >123</button>
    //   <List style={{
    //     padding: "0px 15px 15px 15px"
    //   }}>
    //     {value.map((email) => (

    //       <List.Item button onClick={() => {
    //         handleListItemClick(email.variable, email.type);
    //       }
    //       } key={email.variable}>
    //         <MathJax.Context>
    //           <MathJax.Node>{"\\text{" + email.detail + "}" + email.variable}</MathJax.Node>
    //         </MathJax.Context>
    //       </List.Item>
    //     ))}
    //   </List>
    // </Dialog> */}
  );
}

function duyetObject(obj) {
  if (obj.a == undefined || obj.b == undefined) {
    if (obj.type == "variable") {
      if (obj.name.length == 1) {
        return obj.name;
      } else return "";
    } else if (obj.type == "negative") {
      return duyetObject(obj.value);
    } else if (obj.type == "block") {
      return duyetObject(obj.child);
    } else if (obj.type == "function") {
      return duyetObject(obj.args[0]);
    } else if (obj.type == "parser-error") {
      var tex =
        obj.equation.slice(0, obj.start + 1) +
        obj.equation.slice(obj.end + 1, obj.equation.length);
      return duyetObject(parse(tex));
    } else return "";
  } else {
    return duyetObject(obj.a) + duyetObject(obj.b);
  }
}
const Error = Object.freeze({
  NotEqual: "notequal",
  Notvariable: "notvariable",
  MulEqual: "mulequal",
});
function parseErrorHandle(obj) {
  console.log(obj);
}
function checkSyntax(obj) {
  console.log(obj);
  if (obj.type == "parser-error") {
    parseErrorHandle(obj);
    return false;
  } else if (
    obj.type == "equals" ||
    obj.type == "less-than" ||
    obj.type == "greater-than" ||
    obj.type == "less-than-equals" ||
    obj.type == "greater-than-equals"
  ) {
    if (
      obj.a.type == "equals" ||
      obj.a.type == "less-than" ||
      obj.a.type == "greater-than" ||
      obj.a.type == "less-than-equals" ||
      obj.a.type == "greater-than-equals" ||
      obj.b.type == "equals" ||
      obj.b.type == "less-than" ||
      obj.b.type == "greater-than" ||
      obj.b.type == "less-than-equals" ||
      obj.b.type == "greater-than-equals"
    ) {
      return Error.MulEqual;
    } else {
      return duyetObject(obj);
    }
  } else {
    if (duyetObject(obj) == "") {
      return Error.Notvariable;
    } else {
      return Error.NotEqual;
    }
  }
}

export default function Dathuc(data) {
  var emails = [];
  var [input_latex, setInputLatex] = useState(0);
  var [valueDialog, setvalueDialog] = useState(emails);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [openResult, setOpenResult] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState("default");
  const virtualKeyboard = {
    customVirtualKeyboardLayers: {
      number: {
        styles: "",
        rows: [
          [
            {
              class: "keycap",
              latex: ">",
            },
            { class: "keycap", latex: "x" },
            { class: "separator w5" },
            { class: "keycap", label: "7", key: "7" },
            { class: "keycap", label: "8", key: "8" },
            { class: "keycap", label: "9", key: "9" },
            { class: "keycap", latex: "\\div" },
            { class: "separator w5" },
            {
              class: "keycap tex small",
              label: "<span><i>x</i>&thinsp;²</span>",
              insert: "$$#@^{2}$$",
            },
            {
              class: "keycap tex small",
              latex: "{#0}^{#0}",
              insert: "$${#0}^{#0}$$",
            },

            // <li class="keycap tex" data-alt-keys="sqrt" data-insert="$$\sqrt{#0}$$" data-latex="\sqrt{#0}" data-command="[&quot;insert&quot;,&quot;$$\\sqrt{#0}$$&quot;,{&quot;focus&quot;:true,&quot;feedback&quot;:true,&quot;mode&quot;:&quot;math&quot;,&quot;format&quot;:&quot;latex&quot;,&quot;resetStyle&quot;:true}]"><span class="ML__mathlive" style="margin-left:0.06em;"><span class="ML__strut" style="height:1.05em;"></span><span class="ML__strut--bottom" style="height:1.21em;vertical-align:-0.15em;"></span><span class="ML__base"><span class="sqrt"><span class="sqrt-sign" style="top:-0.19em;"><span class="style-wrap"><span class="delimsizing size1">√</span></span></span><span class="vlist"><span><span><span><span class="ML__cmr">⬚
            // <li class="small" data-insert="$$\sqrt{#0}$$" data-latex="\sqrt{#0}"></li>
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt{#0}",
              insert: "$$\\sqrt{#0}$$",
            },
          ],
          [
            { class: "keycap tex", latex: "<" },
            { class: "keycap tex", latex: "y" },
            { class: "separator w5" },
            { class: "keycap tex", label: "4", latex: "4" },
            { class: "keycap tex", label: "5", key: "5" },
            { class: "keycap tex", label: "6", key: "6" },
            {
              class: "keycap",
              latex: "\\times",
            },
            { class: "keycap tex", class: "separator w5" },
            {
              class: "keycap small",
              latex: "\\begin{cases}#0 \\\\ #0\\end{cases}",
            },
            {
              class: "keycap tex small",
              latex: "\\frac{#0}{#0}",
              insert: "$$\\frac{#0}{#0}$$",
            },
            { class: "keycap tex small", label: "{" },
          ],
          [
            { class: "keycap tex", latex: "\\ge" },
            { class: "keycap tex", label: "<i>z</i>" },
            { class: "separator w5" },
            { class: "keycap tex", label: "1", key: "1" },
            { class: "keycap tex", label: "2", key: "2" },
            { class: "keycap tex", label: "3", key: "3" },
            { class: "keycap", latex: "-" },
            { class: "separator w5" },
            { class: "keycap tex small", label: "[" },
            { class: "keycap tex small", label: "]" },
            { class: "keycap tex small", label: "}" },
          ],
          [
            { class: "keycap tex", latex: "\\le" },
            { class: "keycap tex", latex: "t" },

            { class: "separator w5" },
            { class: "keycap tex", label: "0", key: "0" },
            { class: "keycap tex", latex: "." },
            { class: "keycap tex", latex: "\\pi" },
            { class: "keycap tex", latex: "+" },
            { class: "separator w5" },
            {
              class: "action",
              label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
              command: ["performWithFeedback", "moveToPreviousChar"],
            },
            {
              class: "action",
              label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
              command: ["performWithFeedback", "moveToNextChar"],
            },
            {
              class: "action font-glyph bottom right",
              label: "&#x232b;",
              command: ["performWithFeedback", "deleteBackward"],
            },
          ],
        ],
      },
      function1: {
        styles: "",
        rows: [
          [
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sin{#0}",
              insert: "$$\\sin{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sin^{#0}{#0}",
              insert: "$$\\sin^{#0}{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\log{#0}",
              insert: "$$\\log{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt{#0}",
              insert: "$$\\sqrt{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt{#0}",
              insert: "$$\\sqrt{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt{#0}",
              insert: "$$\\sqrt{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt{#0}",
              insert: "$$\\sqrt{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt{#0}",
              insert: "$$\\sqrt{#0}$$",
            },
          ],
          [
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\cos{#0}",
              insert: "$$\\cos{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\cos^{#0}{#0}",
              insert: "$$\\cos^{#0}{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\ln{#0}",
              insert: "$$\\ln{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\mathrm{e}^{#0}",
              insert: "$$\\mathrm{e}^{#0}$$",
            },

            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt[#0]{#0}",
              insert: "$$\\sqrt[#0]{#0}$$",
            },
            { class: "keycap tex", latex: "b" },
            { class: "keycap tex", latex: "b" },
            { class: "keycap tex", latex: "b" },
          ],
          [
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\tan{#0}",
              insert: "$$\\tan{#0}$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\tan^{#0}{#0}",
              insert: "$$\\tan^{#0}{#0}$$",
            },

            {
              class: "keycap tex small",
              latex: "\\log_{#0}(#0)",
              insert: "$$\\log_{ cơ số }(biểu thức)$$",
            },
            {
              class: "keycap tex small",
              // data-alt-keys="sqrt",
              latex: "\\sqrt[#0]{#0}",
              insert: "$$\\sqrt[#0]{#0}$$",
            },
            { class: "keycap tex", label: "<i>c</i>" },
            { class: "keycap tex", label: "<i>z</i>" },
            { class: "keycap tex", label: "<i>c</i>" },
            { class: "keycap tex", label: "<i>z</i>" },
          ],
          [
            { class: "keycap tex", label: "<i>c</i>" },
            { class: "keycap tex", label: "<i>z</i>" },
            { class: "keycap tex", label: "<i>c</i>" },
            { class: "keycap tex", label: "<i>z</i>" },
            { class: "keycap tex", label: "<i>c</i>" },
            {
              class: "action",
              label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
              command: ["performWithFeedback", "moveToPreviousChar"],
            },
            {
              class: "action",
              label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
              command: ["performWithFeedback", "moveToNextChar"],
            },
            {
              class: "action font-glyph bottom right",
              label: "&#x232b;",
              command: ["performWithFeedback", "deleteBackward"],
            },
          ],
        ],
      },
    },
    customVirtualKeyboards: {
      number: {
        label: "123",
        tooltip: "number keyboard",
        layer: "number",
      },
      function1: {
        label: "f()",
        tooltip: "function keyboard",
        layer: "function1",
      },
    },
    virtualKeyboards: "number function1 functions",
  };

  useEffect(() => {
    const mf = document.getElementById("formula1");
    mf.setOptions({
      ...virtualKeyboard,
    });

    if (data.location.state) {
      if (data.location.state.selectedType != undefined) {
        setSelectedType(data.location.state.selectedType);
      }
    }
  }, []);

  // const [loading, setLoading] = React.useState(false);

  const listExample = ["x^2-7x+10 = 0", "2x^2 +5x-7=0", "-7x^2+10x-3=0"];
  const listPlot = ["x^2-2x+3", "2x^2 -5x-10", "-7x^2+10x-20"];
  const listdathuc = {
    default: {
      name: "Ví dụ",
      list: [
        "x-3=1",
        "2x^2 -5x-10=0",
        "3x^4-5x^2-1=0",
        "3\\tan(x)=2",
        "2\\cos(x)^2-3\\cos(x)+1=0",
      ],
    },
    ptb1: {
      name: "Phương trình bậc 1",
      list: ["x-3=1", "2x+7=0"],
    },
    ptb2: {
      name: "Phương trình bậc 2",
      list: ["x^2-2x+3 = 0", "2x^2 -5x-10=0", "-7x^2+10x-20=0"],
    },
    ptb4: {
      name: "Phương trình bậc 4 trùng phương",
      list: ["x^4-2x^2+1=0", "3x^4-5x^2-1=0"],
    },
    ptbc: {
      name: "Phương trình bậc cao",
      list: ["x^5-4x^4-7x^3+14x^2-44x+120=0"],
    },
    ptb1_trigo: {
      name: "Phương trình bậc lượng giác 1",
      list: ["2\\sin(x)+1=0", "3\\tan(x)=2"],
    },
    ptb2_trigo: {
      name: "Phương trình lượng giác bậc 2",
      list: ["2\\cos(x)^2-3\\cos(x)+1=0", "3\\cot(x)^2=2"],
    },
    ptb4_trigo: {
      name: "Phương trình lượng giác bậc 4 trùng phương",
      list: ["\\sin(x)^4-2\\sin(x)^2+1=0", "3\\cos(x^2)^4-5\\cos(x^2)^2-1=0"],
    },
    hptb1: {
      name: "Hệ phương trình bậc 1",
      list: ["\\begin{cases}x+y=1 \\\\ 2x-3y=3 \\end{cases}"],
    },
    ptc: {
      name: "Phương trình căn",
      list: ["\\sqrt{4x-3}=x", "\\sqrt{3x^2+1} = 3x"],
    },
  };
  const listfunc = [
    {
      key: "dathuc",
      title: "Đa thức",
      sub: [
        {
          key: "ptb1",
          title: "PT bậc 1",
        },
        {
          key: "ptb2",
          title: "PT bậc 2",
        },
        {
          key: "ptb4",
          title: "PT bậc 4 trùng phương",
        },
        {
          key: "ptbc",
          title: "PT bậc cao",
        },
      ],
    },
    {
      key: "trigo",
      title: "Lượng giác",
      sub: [
        {
          key: "ptb1_trigo",
          title: "PT bậc 1",
        },
        {
          key: "ptb2_trigo",
          title: "PT bậc 2",
        },
        {
          key: "ptb4_trigo",
          title: "PT bậc 4 trùng phương",
        },
      ],
    },
    {
      key: "hpt",
      title: "Hệ PT",
      sub: [
        {
          key: "hptb1",
          title: "Hệ PT bậc 1",
        },
      ],
    },
    {
      key: "ptc",
      title: "PT căn",
      sub: [
        {
          key: "ptc",
          title: "PT căn",
        },
      ],
    },
  ];

  const handleClick = (e) => {
    console.log(e)
    setSelectedType(e.key);
    setOpenResult(false);
  };

  const handleClickOpen = (test) => {
    emails = [];

    //NOTE
    if (test != "" && parse(test).type == "parser-error") {
      var objError = parse(test);

      if (objError.equation.indexOf("begin") != -1) {
        console.log(objError.equation);
        objError.equation = objError.equation.replace(/begin/g, "");
        objError.equation = objError.equation.replace(/{cases}/g, "");
        objError.equation = objError.equation.replace(/end/g, "");

        console.log(objError.equation);
        console.log(objError.equation.indexOf("\\\\"));

        var sub1 = objError.equation.substr(
          0,
          objError.equation.indexOf("\\\\")
        );
        var sub2 = objError.equation.substr(
          objError.equation.indexOf("\\\\") + 1,
          objError.equation.length
        );
        sub1 = sub1.replace(/\\/g, "");
        sub2 = sub2.replace(/\\/g, "");
        if (
          checkSyntax(parse(sub1)) == checkSyntax(parse(sub2)) &&
          checkSyntax(parse(sub1)) != "notequal" &&
          checkSyntax(parse(sub1)) != "mulequal" &&
          checkSyntax(parse(sub1)) != "notvariable"
        ) {
          emails.push({ variable: "", detail: "Giải hệ phương trình" });
        } else {
          emails.push({
            variable: "",
            detail: "Bài toán bạn nhập sai hoặc chưa được hỗ trợ, xin cảm ơn",
          });
        }
      } else if (objError.equation.indexOf("sin") != -1) {
        console.log(objError.equation);
        objError.equation = objError.equation.replace(/\\mleft/g, "");
        objError.equation = objError.equation.replace(/\\mright/g, "");
        var hihi = objError.equation;
        objError.equation = objError.equation.replace(/\\sin/g, "");
        objError.equation = objError.equation.replace(/\\cos/g, "");
        objError.equation = objError.equation.replace(/\^/g, "");
        if (
          checkSyntax(parse(objError.equation)).length != 1 &&
          checkSyntax(parse(objError.equation)) != "notequal" &&
          checkSyntax(parse(objError.equation)) != "mulequal" &&
          checkSyntax(parse(objError.equation)) != "notvariable"
        ) {
          emails.push({
            variable: hihi,
            detail: "Giải phương trình lượng giác",
          });
        } else {
          emails.push({
            variable: "",
            detail: "Bài toán bạn nhập sai hoặc chưa được hỗ trợ, xin cảm ơn",
          });
        }
      }
    } else if (test != "" && checkSyntax(parse(test)) != false) {
      var test1 = checkSyntax(parse(test));
      console.log(test1);
      if (test1 == "notequal") {
        var test3 = duyetObject(parse(test)).split("");
        const uniqueSet1 = new Set(test3);
        const backToArray1 = [...uniqueSet1];
        console.log(backToArray1);
        if (backToArray1.length == 1) {
          emails.push({
            variable: test,
            detail: "Khảo sát và vẽ đồ thị hàm số ",
          });
          emails.push({
            variable: test + "=0",
            detail: "Giải phương trình ",
            type: "check",
          });
          emails.push({
            variable: test + ">0",
            detail: "Giải bất phương trình ",
          });
          emails.push({
            variable: test + "<0",
            detail: "Giải bất phương trình ",
          });
        } else {
          emails.push({
            variable: test,
            detail: "Khảo sát và vẽ đồ thị hàm số ",
          });
          emails.push({
            variable: test + "=0",
            detail: "Giải phương trình ",
            type: "check",
          });
        }
      } else if (test1 == "mulequal") {
        emails.push({
          variable: "",
          detail: "Bài toán bạn nhập sai hoặc chưa được hỗ trợ, xin cảm ơn",
        });
      } else if (test1 == "notvariable") {
        emails.push({ variable: test, detail: "Tính kết quả phép tính" });
      } else {
        var test2 = test1.split("");
        const uniqueSet = new Set(test2);
        const backToArray = [...uniqueSet];
        console.log(backToArray);
        backToArray.forEach(function (item, index, array) {
          emails.push({
            variable: item,
            detail: "Giải phương trình theo biến ",
          });
        });
        console.log(emails);
      }
    } else {
      emails.push({
        variable: "",
        detail: "Bài toán bạn nhập sai hoặc chưa được hỗ trợ, xin cảm ơn",
      });
    }
    setvalueDialog(emails);
    setOpen(true);
  };

  const clickExer = (item) => {
    document.getElementById("formula1").value = item;
    setInputLatex(item);
    setSelectedValue("x");
    setOpenResult(true);
  };

  const handleClose = (value) => {
    if (value == null) {
      console.log("test");
      setOpen(false);
    } else {
      setOpen(false);
      setSelectedValue(value);
      setInputLatex(document.getElementById("formula1").getValue("latex"));
      setOpenResult(true);
    }
  };


  return (
    <>
      <Row gutter={12} style={{ marginTop: "24px" }}>
        <Col span={6}>
          <Menu
            onClick={handleClick}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            className="menu"
          >
            {listfunc.map((item) => {
              return (
                <SubMenu key={item.key} title={item.title}>
                  {item.sub.map((subitem) => {
                    return (
                      <Menu.Item key={subitem.key}>{subitem.title}</Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            })}
          </Menu>
        </Col>
        <Col span={18}>
          <Row style={{ paddingBottom: "16px" }}>
            <Col span={21}>
              <math-field
                id="formula1"
                virtual-keyboard-mode="onfocus"
                smart-mode={true}
                smart-fence={true}
                virtual-keyboard-theme="apple"
                smart-superscript={true}
                use-shared-virtual-keyboard={true}
                style={{
                  width: "100%",
                  backgroundColor: "#ffffff",
                  height: "90px",
                  borderRadius: "8px",
                  color: "#000000",
                  fontSize: "20px",
                }}
              ></math-field>
            </Col>
            <Col span={3}>
              <Col span={22} offset={1}>
                <Button
                  type="primary"
                  block
                  style={{ height: "40px" }}
                  onClick={() => {
                    var testASC = document
                      .getElementById("formula1")
                      .getValue("ASCIIMath");
                    var inputLatex = document
                      .getElementById("formula1")
                      .getValue("latex");

                    if (inputLatex != "") {
                      console.log(inputLatex);
                      handleClickOpen(inputLatex);
                    } else if (testASC != "") {
                      console.log(testASC);
                      handleClickOpen(testASC);
                    }
                  }}
                >
                  Submit
                </Button>
                <SimpleDialog
                  value={valueDialog}
                  onOpen={handleClickOpen}
                  selectedValue={selectedValue}
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                />
              </Col>
            </Col>
          </Row>
          <Row gutter={12} style={{ minWidth: "100%", minHeight: "80vh" }}>
            {!openResult && (
              <>
                <Col span={16}>
                  <Card style={{ minWidth: "100%", minHeight: "100%", borderRadius: "8px" }}>
                    <Col span={24}>
                      <Divider orientation="left" plain>
                        <Title level={3}>{listdathuc[selectedType].name}</Title>
                      </Divider>
                      <Row gutter={8}>
                        {listdathuc[selectedType].list.map((item) => {
                          return (
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className="polynomial_poly_item">
                              <Button
                                block
                                className="polynomial_poly_button"
                                onClick={() => clickExer(item)}
                              >
                                <MathJax.Context>
                                  <MathJax.Node>{item}</MathJax.Node>
                                </MathJax.Context>
                              </Button>
                            </Col>
                          );
                        })}
                      </Row>
                    </Col>
                    <Col span={24} >
                      <Divider orientation="left" plain>
                        <Title level={3}>Vẽ đồ thị</Title>
                      </Divider>
                      <Row gutter={8}>
                        {listPlot.map((item) => {
                          return (
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12} className="polynomial_plot_item">
                              <Link
                                    to={{
                                      pathname: "/graph",
                                      state: { plot: item },
                                    }}
                                  >
                              <Button className="polynomial_plot_button" block>
                                <MathJax.Context>
                                  <MathJax.Node>{item}</MathJax.Node>
                                </MathJax.Context>
                              </Button>
                              </Link>
                            </Col>
                          );
                        })}
                      </Row>
                    </Col>
                  </Card>
                </Col>
                <Col span={8}>
                  <Row>
                    <Col span={24}>
                      <Card title="Vẽ đồ thị" className="polynomial_plot_card" style={{ borderRadius: "8px"}}>
                        <MathJax.Context>
                          <MathJax.Node>{input_latex}</MathJax.Node>
                        </MathJax.Context>
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card title="Bài tập" className="polynomial_exer_card">
                        <List>
                          <Row>
                            {listExample.map((item) => {
                              return (
                                <Col span={24} className="polynomial_poly_item">
                                  <Link
                                    to={{
                                      pathname: "/exercise",
                                      state: { polynomial: item },
                                    }}
                                  >
                                    <Button className="polynomial_poly_button" block>
                                      <MathJax.Context>
                                        <MathJax.Node>{item}</MathJax.Node>
                                      </MathJax.Context>
                                    </Button>
                                  </Link>
                                </Col>
                              );
                            })}
                          </Row>
                        </List>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </>
            )}
            {openResult && (
              <>
                <Col span={16}>
                    <Result tex={input_latex} var={selectedValue}></Result>
                </Col>
                <Col span={8}>
                <Row>
                    <Col span={24}>
                      <Card title="Vẽ đồ thị" className="polynomial_plot_card" style={{ borderRadius: "8px"}}>
                        <MathJax.Context>
                          <MathJax.Node>{input_latex}</MathJax.Node>
                        </MathJax.Context>
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card title="Bài tập" className="polynomial_exer_card">
                        <List>
                          <Row>
                            {listExample.map((item) => {
                              return (
                                <Col span={24} className="polynomial_poly_item">
                                  <Link
                                    to={{
                                      pathname: "/exercise",
                                      state: { polynomial: item },
                                    }}
                                  >
                                    <Button className="polynomial_poly_button" block>
                                      <MathJax.Context>
                                        <MathJax.Node>{item}</MathJax.Node>
                                      </MathJax.Context>
                                    </Button>
                                  </Link>
                                </Col>
                              );
                            })}
                          </Row>
                        </List>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
}

// export default function BoardUser(test){
//   console.log(test)
//   useEffect(() =>{
//     console.log(test)
//   })
//   return (
//     <Dathuc></Dathuc>
//   )
// }

// export default class Polynomial extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedType: "default",
//     };
//   }
//   componentDidMount() {
//     if (this.props.location.state) {
//       if (this.props.location.state.selectedType != undefined) {
//         this.setState({
//           selectedType: this.props.location.state.selectedType,
//         });
//       }
//     }
//   }

//   render() {
//     return <Dathuc selectedType={this.state.selectedType}></Dathuc>;
//   }
// }
