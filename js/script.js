
function recherche(ville){
    var mymap = L.map('mapid').setView([48.5833, 7.75], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=XXXXXXXX', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    $.ajax({
        url: 'http://api.weatherstack.com/current',
        data: {
            access_key: 'XXXXXXXX',
            query: ville
            // query: $("#ville").val()
        },
        dataType: 'json',
        success: function(apiResponse) {
           // console.log(apiResponse.error)
            if (!apiResponse.error){
                $("#result").html(
                    "<h1>Pays : " + apiResponse.location.country + "</h1>" +
                    "<h2>Région : " + apiResponse.location.region + "</h2>" +
                    "<h3>Ville : " + apiResponse.location.name + "</h3>" +
                    "<p>Latitude : " + apiResponse.location.lat + "</p>" +
                    "<p>Longitude : " + apiResponse.location.lon + "</p>" + 
                    "<img src='" + apiResponse.current.weather_icons + "'>" + 
                    "<p>" + apiResponse.current.temperature + "C°</p>" +
                    "<p>Dernier relevé à : " + apiResponse.current.observation_time + "</p>"
                )
                var arrayGPS = []
                var zone = [apiResponse.location.lat,apiResponse.location.lon]
                var marker = L.marker(zone).bindPopup(apiResponse.location.name).addTo(mymap);
                arrayGPS.push(zone)
                mymap.fitBounds([zone]);
            }else{
                $("#result").html(
                    "<h1>Ce lieu n'existe pas !</h1>"
                ) 
            }
        }
    });
}

$("#validation").click(function(){
    recherche($(".ville").val())
})



$.ajax({
    url: 'https://api.apify.com/v2/key-value-stores/ufVgKLP8ljtn3ufaU/records/LATEST?disableRedirect=true',
    dataType: 'json',
    success: function(apiResponse) {
       // console.log(apiResponse.error)
        $("#covid").html(
            "<h3>Stats du Covid en France </h3>" +
            "<p>Morts (total) : " + apiResponse.deceased + "</p>" +
            "<p>Morts à l'hôpital : " + apiResponse.hospitalDeceased + "</p>" +
            "<p>Infectés : " + apiResponse.infected + "</p>" +
            "<p>Guéris : " + apiResponse.recovered + "</p>" +
            "<p>Hospitalisés : " + apiResponse.hospitalized + "</p>" +
            "<p>Nouveaux hospitalisés : " + apiResponse.newlyHospitalized + "</p>" +
            "<p>En soins intensifs : " + apiResponse.intensiveCare + "</p>" +
            "<p>Nouveaux en soins intensifs : " + apiResponse.newlyIntensiveCare + "</p>" 
        ) 
    }
});



