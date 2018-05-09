window.MediaManage = {
    _data : null,
    _select : {},
    windowFile: null,
}

window.MediaManage.openMedia = function openMedia() {
    if (window.MediaManage.windowFile == null) {
        window.MediaManage.windowFile = window.open(window.endpoint.brower, "", "width=900,height=600");
        window.MediaManage.windowFile.window.selectMediaChange = window.MediaManage.listener;
        window.MediaManage.windowFile.onload= function() {
            window.MediaManage.windowFile.onunload = function() {
                window.MediaManage.windowFile = null;
            }
        }
     
    }
  
}

window.MediaManage.listener = function(data) {
    window.MediaManage._data = data.filter((a) => a != undefined);
    $(document).trigger('select.change');
}

window.MediaManage.SelectMedia = function SelectMedia($name) {
    window.MediaManage.openMedia();
    $(document).one("select.change", function () {
        var url = "";
        var id = 0;
        window.MediaManage._data.forEach(function (item) {
            id = item;
            url = `${window.endpoint.image}${item}` ;
        });
        $(`[name='${$name}']`).val(id);
        $(`#preview-${$name}`).prop('src', url);
        MediaManage.windowFile.close();
    })
}

window.MediaManage.SelectsMedia = function SelectsMedia($name) {
    window.MediaManage.openMedia();
    $(document).one("select.change", function () {
        console.log("select.change muti");
        var datas = window.MediaManage.manageSelect($name, window.MediaManage._data);
        var elements = datas.map(function (item) {
            var url = `${window.endpoint.image}${item}`;
            return window.MediaManage.itemImage(url, $name, item);
        });
        window.MediaManage.renderValue($name, datas);
        $(`#show-input-${$name}`).empty();
        $(`#show-input-${$name}`).append(elements);
        MediaManage.windowFile.close();
    })
}

window.MediaManage.itemImage = function itemImage(url, name, id) {
    return `<div class="col-md-3 list-images" data-id="${id}">
                <div class="row">
                    <img src="${url}" alt="${url}" class="img-thumbnail img-responsive">
                </div>
            <button type="button" onClick="window.MediaManage.deleteImage(this, '${name}')">x</button>
        </div>`;
}

window.MediaManage.renderValue = function renderValue($name, $datas) {
    $(`[name='${$name}']`).val($datas.join(','));
}

window.MediaManage.render = function() {

    $('.images').map(function (i, item) {
        var name = $(item).attr('name');
        var value = $(item).attr('value').split(',');

        if ($(item).attr('value').length  <= 0) {
            return
        }
        window.MediaManage._select[name] = value;
        var elements = value.map(function (item) {
            if (item != null) {
                var url = `${window.endpoint.image}${item}`;
                return itemImage(url, name, item);
            }
        });
        $(`#show-input-${name}`).empty();
        $(`#show-input-${name}`).append(elements);
    })

    $('.image').map(function (i, item) {
        var name = $(item).attr('name');
        var value = $(item).attr('value');
        if (value.length > 0) {
            var url = `${window.endpoint.image}${value}` ;
            $(`#preview-${name}`).prop('src', url);
        }
    })
}

window.MediaManage.deleteImage  = function deleteImage(seft, name) {
    __element = $(seft)
    if (__element.length != 0) {
        var el = __element.parent();
        var id = el.attr('data-id');
        window.MediaManage._select[name].splice(window.MediaManage._select[name].indexOf(id), 1);
        window.MediaManage.renderValue(name, window.MediaManage._select[name]);
        el.remove();
    }
}

window.MediaManage.manageSelect = function manageSelect(name, datas) {
    var $data = window.MediaManage._select[name];
    if (!$data) {
        $data = [];
    }
    datas.forEach((item) => {
        if ($data.indexOf(item) < 0) {
            $data.push(item);
        }
    })
    window.MediaManage._select[name] = $data;
    return $data;
}
