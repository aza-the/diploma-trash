console.log("FLATS.JS started");

console.log($(window).width());

document.onload = init();

function init(){


const first = 1200
const second = 700

// function that scrolls to obj_scrollto smoothly
function scroll_to(obj_scrollto){
    obj_scrollto.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
}

let changed_obj;

// function that makes the font bigger and brighter
function hihglight_obj(obj){
    if($(window).width() >= first){
        changed_obj.style.fontSize = "1.4em";  // should return to the original size of .sidenav a (styles.css file) font size
        obj.style.fontSize = "1.7em";

    }
    else if($(window).width() >= second){
        changed_obj.style.fontSize = "0.8em";  // should return to the original size of .sidenav a (styles.css file) font size
        obj.style.fontSize = "1.1em";

    }
    changed_obj.style.color = "#cdcdcd";  // should return to the original color of .sidenav a (styles.css file) color
    obj.style.color = "#ffffff";
    changed_obj = obj;
}


const formelement_about = document.getElementById("formelement_about");
const about = document.getElementById("about");
if($(window).width() > first){
    about.style.fontSize = "1.7em";
}
else if($(window).width() > second){
    about.style.fontSize = "1.1em";
}
about.style.color = "#ffffff";
changed_obj = about;
about.addEventListener("click", () => {
    scroll_to(formelement_about);
    hihglight_obj(about);
}); 


const formelement_place = document.getElementById("formelement_place");
const place = document.getElementById("place");
place.addEventListener("click", () => {
    scroll_to(formelement_place);
    hihglight_obj(place);
}); 

const formelement_underground = document.getElementById("formelement_underground");
const underground = document.getElementById("underground");
underground.addEventListener("click", () => {
    scroll_to(formelement_underground);
    hihglight_obj(underground);
}); 

const formelement_about_flat = document.getElementById("formelement_about_flat");
const about_flat = document.getElementById("about_flat");
about_flat.addEventListener("click", () => {
    scroll_to(formelement_about_flat);
    hihglight_obj(about_flat);
}); 

const formelement_about_building = document.getElementById("formelement_about_building");
const about_building = document.getElementById("about_building");
about_building.addEventListener("click", () => {
    scroll_to(formelement_about_building);
    hihglight_obj(about_building);
}); 

const formelement_walls = document.getElementById("formelement_walls");
const walls = document.getElementById("walls"); 
walls.addEventListener("click", () => {
    scroll_to(formelement_walls);
    hihglight_obj(walls);
}); 



// next buttons

const formelement_about_next = document.getElementById("formelement_about_next");
formelement_about_next.addEventListener("click", () => {
    scroll_to(formelement_place);
    hihglight_obj(place);
}); 

const formelement_place_next = document.getElementById("formelement_place_next");
formelement_place_next.addEventListener("click", () => {
    scroll_to(formelement_underground);
    hihglight_obj(underground);
}); 

const formelement_underground_next = document.getElementById("formelement_underground_next");
formelement_underground_next.addEventListener("click", () => {
    scroll_to(formelement_about_flat);
    hihglight_obj(about_flat);
}); 

const formelement_about_flat_next = document.getElementById("formelement_about_flat_next");
formelement_about_flat_next.addEventListener("click", () => {
    scroll_to(formelement_about_building);
    hihglight_obj(about_building);
}); 

const formelement_about_building_next = document.getElementById("formelement_about_building_next");
formelement_about_building_next.addEventListener("click", () => {
    scroll_to(formelement_walls);
    hihglight_obj(walls);
}); 





// IMG RADIO BUTTON 
let uncheck_underground;
function unhighlight_check_img(){
    if(uncheck_underground){
        uncheck_underground.style.height = "100px";
        uncheck_underground.style.width = "100px";
    }
}

function highlight_check_img(obj) {
    unhighlight_check_img()
    obj.style.height = "120px";
    obj.style.width = "120px";
    uncheck_underground = obj;
}

const by_foot_radio = document.getElementById("by_foot_radio");
const by_foot_img = document.getElementById("by_foot_img");
by_foot_img.addEventListener("click", () => { highlight_check_img(by_foot_img) });
by_foot_radio.addEventListener("click", () => { highlight_check_img(by_foot_img) });

const by_transport_radio = document.getElementById("by_transport_radio");
const by_transport_img = document.getElementById("by_transport_img");
by_transport_img.addEventListener("click", () => { highlight_check_img(by_transport_img) });
by_transport_radio.addEventListener("click", () => { highlight_check_img(by_transport_img) });

const formelement_about_building_find_out = document.getElementById("formelement_about_building_find_out");
const info_details = document.getElementById("info_details");
formelement_about_building_find_out.addEventListener("click", () => {
    scroll_to(info_details)
});


// * back button 


const reload_btn = document.getElementById("reload_btn");
reload_btn.addEventListener ("click", () => {
    location.href = "/flats/";
});

const formelement_place_back = document.getElementById("formelement_place_back");
formelement_place_back.addEventListener("click", () => {
    scroll_to(formelement_about);
    hihglight_obj(formelement_about);
});

const formelement_underground_back = document.getElementById("formelement_underground_back");
formelement_underground_back.addEventListener("click", () => {
    scroll_to(formelement_place);
    hihglight_obj(formelement_place);
});

const formelement_about_flat_back = document.getElementById("formelement_about_flat_back");
formelement_about_flat_back.addEventListener("click", () => {
    scroll_to(formelement_underground);
    hihglight_obj(formelement_underground);
});

const formelement_about_building_back = document.getElementById("formelement_about_building_back");
formelement_about_building_back.addEventListener("click", () => {
    scroll_to(formelement_about_flat);
    hihglight_obj(formelement_about_flat);
});

const formelement_walls_back = document.getElementById("formelement_walls_back");
formelement_walls_back.addEventListener("click", () => {
    scroll_to(formelement_about_building);
    hihglight_obj(formelement_about_building);
});

}
