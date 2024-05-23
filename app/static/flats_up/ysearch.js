ymaps.ready(init);

const first = 1200
const second = 700

let address;

function init() {
    const infodiv = document.getElementById('infodiv')
    const infodiv1 = document.getElementById('infodiv1')

    // Создаем выпадающую панель с поисковыми подсказками и прикрепляем ее к HTML-элементу по его id.
    var suggestViewOfLocation = new ymaps.SuggestView('suggest', {results: 4, boundedBy: [[55, 36], [56, 38]]});

    var suggestViewOfUndergroundStation = new ymaps.SuggestView('underground_station', {provider: provider, results: 4});

    function create_h2(text){
        if($(window).width() < first){
            return
        }
        const element = document.createElement("h2");
        element.innerText = text;
        element.style.textAlign = "right";
        element.style.fontFamily = "monospace";
        element.style.fontSize = "1.4em";
        element.style.color = "#ffffff";

        return element;
    }

    function create_h2_1(text){
        if($(window).width() < first){
            return
        }
        const element = document.createElement("h2");
        element.innerText = text;
        element.style.fontFamily = "monospace";
        element.style.fontSize = "1.4em";
        element.style.color = "#ffffff";

        return element;
    }

    function create_p(text, size="auto"){
        if($(window).width() < first){
            return
        }
        const element = document.createElement("p");
        element.innerText = text;
        element.style.textAlign = "right";
        element.style.fontFamily = "monospace";
        element.style.fontSize = "0.8em";
        element.style.color = "#ffffff";
        element.style.marginLeft = "auto";
        element.style.width = size;

        return element;
    }
    function create_p_1(text, size="auto"){
        if($(window).width() < first){
            return
        }
        const element = document.createElement("p");
        element.innerText = text;
        element.style.fontFamily = "monospace";
        element.style.fontSize = "0.8em";
        element.style.color = "#ffffff";
        element.style.width = size;

        return element;
    }



    let loc_idx = 0;
    const find = document.getElementById('formelement_place_next');
    find.addEventListener( "click", () => {
        const suggest = document.getElementById('suggest');
        if(suggest.value == ""){
            return;
        }

        address = suggest.value;
        console.log(address);

        ymaps.geocode(suggest.value, { results : 1 }).then(function (res) {



            return ymaps.geocode(res.geoObjects.get(0).geometry.getCoordinates(), { kind: 'district', results: 1 });
    
        }).then(function (res) {
            const result = res.geoObjects.get(0).properties.getAll();
            const district = result.text;
            const place_to_save = document.getElementById("suggest");
            place_to_save.value = district;

            if(loc_idx == 0){
                
                
                infodiv.appendChild(create_h2("Местоположение"));
                infodiv.appendChild(create_p(district, "210px"));
    
                infodiv1.appendChild(create_h2_1("Местоположение"));
                infodiv1.appendChild(create_p_1(district, "210px"));

                loc_idx += 1;
            }

        });
    });

    let metro_idx_ = 0;
    const formelement_underground_next = document.getElementById("formelement_underground_next");
    formelement_underground_next.addEventListener("click", () => {

        if(metro_idx_ == 0){
            const underground_station = document.getElementById("underground_station");
            const underground_time = document.getElementById("underground_time");
            const underground_get_type = document.querySelector('input[name="underground_get_type"]:checked').value;
            infodiv.appendChild(create_h2("Метро"));
            infodiv.appendChild(create_p(underground_station.value));

            infodiv.appendChild(create_h2("Время"));
            infodiv.appendChild(create_p(underground_time.value + " м " + underground_get_type));

            infodiv1.appendChild(create_h2_1("Метро"));
            infodiv1.appendChild(create_p_1(underground_station.value));

            infodiv1.appendChild(create_h2_1("Время"));
            infodiv1.appendChild(create_p_1(underground_time.value + " м " + underground_get_type));

            metro_idx_ += 1;
        }


    });


    let flat_next_idx = 0;
    const formelement_about_flat_next = document.getElementById("formelement_about_flat_next");
    formelement_about_flat_next.addEventListener("click", () => {
        if (flat_next_idx == 0){
            const flats = document.getElementById("flats");
            if(flats.value == ""){
                return;
            }
            const flat_size = document.getElementById("flat_size");
            const kitchen_size = document.getElementById("kitchen_size");
            const storey = document.getElementById("storey");
            const storeys = document.getElementById("storeys");
    
            infodiv.appendChild(create_h2("О квартире"));
            infodiv.appendChild(create_p("Комнат: " + flats.value + ", общая площадь: " +  flat_size.value + " кв," + " этаж " + storey.value + " из " + storeys.value, "200px"));

            infodiv1.appendChild(create_h2_1("О квартире"));
            infodiv1.appendChild(create_p_1("Комнат: " + flats.value + ", общая площадь: " +  flat_size.value + " кв," + " этаж " + storey.value + " из " + storeys.value, "200px"));

            flat_next_idx += 1;
        }
    });

    let building_next_idx = 0;
    const formelement_about_building_next = document.getElementById("formelement_about_building_next");
    formelement_about_building_next.addEventListener("click", () => {

        if(building_next_idx == 0){
            const date_constrcucted = document.getElementById("date_constrcucted");
            const construction_type = document.querySelector('input[name="construction_type"]:checked').value;
    
            infodiv.appendChild(create_h2("О здании"));
            infodiv.appendChild(create_p("Год постройки: " + date_constrcucted.value + ", тип дома: " + construction_type, "200px"));

            infodiv1.appendChild(create_h2_1("О здании"));
            infodiv1.appendChild(create_p_1("Год постройки: " + date_constrcucted.value + ", тип дома: " + construction_type, "200px"));

            building_next_idx += 1;
        }
    });

}



function scroll_to(obj_scrollto){
    obj_scrollto.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
}

function submitForm() {
    let formElement = document.getElementById('form_flat');
    let data = new FormData(formElement);
    let object = {};
    for (var [key, value] of data.entries()) {
        console.log(key, value);
        object[key] = value;
    }
    console.log(object);

    fetch('/flats/', {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })
        .then(response => {
            if(response.status >= 400){
                return '"Итог":"Ошибка ввода"';
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            data = data.split('"');
            document.getElementById("responseArea").innerHTML = data[1] + ": " + data[3];
            document.getElementById("responseArea2").innerHTML = data[1] + ": " + data[3];
        })
        .catch(error => {
            console.error(1, error);
        });

    const style = document.createElement("style");

    if($(window).width() >= first){
        style.textContent = `
        .formclass {
            position: fixed;
            display: block;
            background-color: #418493;
            border-left: solid 2px #387382;
            border-right: solid 0px #387382;
            margin-left: 22%;
            height: 83%;
            width: 45%;
            border-radius: 10px;
            padding: 2%;
            color: #fff;
            transition: 500ms;
            z-index: 1;
        }
        
        .mapsclass {
            position: fixed;
            display: block;
            background-color: #3e7e8c;
            border-right: solid 2px #387382;
            margin-left: 2%;
            height: 83%;
            width: 45%; 
            border-radius: 10px;
            padding: 2%;
            transition: 500ms;
            z-index: 1;
        }
        `;
    }
    else if($(window).width() >= second){
        style.textContent = `
        .formclass {
            position: fixed;
            display: block;
            background-color: #418493;
            border-left: solid 2px #387382;
            border-right: solid 0px #387382;
            margin-left: 2%;
            height: 83%;
            width: 45%;
            border-radius: 10px;
            padding: 2%;
            color: #fff;
            transition: 500ms;
            z-index: 1;
        }
        
        .mapsclass {
            position: fixed;
            display: block;
            background-color: #3e7e8c;
            border-right: solid 2px #387382;
            margin-left: 2%;
            height: 83%;
            width: 45%; 
            border-radius: 10px;
            padding: 2%;
            transition: 500ms;
            z-index: 1;
        }
        `;
    }

    loc_idx = 0;
    metro_idx_ = 0;
    flat_next_idx = 0;
    building_next_idx = 0;

    document.head.appendChild(style);

 }
