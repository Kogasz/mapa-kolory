var map = L.map('map').setView([52.505, 24.5], 7);

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
    if (wylosowaneWojewodztwo !== null) {
        console.log(wylosowaneWojewodztwo);

        wylosowaneWojewodztwa.push(wylosowaneWojewodztwo);

        if (wylosowaneWojewodztwa.length > 1) {
            var poprzednieWojewodztwo = wylosowaneWojewodztwa[wylosowaneWojewodztwa.length - 2];
            zmienKolor(poprzednieWojewodztwo, "red");
        }

        if (dostepneWojewodztwa.length === 0) {
            zmienKolor(wylosowaneWojewodztwo, "red");
        } else {
            zmienKolor(wylosowaneWojewodztwo, "yellow");
        }
    } else {
        alert("Wszystkie województwa zostały już wylosowane.");
    }
    
    document.getElementById("los").innerHTML = wylosowaneWojewodztwo;
}

wojela.eachLayer(function (layer) {
    layer.on("mouseover", function () {
        var color = layer.options.color;
        if (color !== "yellow" && color !== "red") {
            layer.setStyle({ color: "green" });
        }
    });

    layer.on("mouseout", function () {
        var color = layer.options.color;
        if (color !== "yellow" && color !== "red") {
            layer.setStyle({ color: "blue" });
        }
    });
});





