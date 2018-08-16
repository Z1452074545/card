layui.use(['form', 'element', 'upload', 'layedit', 'laydate'], function() {
    var $ = layui.jquery,
        form = layui.form,
        layer = layui.layer,
        layedit = layui.layedit,
        laydate = layui.laydate,
        element = layui.element,
        upload = layui.upload;

    var uploadInst = upload.render({ //允许上传的文件后缀
        elem: '#uploading',
        url: '/upload/',
        accept: 'file' //普通文件
            ,
        auto: false,
        exts: 'xlsx', //表格
        bindAction: "#but_field",
        done: function(res) {
            //如果上传失败
            if (res.code > 0) {
                return layer.msg('上传失败');
            }
            //上传成功
        },
        error: function() {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function() {
                uploadInst.upload();
            });
        }
    });

    var editIndex = layedit.build('LAY_demo_editor');
    //自定义验证规则
    form.verify({
        title: function(value) {
            if (value.length < 5) {
                return '标题至少得5个字符啊';
            }
        },
        open_num: [/[\s\S]*/, '不能为空'],
        face_value: [/[\s\S]*/, '不能为空'],
        card_kind: [/[\s\S]*/, '不能为空'],
        card_type: [/[\s\S]*/, '不能为空'],
        card: [/^$|(.+){16}$/, '卡号16位'],
        pass: [/(.+){16}$/, '卡密24位'],
        content: function(value) {
            layedit.sync(editIndex);
        }
    });
    var color_red = document.querySelectorAll(".color_red li");
    var card_types = document.querySelectorAll("#card_types li");
    var open_num = document.querySelector("#open_num");
    var face_value = document.querySelector("#face_value");
    var card_kind = document.querySelector("#card_kind");
    var card_type = document.querySelector("#card_type");
    var but_bg = document.querySelectorAll(".but_bg dd");
    var but_submit = document.querySelector("#but_submit");
    var buts_subm = document.querySelector("#buts_subm");
    // but_submit.onclick = function() {
    //         alert("出现");
    //         return false;

    //     }
    // if (card_type.innerText == false) {
    //     console.log(card_type.innerText == false);
    //     buts_subm.onclick = function() {
    //         alert(1111);
    //     }
    //     but_submit.setAttribute("disabled", "disabled");

    // } else if (card_kind.innerText == false) {
    //     but_submit.setAttribute("disabled", "disabled");
    //     buts_subm.onclick = function() {
    //         alert(2);
    //     }
    // } else if (face_value.innerText == null) {
    //     but_submit.setAttribute("disabled", "disabled");
    //     alert(3);
    // } else if (open_num.innerText == null) {
    //     but_submit.setAttribute("disabled", "disabled");
    //     alert(4);
    // } else {
    //     but_submit.removeAttribute("disabled");
    // }


    for (var i = 0; i < card_types.length; i++) {
        card_types[i].onclick = function() {
            card_type.value = this.innerText;
        }
    }
    for (var i = 0; i < but_bg.length; i++) {
        but_bg[i].onclick = function() {
            for (var i = 0; i < but_bg.length; i++) {
                but_bg[i].className = ""
            }
            this.className = " layui-this"
            face_value.value = this.innerText;
        }
    }

    var span_but_t = document.querySelector(".span_but_t");
    var span_but_d = document.querySelector(".span_but_d");
    var quantity_nums = document.querySelector(".quantity_nums");
    var i = quantity_nums.innerText;

    var quantity_only = document.querySelector(".quantity_only");
    var quantity_batch = document.querySelector(".quantity_batch");
    var quantity_num = document.querySelector(".quantity_num");
    var singular_card = document.querySelector("#singular_card");
    var plural_card = document.querySelector("#plural_card");
    var but_field = document.querySelector(".but_field");
    quantity_only.onclick = function() {
        buts_subm.style.display = "block";
        but_field.style.display = "none";
        quantity_only.className = "quantity_only marg layui-this";
        quantity_batch.className = " quantity_batch ";
        quantity_num.style.display = "none";
        open_num.value = 1 + "张";
        singular_card.style.display = "block";
        plural_card.style.display = "none";
        but_submit.removeAttribute("disabled");

    }
    quantity_batch.onclick = function() {
        buts_subm.style.display = "none";
        but_field.style.display = "block";
        quantity_only.className = "quantity_only marg";
        quantity_batch.className = " quantity_batch layui-this";
        quantity_num.style.display = "inline-block";
        open_num.value = 0 + "张";
        singular_card.style.display = "none";
        plural_card.style.display = "block";
        but_submit.setAttribute("disabled", "disabled");

    }

    var run_num = function() {
        var i = 0;
        span_but_t.onclick = function() {
            i++;
            quantity_nums.innerText = i;
            open_num.value = i + "张";

        }
        span_but_d.onclick = function() {
            if (i > 0) {
                i--;
                quantity_nums.innerText = i;
                open_num.value = i + "张";
            } else {
                return
            }
        }

    }
    run_num();
    for (var i = 0; i <= color_red.length - 1; i++) {
        color_red[i].onclick = function() {
            card_kind.value = this.innerText;
        }
    }

    // 监听提交
    form.on('submit(but_submit)', function(data) {
        layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
        })
        var obj1 = { "name": "yy", "ex": "na", "dd": "ss" }
        var obj2 = data.field;
        var obj3 = Object.assign(obj2, obj1);
        console.log(data.field);
        console.log(data);
        console.log(obj3);
        return false;
    });
    // 示例弹出
    var card_modai = document.querySelector(".card_modai");
    var card_m_but = document.querySelector(".card_m_but");
    var example = document.querySelector("#example");
    example.onclick = function() {
        card_modai.style.display = "block";
    }
    card_m_but.onclick = function() {
        card_modai.style.display = "none";
    }
})