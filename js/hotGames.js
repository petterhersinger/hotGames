$(document).ready(function () {

    getGames(true);

    $("#showAll").on("click", function () {
        getGames(true);
    });

    $(document).ready(function () {
        $("#only-released").click(function () {
          getGames(false);
        });
      });

});

function getGames(all) {

    $.ajax({
        url: "http://bgg-json.azurewebsites.net/hot",
        dataType: "json",
        success: function (response) {
            console.log("Förfrågan gick bra!");

            var items = [],
                i = 0,
                numberOfGames = 0,
                rank = 1;
        
            if (all) {
                $.each(response, function (value) {
                    var gameName = value.name;
                    var releaseDate = value.released;
                    var thumbnail = value.thumbnail;
                    items.push("<article>" + thumbnail + "<h2>" + rank + ". " + gameName + "</h2><p>Publicerat:" + releaseDate + "</p></article>");
                    i++; 
                    console.log("Alla funkade");
                });
            } else {
                $.each(response, function (value) {
                    var gameName = value.name;
                    var releaseDate = value.released;
                    var thumbnail = value.thumbnail;
                    if (releaseDate <= 2022) {
                        items.push("<article>" + thumbnail + "<h2>" + rank + ". " + gameName + "</h2><p>Publicerat:" + releaseDate + "</p></article>");
                        i++;
                        console.log("Published funkade");
                    }
                });
            }
        
            $("#games").html(items.join("Number of Games: " + numberOfGames));
        }
    });
}


//1:
// Plocka dynamiskt ut namnet på spelet ur JSON-listan och se till att det visas mellan h2-taggarna. Se till att namnet föregås av rätt placering på heta listan (1, 2, 3 .. n).
// Plocka dynamiskt ut årtalet då spelet publicerades ur JSON-listan och se till att det visas efter ”Publicerat: ”. Kom ihåg att även uppdatera ev variabler med nya värden här.
// (Se vidare punkt 7a, 7b och 7c i uppgiftsbeskrivningen under "Kom igång med uppgiften"). 
// Förutom namn, årtal och listplacering på spelen skall även bilder skrivas ut. Externa URL:er till bilderna kan hämtas ut från svaret vi fått från webbtjänsten, mer specifikt som egenskapen thumbnail.
// Se till att infoga bild-element direkt under föräldraelementet article. (Se vidare punkt 8 i uppgiftsbeskrivningen under "Kom igång med uppgiften").

//2:
//Skriv kod i else-satsen, som reagerar på om getGames inparameter inte är sann. M a o: vad händer om användaren klickat i radio-knappen ”Endast publicerade”?
// Kom ihåg att även uppdatera ev variabler med nya värden här. (Se vidare punkt 10 i uppgiftsbeskrivningen under "Kom igång med uppgiften").

//3:
//Uppdatera sidfoten med antal spel som faktiskt visas. Denna siffra tas fram dynamiskt och förändras därför beroende på vilken radio-knapp som är förkryssad.
// (Se vidare punkt 11 i uppgiftsbeskrivningen under "Kom igång med uppgiften").