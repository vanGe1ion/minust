$(document).bind("ajaxStart", function () {
    $(".wait-box, .overlay").fadeIn(300);
});
$(document).bind("ajaxStop", function () {
    $(".wait-box, .overlay").fadeOut(300);
});

function TreeWalker(parent) {
        $.ajax({
            type: "POST",
            dataType:"json",
            url: "getRow.php",
            data: {ParentId: parent},

            success: function (res) {

                if(res){
                    $.each(res, function (key, row) {


                        let elem = $("<div class='Element'/>")
                            .append($("<div class='Description'/>")
                                .append($("<div class='Expand'/>")
                                    .append($("<button class='expButton' disabled>+</button>")
                                        .fadeTo(0, 0.3)
                                        .click(function () {
                                            let childSpace = $(this).parent().parent().siblings(".Children");
                                            if($(this).text() === "+") {
                                                childSpace.slideDown(500);
                                                $(this).text("-")
                                            }
                                            else{
                                                childSpace.slideUp(500);
                                                $(this).text("+")
                                            }
                                        })
                                    )
                                )
                                .append($("<div class='Id'>" + row.Id + "</div>"))
                                .append($("<div class='ParentId'>" + (row.ParentId == null ? "NULL" : row.ParentId) + "</div>"))
                                .append($("<div class='Code'>" + row.Code + "</div>"))
                                .append($("<div class='Name'>" + row.Name + "</div>"))
                            )
                            .append($("<div class='Children'/>").hide());


                        if(parent === "null")
                            $(".Classifier").append(elem);
                        else{
                            let child = $("<div class='Child'/>")
                                .append($("<div class='Tabula'/>"))
                                .append(elem);

                            let parentChildSpace = $(".Id:contains('" + row.ParentId + "'):first").parent().siblings(".Children");
                            $(".Id:contains('" + row.ParentId + "'):first").siblings(".Expand").children(".expButton").removeAttr("disabled").fadeTo(0, 1);
                            parentChildSpace.append(child);
                        }


                        TreeWalker(row.Id);
                    });
                }
            },
            error: function () {
                alert("Ошибка выполнения запроса к базе данных!\n\r ParentId = '" + parent + "'");
            }
        })
}



TreeWalker("null");