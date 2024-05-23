console.log("MAINSCRIPT.JS started");

const load_button = document.getElementById("load");
load_button.addEventListener("click", () => {
    location.href = "/flats/fileupload/";
})

const about = document.getElementById("about");
const about_img = document.getElementById("about_img");
const about_main_div = document.getElementById("about_main_div");
about.addEventListener("click", () => {
    scroll_to(about_main_div);
}); 

const district = document.getElementById("district");
const district_img = document.getElementById("district_img");
const district_main_div = document.getElementById("district_main_div");
district.addEventListener("click", () => {
    scroll_to(district_main_div);
});
const underground = document.getElementById("underground");
const underground_img = document.getElementById("underground_img");
const underground_main_div = document.getElementById("underground_main_div");
underground.addEventListener("click", () => {
    scroll_to(underground_main_div);
});
const flat_sizes = document.getElementById("flat_sizes");
const flat_sizes_img = document.getElementById("flat_sizes_img");
const flat_main_div = document.getElementById("flat_main_div");
flat_sizes.addEventListener("click", () => {
    scroll_to(flat_main_div);
});
const renovation = document.getElementById("renovation");
const renovation_img = document.getElementById("renovation_img");
const renovation_main_div = document.getElementById("renovation_main_div");
renovation.addEventListener("click", () => {
    scroll_to(renovation_main_div);
});
const building = document.getElementById("building");
const about_building_img = document.getElementById("about_building_img");
const building_main_div = document.getElementById("building_main_div");
building.addEventListener("click", () => {
    scroll_to(building_main_div);
});
const type_of_building = document.getElementById("type_of_building");
const type_of_building_img = document.getElementById("type_of_building_img");
const typeBuild_main_div = document.getElementById("typeBuild_main_div");
type_of_building.addEventListener("click", () => {
    scroll_to(typeBuild_main_div);
});
const walls = document.getElementById("walls");
const type_of_walls_img = document.getElementById("type_of_walls_img");
const walls_main_div = document.getElementById("walls_main_div");
walls.addEventListener("click", () => {
    scroll_to(walls_main_div);
});


// for continue buttons

const start = document.getElementById("start");
start.addEventListener("click", () => {
    scroll_to(district_main_div);
});

const continue_district = document.getElementById("continue_district");
continue_district.addEventListener("click", () => {
    scroll_to(underground_main_div);
});

const continue_underground = document.getElementById("continue_underground");
continue_underground.addEventListener("click", () => {
    scroll_to(flat_main_div);
});

const continue_flat_sizes = document.getElementById("continue_flat_sizes");
continue_flat_sizes.addEventListener("click", () => {
    scroll_to(renovation_main_div);
});

const continue_renovation = document.getElementById("continue_renovation");
continue_renovation.addEventListener("click", () => {
    scroll_to(building_main_div);
});

const continue_constructed = document.getElementById("continue_constructed");
continue_constructed.addEventListener("click", () => {
    scroll_to(typeBuild_main_div);
});

const continue_type_of_building = document.getElementById("continue_type_of_building");
continue_type_of_building.addEventListener("click", () => {
    scroll_to(walls_main_div);
});



//automatically hihglight_obj if user on it
const del = 100;
const size_of_div = 500 // should be equal to .content_div height (styles.css file)
window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    if(scroll >= 0 && scroll <= size_of_div-del) {
        hihglight_obj(about);
        changed_obj = about;
    }
    else if(scroll >= size_of_div-del && scroll <= size_of_div*2-del) {
        hihglight_obj(district);
        changed_obj = district;
    }
    else if(scroll >= size_of_div*2-del && scroll <= size_of_div*3-del) {
        hihglight_obj(underground);
        changed_obj = underground;
    }
    else if(scroll >= size_of_div*3-del && scroll <= size_of_div*4-del) {
        hihglight_obj(flat_sizes);
        changed_obj = flat_sizes;
    }
    else if(scroll >= size_of_div*4-del && scroll <= size_of_div*5-del) {
        hihglight_obj(renovation);
        changed_obj = renovation;
    }
    else if(scroll >= size_of_div*5-del && scroll <= size_of_div*6-del) {
        hihglight_obj(building);
        changed_obj = building;
    }
    else if(scroll >= size_of_div*6-del && scroll <= size_of_div*7-del) {
        hihglight_obj(type_of_building);
        changed_obj = type_of_building;
    }
    else if(scroll >= size_of_div*7-del && scroll <= size_of_div*8-del) {
        hihglight_obj(walls);
        changed_obj = walls;
    }
});

// function that makes the font bigger and brighter
function hihglight_obj(obj){
    changed_obj.style.fontSize = "23px";  // should return to the original size of .sidenav a (styles.css file) font size
    changed_obj.style.color = "#dfd5d5";  // should return to the original color of .sidenav a (styles.css file) color
    obj.style.fontSize = "35px";
    obj.style.color = "#ffffff";
    changed_obj = obj;
}

// function that scrolls to obj_scrollto smoothly
function scroll_to(obj_scrollto){
    obj_scrollto.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
}

// for remebering the obj of side nav to change back to the normal condition
let changed_obj = about;
// initial condition of site
changed_obj.style.fontSize = "40px";
changed_obj.style.color = "#ffffff";



// CHECKBOXES

function unhighlight_check_img(obj, obj_c){
    if(obj_c.checked){
        obj_c.checked = false;
        obj.style.height = "100px";
        obj.style.width = "100px"
    }
}

function highlight_check_img(obj, obj_c) {
    if(obj_c.checked){
        obj.style.height = "100px";
        obj.style.width = "100px"
    }
    else{
        obj.style.height = "90px";
        obj.style.width = "90px";
    }
}

// for remebering the checkbox and img that was clicked and unhighlight(uncheck) them if needed
let obj_prev_und;
let obj_c_prev_und;

function highlight_und(obj, obj_c){
    if(obj_prev_und && obj_prev_und != obj){
        unhighlight_check_img(obj_prev_und, obj_c_prev_und);
    }
    highlight_check_img(obj, obj_c);
    obj_prev_und = obj;
    obj_c_prev_und = obj_c;
}

const underground_c_by_foot = document.getElementById('underground_c_by_foot');
const underground_img_by_foot = document.getElementById('underground_img_by_foot');
underground_img_by_foot.addEventListener('click', () => {
    highlight_und(underground_img_by_foot, underground_c_by_foot, obj_prev_und, obj_c_prev_und);
});

const underground_c_by_transport = document.getElementById('underground_c_by_transport');
const underground_img_by_transport = document.getElementById('underground_img_by_transport');
underground_img_by_transport.addEventListener('click', () => {
    highlight_und(underground_img_by_transport, underground_c_by_transport, obj_prev_und, obj_c_prev_und);
});


// for remebering the checkbox and img that was clicked and unhighlight(uncheck) them if needed
let obj_prev_ren;
let obj_c_prev_ren;

function highlight_ren(obj, obj_c){
    if(obj_prev_ren && obj_prev_ren != obj){
        unhighlight_check_img(obj_prev_ren, obj_c_prev_ren);
    }
    highlight_check_img(obj, obj_c);
    obj_prev_ren = obj;
    obj_c_prev_ren = obj_c;
}

const renovation_c_renovation = document.getElementById('renovation_c_renovation');
const renovation_img_renovation = document.getElementById('renovation_img_renovation');
renovation_img_renovation.addEventListener('click', () => {
    highlight_ren(renovation_img_renovation, renovation_c_renovation, obj_prev_ren, obj_c_prev_ren);
});

const renovation_c_cosmetic = document.getElementById('renovation_c_cosmetic');
const renovation_img_cosmetic = document.getElementById('renovation_img_cosmetic');
renovation_img_cosmetic.addEventListener('click', () => {
    highlight_ren(renovation_img_cosmetic, renovation_c_cosmetic, obj_prev_ren, obj_c_prev_ren);
});

const renovation_c_designer = document.getElementById('renovation_c_designer');
const renovation_img_designer = document.getElementById('renovation_img_designer');
renovation_img_designer.addEventListener('click', () => {
    highlight_ren(renovation_img_designer, renovation_c_designer, obj_prev_ren, obj_c_prev_ren);
});

const renovation_c_no = document.getElementById('renovation_c_no');
const renovation_img_no = document.getElementById('renovation_img_no');
renovation_img_no.addEventListener('click', () => {
    highlight_ren(renovation_img_no, renovation_c_no, obj_prev_ren, obj_c_prev_ren);
});


// for remebering the checkbox and img that was clicked and unhighlight(uncheck) them if needed
let obj_prev_build;
let obj_c_prev_build;

function highlight_type_of_b(obj, obj_c){
    if(obj_prev_build && obj_prev_build != obj){
        unhighlight_check_img(obj_prev_build, obj_c_prev_build);
    }
    highlight_check_img(obj, obj_c);
    obj_prev_build = obj;
    obj_c_prev_build = obj_c;
}

const building_c_block_construction = document.getElementById('building_c_block_construction');
const building_img_block_construction = document.getElementById('building_img_block_construction');
building_img_block_construction.addEventListener('click', () => {
    highlight_type_of_b(building_img_block_construction, building_c_block_construction, obj_prev_build, obj_c_prev_build);
});

const building_c_brick_construction = document.getElementById('building_c_brick_construction');
const building_img_brick_construction = document.getElementById('building_img_brick_construction');
building_img_brick_construction.addEventListener('click', () => {
    highlight_type_of_b(building_img_brick_construction, building_c_brick_construction, obj_prev_build, obj_c_prev_build);
});

const building_c_foam_concrete_construction = document.getElementById('building_c_foam_concrete_construction');
const building_img_foam_concrete_construction = document.getElementById('building_img_foam_concrete_construction');
building_img_foam_concrete_construction.addEventListener('click', () => {
    highlight_type_of_b(building_img_foam_concrete_construction, building_c_foam_concrete_construction, obj_prev_build, obj_c_prev_build);
});

const building_c_monolith_brick_construction = document.getElementById('building_c_monolith_brick_construction');
const building_img_monolith_brick_construction = document.getElementById('building_img_monolith_brick_construction');
building_img_monolith_brick_construction.addEventListener('click', () => {
    highlight_type_of_b(building_img_monolith_brick_construction, building_c_monolith_brick_construction, obj_prev_build, obj_c_prev_build);
});

const building_c_monolith_construction = document.getElementById('building_c_monolith_construction');
const building_img_monolith_construction = document.getElementById('building_img_monolith_construction');
building_img_monolith_construction.addEventListener('click', () => {
    highlight_type_of_b(building_img_monolith_construction, building_c_monolith_construction, obj_prev_build, obj_c_prev_build);
});

const building_c_panel_construction = document.getElementById('building_c_panel_construction');
const building_img_panel_construction = document.getElementById('building_img_panel_construction');
building_img_panel_construction.addEventListener('click', () => {
    highlight_type_of_b(building_img_panel_construction, building_c_panel_construction, obj_prev_build, obj_c_prev_build);
});

const building_c_stalins_construction = document.getElementById('building_c_stalins_construction');
const building_img_stalins_construction = document.getElementById('building_img_stalins_construction');
building_img_stalins_construction.addEventListener('click', () => {
    highlight_type_of_b(building_img_stalins_construction, building_c_stalins_construction, obj_prev_build, obj_c_prev_build);
});

const building_c_wooden_construction = document.getElementById('building_c_wooden_construction');
const building_img_wooden_construction = document.getElementById('building_img_wooden_construction');
building_img_wooden_construction.addEventListener('click', () => {
    highlight_type_of_b(building_img_wooden_construction, building_c_wooden_construction, obj_prev_build, obj_c_prev_build);
});

const building_c_idk = document.getElementById('building_c_idk');
const building_img_idk = document.getElementById('building_img_idk');
building_img_idk.addEventListener('click', () => {
    highlight_type_of_b(building_img_idk, building_c_idk, obj_prev_build, obj_c_prev_build);
});

// for remebering the checkbox and img that was clicked and unhighlight(uncheck) them if needed
let obj_prev_walls;
let obj_c_prev_walls;

function highlight_type_of_w(obj, obj_c){
    if(obj_prev_walls && obj_prev_walls != obj){
        unhighlight_check_img(obj_prev_walls, obj_c_prev_walls);
    }
    highlight_check_img(obj, obj_c);
    obj_prev_walls = obj;
    obj_c_prev_walls = obj_c;
}

const walls_c_mixed_walls = document.getElementById('walls_c_mixed_walls');
const walls_img_mixed_walls = document.getElementById('walls_img_mixed_walls');
walls_img_mixed_walls.addEventListener('click', () => {
    highlight_type_of_w(walls_img_mixed_walls, walls_c_mixed_walls, obj_prev_build, obj_c_prev_build);
});

const walls_c_reinforced_concrete_walls = document.getElementById('walls_c_reinforced_concrete_walls');
const walls_img_reinforced_concrete_walls = document.getElementById('walls_img_reinforced_concrete_walls');
walls_img_reinforced_concrete_walls.addEventListener('click', () => {
    highlight_type_of_w(walls_img_reinforced_concrete_walls, walls_c_reinforced_concrete_walls, obj_prev_build, obj_c_prev_build);
});

const walls_c_wooden_walls = document.getElementById('walls_c_wooden_walls');
const walls_img_wooden_walls = document.getElementById('walls_img_wooden_walls');
walls_img_wooden_walls.addEventListener('click', () => {
    highlight_type_of_w(walls_img_wooden_walls, walls_c_wooden_walls, obj_prev_build, obj_c_prev_build);
});

const walls_c_idk = document.getElementById('walls_c_idk');
const walls_img_idk = document.getElementById('walls_img_idk');
walls_img_idk.addEventListener('click', () => {
    highlight_type_of_w(walls_img_idk, walls_c_idk, obj_prev_build, obj_c_prev_build);
});