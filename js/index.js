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
        // open_num: [/^[s|S]$/, '请选择数量'],
        open_num: [/(.+){2}$/, '请选择数量'],
        face_value: [/(.+){2}$/, '请选择面值'],
        card_kind: [/(.+){2}$/, '请选择种类'],
        card_type: [/(.+){2}$/, '请选择类型'],
        card: [/^$|(.+){16}$/, '卡号16位'],
        pass: [/(.+){24}$/, '卡密24位'],
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

    for (var i = 0; i < card_types.length; i++) {
        card_types[i].onclick = function() {
            card_type.value = this.innerText;
            var card_types = this.getAttribute("data-id");
            // console.log(card_types);
            var local = {
                "card_types": card_types,
            };
            localStorage.setItem("local", JSON.stringify(local));
            var local = JSON.parse(localStorage.getItem("local"));
            // console.log(local);
        }
    }

    for (var i = 0; i < but_bg.length; i++) {
        but_bg[i].index = i;

        but_bg[i].onclick = function() {
            this.className = " layui-this";
            face_value.value = this.innerText;
            var but_bg = this.getAttribute("data-id");
            // console.log(but_bg);
            var local = JSON.parse(localStorage.getItem("local"));
            local.but_bg = but_bg;
            var local = localStorage.setItem("local", JSON.stringify(local));
            var local = JSON.parse(localStorage.getItem("local"));
            console.log(local);
        };

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
            var color_red = this.getAttribute("data-id");
            // console.log(color_red);
            var local = JSON.parse(localStorage.getItem("local"));
            local.color_red = color_red,
                localStorage.setItem("local", JSON.stringify(local));
            // var local = JSON.parse(localStorage.getItem("local"));
            // console.log(local);
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
    $(function() {
        $(".but_bg dd").on('click', function() {
            $(this).addClass("layui-this").siblings().removeClass("layui-this");
        });
    })
})