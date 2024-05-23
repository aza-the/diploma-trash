var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {

    $('#formelement_about_building_find_out').bind({
        click: function () {
            if(!myMap){
                myMap = new ymaps.Map('map', {
                    center: [55.76, 37.64], // Новосибирск
                    zoom: 10
                }, {
                    searchControlProvider: 'yandex#search'
                });
            }
        }
    });

}


const formelement_about_building_find_out = document.getElementById("formelement_about_building_find_out");
formelement_about_building_find_out.addEventListener("click", () => {
    ymaps.geocode(address, { 
        results : 1     
    }).then(function (res) {
        // Выбираем первый результат геокодирования.
        var firstGeoObject = res.geoObjects.get(0),
            // Координаты геообъекта.
            coords = firstGeoObject.geometry.getCoordinates(),
            // Область видимости геообъекта.
            bounds = firstGeoObject.properties.get('boundedBy');

        firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
        // Получаем строку с адресом и выводим в иконке геообъекта.
        firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

        // Добавляем первый найденный геообъект на карту.
        myMap.geoObjects.add(firstGeoObject);
        // Масштабируем карту на область видимости геообъекта.
        myMap.setBounds(bounds, {
            // Проверяем наличие тайлов на данном масштабе.
            checkZoomRange: true
        });
    });
});
