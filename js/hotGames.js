$(document).ready(function () {
    getGames(true);
    $("#showAll").on("click", function () {
        getGames(true);
    });
});
$(document).ready(function () {
    $("#onlyPublished").on("click", function () {
        getGames(false);
    });
});

function getGames(all) {

    $.ajax({
        url: "https://bgg-json.azurewebsites.net/hot",
        dataType: "json",
        type: "GET",
        data: {
            get_param: "value"
        },

        success: function (response) {
            console.log("Förfrågan gick bra!");

            var items = [],
                numberOfGames = 0;

        
            if (all) {
                $.each(response, function (index, value) {
                    var name = value.name;
                    var date = value.yearPublished;
                    var thumb = value.thumbnail;
                    var rank = value.rank;

                    numberOfGames++;
                    items.push("<article><img src= " + thumb + " alt='Thumbnail for "+name+"'>" + "<h2>" + rank + ". " + name + "</h2><p>Publicerat: </p>" + date + "</article>");
                });
            } else {

                $.each(response, function (index, value) {
                    var name = value.name;
                    var date = value.yearPublished;
                    var thumb = value.thumbnail;
                    var rank = value.rank;

                    if (date !== 2023) {
                        numberOfGames++;
                        items.push("<article><img src= " + thumb + " alt='Thumbnail for "+name+"'>" + "<h2>" + rank + ". " + name + "</h2><p>Publicerat: </p>" + date + "</article>");
                    }
                });
            }
        
            $("#games").html(items.join(""));

            $("#noOfGames").text("Antal spel: " + numberOfGames);
        }
    });
}