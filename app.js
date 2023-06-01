var map = L.map('map').setView([52, 22.5], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


map.dragging.disable(); 
map.scrollWheelZoom.disable();

var wojela = L.geoJson(wojewodztwa.features).addTo(map);
wojela.setStyle({color: "blue"})

var dostepneWojewodztwa = wojela.getLayers()

function losuj() {
    if (dostepneWojewodztwa.length === 0) {
        return null;
    }

    var wylosowanyIndex = Math.floor(Math.random() * dostepneWojewodztwa.length)
    var wylosowane = dostepneWojewodztwa[wylosowanyIndex]
    var nazwaWojewodztwa = wylosowane.feature.properties.nazwa

    dostepneWojewodztwa.splice(wylosowanyIndex, 1)

    return nazwaWojewodztwa

}

function zmienKolor(wojewodztwo, color) {
    wojela.eachLayer(function (layer) {
        if (layer.feature.properties.nazwa === wojewodztwo) {
            layer.setStyle({ color: color });
        }
    });
}

var wylosowaneWojewodztwa = [];

function wylosuj() {

    var wylosowaneWojewodztwo = losuj();
    document.getElementById("los").innerHTML = "Losuj"
    const nazwa = document.getElementById("input").value
    if (wylosowaneWojewodztwo !== null || dostepneWojewodztwa == 0) {
        console.log(wylosowaneWojewodztwo);

        wylosowaneWojewodztwa.push(wylosowaneWojewodztwo);

        if (wylosowaneWojewodztwa.length > 1) {
            var poprzednieWojewodztwo = wylosowaneWojewodztwa[wylosowaneWojewodztwa.length - 2];
          //  zmienKolor(poprzednieWojewodztwo, "red");
        }

        if(nazwa == poprzednieWojewodztwo){

            zmienKolor(poprzednieWojewodztwo, "green");
        }
        if(nazwa != poprzednieWojewodztwo){
            zmienKolor(poprzednieWojewodztwo, "red");
        }
           zmienKolor(wylosowaneWojewodztwo, "yellow");
            var ilePozostalo = dostepneWojewodztwa.length;
        
            document.getElementById("los").innerHTML = "Zatwierdz"
    }
    if(wylosowaneWojewodztwo == null){
        console.log("ok")
        document.getElementById("los").remove()
        document.getElementById("input").remove()
        document.getElementById("ok").innerHTML = "Nie ma juz dostepnych wojewodztw!!!"
    }

}


wojela.eachLayer(function (layer) {
    layer.on("mouseover", function () {
        var color = layer.options.color;
        if (color !== "yellow" && color !== "red" && color !== "green") {
            layer.setStyle({ color: "black" });
        }
    });

    layer.on("mouseout", function () {
        var color = layer.options.color;
        if (color !== "yellow" && color !== "red" && color!=="green") {
            layer.setStyle({ color: "blue" });
        }
    });
});






