// ==UserScript==
// @name         fb
// @version      0.1
// @include      https://www.facebook.com/david.lui.712/*
// @description  enter something useful
// @author       DAVID LUI
// @match        http://tampermonkey.net/faq.php?version=3.11&ext=dhdg&updated=true
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

var dataids = [];
var deletetheseids = [];
var imgIds = [];
var deleteButton = document.createElement('input');
deleteButton.type = "button";
deleteButton.name = "name";
deleteButton.value = "delete selected images";
deleteButton.id = "id";
deleteButton.class = "deletebutton";
deleteButton.onclick = function() {
    
    deletetheseids = [];
    imgIds = [];
    var checks = document.querySelectorAll("[type=checkbox]");
    for (var k = 0; k < checks.length; k++) {
        if (checks[k].checked) {
            imgIds.push(checks[k].id);
            deletetheseids.push([checks[k].id, document.querySelectorAll("div[data-fbid=\'"+ checks[k].id +"\']")[0].getElementsByTagName("i")[0]]);
        }
    }
    console.log(deletetheseids);
    
    if (deletetheseids.length !== 0) {
        var total = deletetheseids.length;
        var interval = setInterval(function() {
            if (document.getElementsByClassName("_4-i2 _pig _50f4").length + deletetheseids.length == total) {
                var item = deletetheseids.pop();
                id = item[0];
                invisButton.setAttribute('ajaxify', "/ajax/photos/photo/delete/dialog.php?fbid="+id+"&version=9&set=pb.1194023425.-2207520000.1448042219.&next=0");
                document.getElementById("deletethisstuff").click();
            }
            if(deletetheseids.length !== 0) return;
            clearInterval(interval);
            setTimeout(function(){
                for (var p = 0; p < document.getElementsByClassName("_4-i2 _pig _50f4").length; p++) {
                    var img = document.createElement('img');
                    img.src = /url\(\"(.*)\"\)/.exec(document.querySelectorAll("div[data-fbid=\'"+ imgIds[p] +"\']")[0].getElementsByTagName("i")[0].style.backgroundImage)[1];
                    img.style="width: 300px; height: 200px;";
                   document.getElementsByClassName("_4-i2 _pig _50f4")[p].appendChild(img);
                }
            }, 500);
        }, 200);

    } else {
        alert("Select some images!");
    }
};
console.log("did u return?");

var x = document.getElementById("medley_header_photos");

x.appendChild(deleteButton);
var invisButton = document.createElement('a');
invisButton.id = "deletethisstuff";
invisButton.href = "#";
invisButton.rel = "async-post";
invisButton.setAttribute('class', "itemAnchor");
invisButton.setAttribute('role', "menuitem");
invisButton.setAttribute('tabindex', "-1");
invisButton.setAttribute('style', 'display:none;');
document.getElementsByClassName("_51sx")[0].appendChild(invisButton);


function creatButtons() {
    var x = document.getElementsByClassName("uiToggle wrap");
    for (var i = 0; i < x.length; i++) {
        if (x[i].parentElement.getElementsByTagName("input").length < 1) {
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "name";
            checkbox.value = "value";
            checkbox.id = /fbid=(\d+)&/.exec(x[i].getElementsByTagName("a")[0].getAttribute('ajaxify'))[1];
            checkbox.setAttribute('style','float:right;height:30px;width:30px;');
            /*
            checkbox.onchange = function() {
                if(this.checked) {
                    deletetheseids.push([this.id, this.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("i")[0]]);
                    
                } else {
                    for (var p = 0; p < deletetheseids.length; p++) {
                        if (deletetheseids[p][0] == this.id) {
                            deletetheseids.splice(p,1);
                        }
                    }
                }
            };
            */
            dataids.push(checkbox.id);
            checkbox.class = "photobox";
            x[i].parentElement.appendChild(checkbox);

        }
    }
    setTimeout(creatButtons, 3000);
}
creatButtons();



