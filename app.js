var map = L.map('map').setView([52, 22.5], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


map.dragging.disable(); 
map.scrollWheelZoom.disable();

var wojela = L.geoJson(wojewodztwa.features).addTo(map);
wojela.setStyle({color: "blue"})
wojela.setStyle({fillOpacity: 0.7})

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


var czerwoneWojewodztwa = [];
var zieloneWojewodztwa = [];
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
            if(poprzednieWojewodztwo !=undefined) zieloneWojewodztwa.push(poprzednieWojewodztwo);

        }
        if(nazwa != poprzednieWojewodztwo){
            zmienKolor(poprzednieWojewodztwo, "red");
            if(poprzednieWojewodztwo !=undefined) czerwoneWojewodztwa.push(poprzednieWojewodztwo);
        }
           zmienKolor(wylosowaneWojewodztwo, "yellow");
            var ilePozostalo = dostepneWojewodztwa.length;
        
            document.getElementById("los").innerHTML = "Zatwierdz"
    }
    if(wylosowaneWojewodztwo == null){
        document.getElementById("body").innerHTML = ""
        document.getElementById("body").style.backgroundColor = "black"
        document.getElementById("body").setAttribute("class", "body")
        
        
        const h1 = document.createElement("h1")
        h1.innerHTML = "Twój Wynik: "
        h1.style.color = "white"
        document.getElementById("body").appendChild(h1)


        const div_Z = document.createElement("div")
        div_Z.setAttribute("id", "divz")
        div_Z.style.height = "600px"
        div_Z.style.width = "1000px"
        document.getElementById("body").appendChild(div_Z)

        const zielony = document.createElement("ul")
        zielony.innerHTML = "Dobre"
        zielony.style.color = "white"
        zielony.setAttribute("id", "zielone")
        div_Z.appendChild(zielony)

        const czerwony = document.createElement("ul")
        czerwony.innerHTML = "Złe"
        czerwony.style.color = "white"
        czerwony.setAttribute("id", "czerwone")
        div_Z.appendChild(czerwony)
       
        var czerwoneLista = document.getElementById("czerwone");
        czerwoneWojewodztwa.forEach(function (wojewodztwo) {
            var li = document.createElement("li");
            li.innerHTML = wojewodztwo;
            li.style.color = "red"
            czerwoneLista.appendChild(li);
        });

      
        var zieloneLista = document.getElementById("zielone");
        zieloneWojewodztwa.forEach(function (wojewodztwo) {
            var li = document.createElement("li");
            li.innerHTML = wojewodztwo;
            li.style.color = "green"
            zieloneLista.appendChild(li);
        });
    }

    
    console.log("Czerwone województwa:", czerwoneWojewodztwa);
    console.log("Zielone województwa:", zieloneWojewodztwa);
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






