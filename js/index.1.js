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
        exts: 'xlsx' //表格
            ,
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
        card: [/^$|(.+){16}$/, '卡号16位'],
        pass: [/(.+){16}$/, '卡密24位'],
        content: function(value) {
            layedit.sync(editIndex);
        }
    });
    // 监听提交
    form.on('submit(demo1)', function(data) {
        layer.alert(JSON.stringify(data.field), {

            title: '最终的提交信息'
        })
        console.log(data.field);
        return false;
    });

    var color_red = document.querySelectorAll(".color_red li");
    var card_types = document.querySelectorAll("#card_types li");
    var open_num = document.querySelector("#open_num");
    var face_value = document.querySelector("#face_value");
    var card_kind = document.querySelector("#card_kind");
    var card_type = document.querySelector("#card_type");
    var but_bg = document.querySelectorAll(".but_bg dd");

    for (var i = 0; i < card_types.length - 1; i++) {
        card_types[i].onclick = function() {
            card_type.innerText = this.innerText;
        }
    }
    for (var i = 0; i < but_bg.length; i++) {
        but_bg[i].onclick = function() {
            for (var i = 0; i < but_bg.length; i++) {
                but_bg[i].className = ""
            }
            this.className = " layui-this"
            face_value.innerText = this.innerText;
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
    quantity_only.onclick = function() {
        quantity_only.className = "quantity_only marg layui-this";
        quantity_batch.className = " quantity_batch ";
        quantity_num.style.display = "none";
        open_num.innerText = 1 + "张";
        singular_card.style.display = "block";
        plural_card.style.display = "none";
    }
    quantity_batch.onclick = function() {
        quantity_only.className = "quantity_only marg";
        quantity_batch.className = " quantity_batch layui-this";
        quantity_num.style.display = "inline-block";
        open_num.innerText = 0 + "张";
        singular_card.style.display = "none";
        plural_card.style.display = "block";
    }
    span_but_t.onclick = function() {
        i = i + 1;
        quantity_nums.innerText = i;
        open_num.innerText = i + "张";

    }
    span_but_d.onclick = function() {
        if (i > 0) {
            i--;
            quantity_nums.innerText = i;
            open_num.innerText = i + "张";
        } else {
            return
        }
    }
    for (var i = 0; i <= color_red.length - 1; i++) {
        color_red[i].onclick = function() {
            card_kind.innerText = this.innerText;
        }
    }
})