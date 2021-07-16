{
        virtualKeyboard: {
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
