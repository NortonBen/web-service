
$('#fine-uploader-manual-trigger').fineUploader({
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: window.endpoint.upload,
        params: {
            _csrf: window.csrfToken,
            folder: window.folder
        }
    },
    thumbnails: {
        placeholders: {
            waitingPath: '/images/waiting-generic.png',
            notAvailablePath: '/images/not_available-generic.png'
        }
    },
    autoUpload: false,

    callbacks: {

        onComplete: function (id, name, rep, xhr) {
            console.log(id, name, rep, xhr);
            if(!rep.id) {
                return;
            }
            var html = `<div class="item-image" data-id="${rep.id}">
                    <div class="listen" onClick="addHander(this)">
                        <img class="img-responsive" src="${window.endpoint.image}${rep.id}" />
                        <p class="name" >${name}</p>
                        <div class="clearfix"></div>
                    </div>
                    <form class="delete" action="${window.endpoint.delete}${rep.id}" method="post">
                        <button type="submit"><span>x</span></button>
                    </form>
                </div>`;

            $('#list-image').prepend(html);
        }
    }
});

$('#trigger-upload').click(function () {
    $('#fine-uploader-manual-trigger').fineUploader('uploadStoredFiles');
});


 

$(document).ready(function () {
    $("#myBtn").click(function () {
        $("#myModal").modal();
    });
});

$("form[class=delete]").submit(function () {
    var __this = $(this).parent();
    var id = __this.attr('data-id');
    if (confirm("Bạn Có Muốn Xóa Ảnh!")) {
        $.post(window.endpoint.delete + id, { _csrf: window.csrfToken }).then(function (res) {
            __this.remove()
        });

    }

    return false;
});

var select = [];
$(document).ready(function () {
    addHander();
    $('.selectImage').click(function (e) {
        window.selectMediaChange(select);
    });
});

function addHander(_this) {
    var el = $(_this).parent();
    var id = el.attr('data-id');
    if (select.indexOf(id) < 0) {
        select.push(id);
        el.addClass('select');
    } else {
        select.splice(select.indexOf(id), 1);
        el.removeClass('select');
    }

}


function reset() {
    select = [];
    $(".select").removeClass('select');
}

