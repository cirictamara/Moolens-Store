/* Flex */

const flexColumn = ["d-flex", "flex-column", "justify-content-center", "align-items-center"];
const flexRow = ["d-flex", "flex-row", "flex-wrap", "justify-content-center", "align-items-center"];

// [Body]

addClasses(document.querySelectorAll("body > *:not(#page-progress)"), flexColumn);

let sections = document.querySelectorAll("main > section");

for (let i = 0; i < sections.length; i++) 
    sections[i].classList.add("w-100");

// [Functions] 
// Set Attributes / Add Classes / Remove Classes / Change Classes / Append Children 

function setAttributes(elements, attributes) {
    for (let i = 0; i < elements.length; i++) 
        for (let j = 0; j < attributes.length; j += 2) 
            elements[i].setAttribute(attributes[j], attributes[j + 1]);
}

function addClasses(elements, classes) {
	for (let element of elements)
        for (let i in classes) 
            element.classList.add(classes[i]);
}

function removeClasses(element, classes) {
	for (let i of classes) 
        element.classList.remove(i);
}

function changeClasses(element, classesRemove, classesAdd) {
    removeClasses(element, classesRemove);
    addClasses([element], classesAdd);
} 

function appendChildren(element, childern) {
    for (let child of childern)
        element.appendChild(child);
}

// [Page Loader] 

$(document).ready(function() {
    let loader = $("#page-loader");

    const loaderImages = [ {"src": "logo.png", "alt": "Moolen's Logo"}, 
                           {"src": "logo.png", "alt": "Moolen's Logo"} ];

    let loaderContent = "";
    for (let i = 0; i < 2; i++) 
        loaderContent += 
        `<div class = "position-absolute">
             <img src = "assets/img/${loaderImages[i].src}" alt = "${loaderImages[i].alt}" />
         </div>`;
        
    loader.html(loaderContent);

    loader.fadeOut(2000, () => {
        loader.addClass("d-none");
    });
});

// [Page Progess Bar] 

document.getElementById("page-progress").innerHTML = `<div class = "progress-bar h-100"></div>`;

function progressBar() {
    let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
	let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	let scrolled = (windowScroll / height) * 100;
	document.querySelector(".progress-bar").style.width = scrolled + "%";
} 

// [On Scroll] 
// Resizing Header / Page Progress Bar / Changing Active Link 

window.onscroll = function() { 
    scrollFunction(); 
    scrollFunction();
};

function scrollFunction() {
    progressBar();

    let x1 = window.matchMedia("(min-width: 992px)");
    let x2 = window.matchMedia("(max-width: 991px)");

    if (x1.matches) {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("logo").style.cssText = "width: 115px !important; transform: rotate(15deg); top: 0;";
            document.getElementById("header").style.cssText = "padding: 10px 80px 20px 50px; background-color: rgba(255, 255, 255, 0.8);";
        } 
        else {
            document.getElementById("logo").style.cssText = "width: 160px !important; transform: rotate(-20deg); top: 35px;";
            document.getElementById("header").style.cssText = "padding: 10px 70px 10px 30px; background-color: none;";
        }
    }
    if (x2.matches)
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("logo").style.cssText = "width: 100px !important; transform: rotate(15deg); top: 5px;";
            document.querySelector(".navbar-toggler").style.cssText = "top: 20px; right: 20px;";
            document.getElementById("header").style.cssText = "padding-bottom: 0; background-color: rgba(255, 255, 255, 0.8);";
        } 
        else {
            document.getElementById("logo").style.cssText = "width: 120px !important; transform: rotate(-20deg); top: 30px;";
            document.querySelector(".navbar-toggler").style.cssText = "top: 50px; right: 30px;";
            document.getElementById("header").style.cssText = "padding-bottom: 20px; background-color: none;";
        }
}

$(document).ready(function () {
    $(".nav-link").click(function () {
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
    });

    let links = document.querySelectorAll(".nav-link:not(.nav-item:last-child > a)");
    let sections = document.querySelectorAll("#slider, #about, #gallery, #services, #contact");

    function changeActiveLink() {
		let indexSection = sections.length;

		while (--indexSection && window.scrollY + 100 < sections[indexSection].offsetTop) {}
		
		links.forEach((link) => link.classList.remove("active"));
		links[indexSection].classList.add("active");
    }
	
    window.addEventListener("scroll", changeActiveLink);
});

// [jQuery Plugin] Back To Top

$(document).ready(function($) {
    $("body").scrollToTop({
        distance: 200,
        speed: 1000,
    
        mobile: {
            width: 768,
            distance: 100,
            speed: 1000
        },
    
        trigger: null, 
        target: null, 
        text: "Back to top",
    
        skin: null,
        throttle: 250,
    
        namespace: "scrollToTop"
    });
});

// [Header] 

let nav = document.createElement("nav");
nav.classList.add("w-100", "navbar", "navbar-expand-lg", "navbar-light", "p-0", "d-flex", "flex-row", "justify-content-between");

appendChildren(nav, [logo(), navigationMenuControls(), createNavigationMenu()]);
document.getElementById("header").appendChild(nav);

function createNavigationMenu() {
    let navigationMenu = document.createElement("div");
    navigationMenu.classList.add("collapse", "navbar-collapse");

    let pages = 
    [ 
        {"name": "Welcome", "href": "#slider"},
        {"name": "About", "href": "#about"},
        {"name": "Gallery", "href": "#gallery-header"},
        {"name": "Services", "href": "#services"},
        {"name": "Contact", "href": "#contact"},
        {"name": "Portfolio", "href": "https://cirictamara.github.io/portfolio/"} 
    ];

    let ul = document.createElement("ul");
    ul.classList.add("navbar-nav", "mt-lg-3", "ls-1");

    for (let i = 0; i < pages.length; i++) {
        let li = document.createElement("li");
        li.classList.add("nav-item");
        
        let a = document.createElement("a");
        setAttributes([a], ["class", "nav-link fs-14 ls-0", "href", pages[i].href]);

        if (i == 0)
            a.classList.add("active");

        if (i != (pages.length - 1)) 
            li.classList.add("mr-lg-5");
        else 
			a.setAttribute("target", "_blank");
        
        a.appendChild(document.createTextNode(pages[i].name));
        
        li.appendChild(a);
        ul.appendChild(li);
    }
    
    return ul;
}

function logo() {
    let a = document.createElement("a");
    setAttributes([a], ["id", "logo", "class", "navbar-brand position-relative ml-3 ml-lg-0", "href", "#"]);
    a.innerHTML = `<img src = "assets/img/logo.png" alt = "Moolen's Logo" />`;
    return a;
}

function navigationMenuControls() {
    let button = document.createElement("button");
    setAttributes([button], ["type", "button", "class", "navbar-toggler position-absolute", "data-toggle", "collapse", "data-target", "navigation-menu", "aria-controls", "navigation-menu", "aria-expanded", "false", "aria-label", "Toggle navigation"]);

    let span = document.createElement("span");
    span.classList.add("navbar-toggler-icon");
    
    button.appendChild(span);

    var clicks = 0;
    button.addEventListener("click", () => {
        clicks++;
        if (clicks % 2 != 0)
           changeClasses(document.querySelector(".navbar-nav"), ["d-none"], ["show"]);
        else
            changeClasses(document.querySelector(".navbar-nav"), ["show"], ["d-none"]);
    });

    return button;
}

// [Section] Slider

let slider = document.getElementById("slider");

createSlideShow();

function createSlideShow() {
    addClasses([slider], flexRow);
    appendChildren(slider, [createSlides(), sliderIndicators(), sliderControls()]);
}

function createSlides() {
    const slideImages = 
    [ 
        {
            "img_1": {"src": "cover-1.jpg", "alt": "Girl Editorial Photos"}, 
            "img_2": {"src": "cover-2.gif", "alt": "Collage"},
            "img_3": {"src": "cover-3.jpg", "alt": "Toys on stairs"}
        },
        {
            "img_1": {"src": "cover-1.jpg", "alt": "Mom with baby"}, 
            "img_2": {"src": "cover-2.gif", "alt": "Collage"},
            "img_3": {"src": "cover-3.jpg", "alt": "Fun Program"}
        },
        {
            "img_1": {"src": "cover-1.jpg", "alt": "Collage"}, 
            "img_2": {"src": "cover-2.gif", "alt": "Collage"},
            "img_3": {"src": "cover-3.jpg", "alt": "Interior Design"}
        }
    ];

    const slideContents = 
    [
        {
            "h2": "Welcome to Moolen's Store.", 
            "h1": "Childhood is an extraordinary and magical time, fully of challenges and countless adventures. We'd be delighted to be a part of it."
        }, 
        {
            "h3": "The largest selection of creative, popular and educational games in one place &ndash; Moolen's Store!",
            "p": "From plush toys and first baby toys, through miniature kitchens and all kinds of beautiful dolls for your princesses, action figures, metal cars and large tool workshops, to models of cars, planes and ships, such as and a constructor for your little architects and creatives."
        }, 
        {
            "h3": "A large number of kids grew up with Moolen's, due to their special, modern design and unquestionable quality, at very affordable prices.",
            "p": "When you walk into a Moolen's Store, it's hard to know where to start and where to stop!"
        } 
    ];

    let section = document.createElement("section");
    section.classList.add("slider-inner", "w-100", "position-relative");

    for (let i = 0; i < slideContents.length; i++) {
        let article = document.createElement("article");
        addClasses([article], flexColumn);
        article.setAttribute("id", "slide-" + (i + 1));
        article.classList.add("slide", "w-100", "d-none");
        
        let img_1 = document.createElement("img");
        setAttributes([img_1], ["class", "img-1", "src", `assets/img/1/${slideImages[i].img_1.src}`, "alt", slideImages[i].img_1.alt]);

        let img_2 = document.createElement("img");
        setAttributes([img_2], ["class", "img-2 d-none", "src", `assets/img/2/${slideImages[i].img_2.src}`, "alt", slideImages[i].img_2.alt]);

        let img_3 = document.createElement("img");
        setAttributes([img_3], ["class", "img-3 d-none", "src", `assets/img/3/${slideImages[i].img_3.src}`, "alt", slideImages[i].img_3.alt]);
		
        appendChildren(article, [img_1, img_2, img_3, createSlideContent(i, slideContents[i])]);
        section.appendChild(article);
    }
	
    return section;
}

function createSlideContent(i, content) {
	let div = document.createElement("div");
    div.classList.add("px-4", "position-absolute", "slide-content");
	
    switch(i) {
        case 0:
            let h2 = document.createElement("h2");
            h2.classList.add("mb-4", "position-relative", "z-1", "fs-12", "ls-2");
            h2.appendChild(document.createTextNode(content.h2));

            let h1 = document.createElement("h1");
            h1.classList.add("fs-40");
            h1.appendChild(document.createTextNode(content.h1));

            appendChildren(div, [h2, h1]);
        break;
        case 1:
        case 2:
            let h3 = document.createElement("h3");
            h3.innerHTML = content.h3;
            h3.classList.add("pb-4", "font-family", "font-weight-bold");

            let p = document.createElement("p");
            p.appendChild(document.createTextNode(content.p));

            if (i == 1) {
                h3.classList.add("fs-35");
                p.classList.add("px-sm-3", "px-md-5", "fs-16");

                addClasses([h3, p], ["m-auto", "text-center"]);
            }
            else {
                p.classList.add("pr-5", "fs-19");
            }

            appendChildren(div, [h3, p]);
        break;
    }

	return div;
}

function sliderIndicators() {
    let ol = document.createElement("ol");
    setAttributes([ol], ["id", "indicators", "class", "position-absolute"]);

    for (let i = 0; i < 3; i++) {
        let li = document.createElement("li");
        li.setAttribute("value", i);
        if (i != 2)
            li.classList.add("mb-3");
        ol.appendChild(li);
    }

    return ol;
}

function sliderControls() {
    let controls = document.createElement("div");
    setAttributes([controls], ["id", "slider-controls", "class", "position-absolute d-flex flex-row"]);

    const buttons = [ {"id": "previous", "icon": "&lsaquo;"}, 
                      {"id": "next", "icon": "&rsaquo;"} ];

    for (let i = 0; i < buttons.length; i++) {
        let a = document.createElement("a");
        setAttributes([a], ["id", buttons[i].id, "class", "cursor-pointer bg-white fs-25"]);
        a.innerHTML = buttons[i].icon;

        a.addEventListener("click", () => {
            moveSlide(buttons[i].id);
        });
        
        if (i == 0)    
            a.classList.add("mr-2");

        controls.appendChild(a);
        
    }

    return controls;
}

$(document).ready(function() { 
	$(".slide:first-of-type").removeClass("d-none"); 

    var timer;
    window.addEventListener("load", function() {
        timer = setInterval(function() {
            moveSlide("next");
        }, 5000);
    });

    $(".slide").hover(function() {
        clearInterval(timer);
    }, function() {
		timer = setInterval(function() {
            moveSlide("next");
        }, 5000);
    });
});

var slideIndex = 0;
let slides = document.getElementsByClassName("slide");
let indicators = document.querySelectorAll("#indicators > li");

function moveSlide(direction) {
    slides[slideIndex].classList.add("d-none");

    if (direction == "next") {
        slideIndex++;
        if (slideIndex == slides.length) 
            slideIndex = 0;
    } 
    else {
        if (slideIndex == 0) 
            slideIndex = slides.length - 1;
        else slideIndex--;
    }

    slides[slideIndex].classList.remove("d-none");

    indicatorColorChange(slideIndex);
}

function indicatorColorChange(slideIndex) {
    for (let i = 0; i < indicators.length; i++) 
        if (indicators[i].getAttribute("value") == slideIndex)
            indicators[i].style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        else 
            indicators[i].style.backgroundColor = "rgba(255, 255, 255, 0.5)";
}

// [Section] Zoom Effects 

let zoomEffectsSection = document.getElementById("zoom-effects");
addClasses([zoomEffectsSection], flexRow);

zoomEffectsSection.innerHTML = createImageElements() + createTextElements();

function createImageElements() {
    const attributes = [ {"id": 1, "width": "w-50", "order": "order-1"}, 
                         {"id": 2, "width": "w-25", "order": "order-3"}, 
                         {"id": 3, "width": "w-25", "order": "order-5"}, 
                         {"id": 4, "width": "w-50", "order": "order-6"} ];

    var content = "";
    for (let i = 0; i < attributes.length; i++) 
        content += 
        `<div id = "image-${attributes[i].id}" class = "${attributes[i].width} ${attributes[i].order} overflow-hidden">
             <div class = "img-holder w-100 h-100"></div>
         </div>`;
    return content;
}

function createTextElements() {
    const divContent = 
    [ 
        {
            "h4": "The world's cutest place for your little ones", 
            "p": "Moolen's Store is the magical place, which will assist you in preparing a ideal gifts for kids, help with decorating dreams-worthy rooms, as well as taking care of mothers' unique needs by providing the high quality products dedicated for all their needs.", 
            "a": {"name": "View Gallery", "href": "#gallery"}
        }, 
        {
            "h4": "Inspired by shiny magic, designed by hands", 
            "p": "We believe that easy isn't dull. Simple forms contains unlimited meanings and possibilities. Just like the mother's love &ndash; simple, pure while incredibly great at the same time. A rich and varied visual extension injects virgo to the Moolen's brand, and expresses simple, yet deep love for children.", 
            "a": {"name": "View Services", "href": "#services"}
        } 
    ];

    var content = "";
    for (let i = 0, j = 2; i < 2; i++, j += 2) 
        content +=
        `<div class = "w-25 px-6 d-flex flex-column justify-content-center order-${j} bg-light">
             <h4 class = "mb-5 fs-25 darkslatergray">${divContent[i].h4}</h4>
             <p class = "mb-4">${divContent[i].p}</p>
             <a class = "w-auto arrows" href = "${divContent[i].a.href}">
                 <span class = "position-relative fs-13 ls-1 text-pink">${divContent[i].a.name} </span>
             </a>
         </div>`;
    return content;
}

$(document).ready(function() {
    $(".overflow-hidden").mouseover(function() {
        $(this).find(".img-holder").css("transform", "scale(1.1)");
    });
    $(".overflow-hidden").mouseout(function() {
        $(this).find(".img-holder").css("transform", "scale(1)");
    });
});

// [Section] About

let about = document.getElementById("about");
addClasses([about], flexRow);		

about.innerHTML = createAboutSection();

function createAboutSection() {
    const paragraphs = 
    [
        {
            "class": "mb-5 font-family font-weight-bold fs-35", 
            "text": "We're the parents, that put harmonious and healthy kid's development at the pedestal."
        },
        {
            "class": "w-75 mb-4 ml-6 pb-2", 
            "text": "You know you are going to have a child, but when your baby's born, it finally hits you. And once it does hit you, it hits you really hard. You realize that you're a parent now. You see your cute baby lying in front of you, and yet you realize that it's now your responsibility to raise this beautiful little wonder and to equip your child with everything it needs for life."
        }
    ];

    var content = "";
    for (let i = 0; i < 2; i++) {
        switch(i) {
            case 0:
                content += `<div class = "col-8 col-sm-7 col-md-4">`;
                content += `<img src = "assets/img/party-look.jpg" alt = "Kids Party Look" />`
                for (let j = 0; j < 2; j++) 
                    content += `<div id = "border-${j + 1}" class = "position-absolute"></div>`;
            break;
            case 1:
                content += "<div>";
                content += `<h2 class = "mb-4 fs-14 ls-2 darkslatergray">About Moolen's.</h2>`;
                for (let j = 0; j < paragraphs.length; j++) 
                    content += `<p class = "${paragraphs[j].class}">${paragraphs[j].text}</p>`;
                content +=
                `<button id = "our-story" type = "button" class = "ml-6 cursore-pointer arrows">
                     <span class = "fs-14 ls-0 text-pink">Our Story </span>
                 </button>`;
            break;
        }
        content += "</div>";
    }

    return content;
}

// [Section] Modal "Our Story"

addClasses([document.querySelector("#modal-our-story")], flexColumn);

$(document).ready(function() {
    let paragraphs = 
    [
        {
            "class": "px-3 font-family fs-19 ls-1", 
            "text": "Moolen's are here to make day happy to your little ones and take them to the magical world of fairytales where every miracle is possible!"
        },
        {
            "class": "px-3 mt-4", 
            "text": "Moolen's has everything in range, from the first toy and rattle to a tricycle. A large number of kids grew up with our brand, due to their special, modern design and unquestionable quality, at very affordable prices. The emphasis of our creators is on comfort, because we want to provide freedom of movement, necessary for the proper growth and development of children. Each season, Moolen's presents stylized collections of unique designs that will make your kid look special at each opportunity. The Moolen's range includes unique gift toys, blankets, soft program, non-walking shoes, first toys with which babies grow and develop motor skills, accessory that's necessary at each opportunity in every season, and strollers, feeders, portable beds, car seats, etc. Each Moolen's stroller, crib, car seat and etc, they're designed with amazing care and in the mentioned process we try to meet the expectations of parents in terms of design &amp; quality and to make little ones comfortable and safe in the Moolen's range of large equipment. In consultation with the parents, we're continuously working on brand development &amp; further bringing the brand closer to parents and kids."
        }
    ];

    let pTags = "";
    for (let i = 0; i < paragraphs.length; i++)
        pTags += `<p class = "${paragraphs[i].class}">${paragraphs[i].text}</p>`;

    let content = 
    `<div id = "modal-body" class = "row-12 position-relative text-center bg-white">
         <div class = "position-absolute rounded-circle bg-darkslatergray"></div>
         <button id = "close" type = "button" class = "position-absolute cursore-pointer text-white">&#10006;</button>
         <h3 class = "mb-5 position-relative text-uppercase fs-14 ls-5 z-1">Our Story</h3>
         ${pTags}
     </div>
    `;

    $("#modal-our-story").html(content);

    $("#our-story").click(function() {
        $("#modal-our-story").removeClass("d-none");
    });
    $("#close").click(function() {
        $("#modal-our-story").addClass("d-none");
    });
});

// [Section] Gallery

let gallery = document.querySelector("#gallery");
gallery.classList.add("container-fluid", "position-relative");

gallery.innerHTML =
`<header id = "gallery-header" class = "position-absolute z-1 text-center">
	 <h2 class = "fs-35 ls-1">Gallery</h2>
 </header>`;

createGallery();

function createGallery() {
	let main = document.createElement("main");
	main.classList.add("row-12", "w-100");
	addClasses([main], flexRow);
	
    const captions = 
	[ 
        {
            "title": "The world's cutest place", 
            "description": "In order to create a lovely space friendly for everyone, regardless of age, most of the store's furniture were designed to be oval, organic shape. In the central part a sort of arcade labyrinth emerged, where chosen trolley can be easily taken for a little test drive. A full array of them are on the display in the backend wall of the local, set on spacious, regular shelf. Aforesaid roundness can also be spotted in the central's island (made wholly out of terrazzo) form resembling paramecium."
        },
        {
            "title": "Parents at the best", 
            "description": "Let children's genuine nature glow, so it's that simple. At Moolen's, we're about creating pieces that allow them to express themselves in their own authentic way. In the spirit of Moolen's lies the celebration of who they're and who they aspire to become, and as well as adventure of self-discovery. Shy essentials with the twist so they can be bold and shine by their own accord."
        },
        {
            "title": "We offer you magic", 
            "description": "Moolen's range includes over 2000 items for kids. From plush toys, through miniature kitchens and all kinds of beautiful dolls for your princesses, action figures, metal cars and large tool workshops, to all models of cars, ships and planes, a constructor for your little architects and creatives. We've a loyalty program for our loyal customers, within which you can achieve certain number of hearts with one and all purchase, which all of you can use with every purchase and reduce your amount. Over and above that, all our loyalty members get a 20% discount on every purchase. To see our whole magical offer, at any time you can stop by one of Moolen's Stores."
        },
        {
            "title": "Ready, steady, go", 
            "description": "Each month we organize seminar for pregnant women, where they can socialize, exchange experiences and ask everything that worries them and that isn't completely clear to them. We think this is a great way to introduce them to the world of parenthood, because the baby's first days are crucial in mental &amp; physical development, as well as the days while baby's still in mother's womb!"
        },
        {
            "title": "Walk with Moolen's", 
            "description": "Every season, Moolen's company opens all its doors to each little human who want to try their charm in the world of fashion: photography for our seasonal catalogs or children's magazines, and for the bravest ones &ndash; a fashion show! As always, of course, nothing without gifts."
        },
        {
            "title": "Let humanitary blossom", 
            "description": "As children lovers, Moolen's company has participated in numerous humanitarian actions. Each year we donate stuff from our range to orphanages, we also donate a certain amount of money for children with disabilities, and in addition to all of that, we set aside 5&percnt; from the sale of every educational toy for low-income families who have children."
        } 
	];

    for (let i = 0; i < captions.length; i++) { 
        let article = document.createElement("article");
        setAttributes([article], ["id", `gallery-item-${i + 1}`, "value", i, "class", "image py-4 d-flex flex-column justify-content-end"]);
        
        article.addEventListener("mouseover", () => {
            galleryImagesOnHover(i, window.matchMedia("(min-width: 900px)"));
             galleryImagesOnHover(i, window.matchMedia("(min-width: 900px)"));
        });

        let h4 = document.createElement("h4");
        h4.classList.add("text-uppercase", "fs-12", "ls-4");
        h4.innerHTML = `<span class = "font-family fs-12 ls-4">0${i + 1}</span> ${captions[i].title}`;

        let p = document.createElement("p");
        p.classList.add("mt-4", "mb-5", "ml-5", "fs-16");
        p.innerHTML = captions[i].description;

        if (i == 0) {
            article.classList.add("w-75", "active");
			h4.classList.add("ml-5");
		}
        else {
            article.classList.add("w-5");
            h4.classList.add("text-vertical", "align-self-center");
            p.classList.add("d-none");
        }

        appendChildren(article, [h4, p]);
        main.appendChild(article);
    }
	
	gallery.appendChild(main);
}

gallery.addEventListener("mouseout", () => { 
    galleryImagesOnHover(0, window.matchMedia("(min-width: 900px)"));
    galleryImagesOnHover(0, window.matchMedia("(max-width: 899px)"));
});

function galleryImagesOnHover(value, x) {
    let galleryImages = document.querySelectorAll(".image");

    if (galleryImages[value].classList.contains("active")) 
		return;
    
    if (x.matches) {
        for (let i = 0; i < galleryImages.length; i++) {
            if (galleryImages[i].classList.contains("active")) {
                changeClasses(galleryImages[i], ["w-75", "active"], ["w-5"]);
                changeClasses(galleryImages[i].firstElementChild, ["ml-5"], ["text-vertical", "align-self-center"]);
                galleryImages[i].lastElementChild.classList.add("d-none");
            }
            if (i == value) {
                changeClasses(galleryImages[i], ["w-5"], ["w-75", "active"]);
                changeClasses(galleryImages[i].firstElementChild, ["text-vertical", "align-self-center"], ["ml-5"]);
                galleryImages[i].lastElementChild.classList.remove("d-none");
            }
        }
    }
    else {
        for (let i = 0; i < galleryImages.length; i++) {
            if (galleryImages[i].classList.contains("active")) {
                changeClasses(galleryImages[i], ["vh-85", "active"], ["h-7"]);
                galleryImages[i].lastElementChild.classList.add("d-none");
            }
            if (i == value) {
                changeClasses(galleryImages[i], ["h-7"], ["vh-85", "active"]);
                galleryImages[i].lastElementChild.classList.remove("d-none");
            }
        }
    }
}

// [Section] Services

let services = document.getElementById("services");
addClasses([services], flexColumn);

services.innerHTML =
`<header>
     <h2 class = "fs-40 ls-3 darkslatergray">Services</h2>
 </header>
 <main class = "row-12 w-100 px-5">${createServices()}</main>`;

addClasses([services.lastElementChild], flexRow);

function createServices() {
    let serviceLists = 
    [
        {
            "id": 1,
            "title": "Interior Deisgn &amp; Furniture", 
            "list": ["Creating a lovely, creative and stimulating environment for kid's play and rest &ndash; place where memories are created.", "Modern furniture with a minimalist design, made of wood."]
        },
        {
            "id": 2,
            "title": "Baby Equipment + Skin Care", 
            "list": ["Everything you need for your newborn, approved by the World Health Organization.", "Natural-based cosmetics that do not irritate the skin and maintain a normal pH level."]
        },
        
        {
            "id": 3,
            "title": "Kids Clothing / Footwear", 
            "list": ["Moolen's fashion, perfect synonym for unique design and softness of natural material / organic cotton.", "The anatomically shaped insole in the shoes puts the kid's foot in a natural position, so which enables proper posture."]
        },
        {
            "id": 4,
            "title": "Toys &amp; Fun Program", 
            "list": ["Developing creativity, improving coordination and stimulating children's imagination with Moolen's fun program.", "Toys hand-painted with ecological and edible colors and made of natural rubber, durable and safe to use."]
        },
    ];

    var content = ""
    for (let serviceList of serviceLists) {
        content += 
        `<article id = "service-${serviceList.id}" class = "col-12 col-md-9 col-lg-6 col-xl-5 px-sm-5 mb-0 mb-sm-2 mb-lg-3 service align-self-start text-center">
             <h4 class = "mb-3 mb-md-4 mt-2 mt-lg-0 pb-3 fs-22 ls-2 text-pink">${serviceList.title}</h4>
             <ul class = "w-75">${createServiceList(serviceList.list)}</ul>
         </article>`
    }
    return content;
}

addClasses(document.getElementsByClassName("service"), flexColumn);

function createServiceList(list) {
    var content = "";
    for (let i = 0; i < list.length; i++) 
        content += `<li class = "mb-3">${list[i]}</li>`;
    return content;
}

// [Section] Number Counters

let sectionNumberCounters = document.getElementById("number-counters");
addClasses([sectionNumberCounters], flexRow);

createNumberCounters();

function createNumberCounters() {
    const numberCounters = 
    [ 
        {"id": 1, "number": 4150, "text": "Quality Products"},
        {"id": 2, "number": 36, "text": "Children's Brands"},
        {"id": 3, "number": 981, "text": "Humanitarian Actions"}, 
        {"id": 4, "number": 275, "text": "Educational Seminars"}, 
        {"id": 5, "number": 100, "text": "Happy Little Customers"} 
    ];
    
    var content = "";
    for (let numberCounter of numberCounters) 
        content += 
        `<article id = "number-counter-${numberCounter.id}" class = "number-counter d-flex flex-column justify-content-center align-items-center text-center">
             <span class = "number mb-2 font-family fs-35 ls-5" value = "${numberCounter.number}"></span>
             <span class = "text font-family fs-13 ls-2">${numberCounter.text}</span>
         </article>`; 
    sectionNumberCounters.innerHTML = content;
}

$(document).ready(function() {
    $("#number-counters").fadeOut();
    $(window).scroll(function() {
        let elemTop = $("#number-counters").offset().top,
            elemHeight = $("#number-counters").outerHeight(),
            windowHeight = $(window).height(),
            scrolled = $(this).scrollTop();
        if (scrolled + 250 > (elemTop + elemHeight - windowHeight)) 
            $("#number-counters").fadeIn(1000);
        if (scrolled + 200 > (elemTop + elemHeight - windowHeight)) 
            setTimeout(numberCountersFunctionality, 200);
    });
});

function numberCountersFunctionality() {
    let numbers = document.querySelectorAll(".number");
    numbers.forEach(number => {
        let animate = () => {
            let value = number.getAttribute("value");
            let data = + number.textContent;
            if (data < value) {
                number.textContent = Math.ceil(data + value / 30);
                setTimeout(animate, 80);
            }
            else 
                number.textContent = value;
        } 
        animate();
    });
}

// [Section] Contact

document.getElementById("contact").classList.add("d-flex", "flex-row", "flex-wrap", "justify-content-center", "justify-content-sm-start", "align-items-center");
document.getElementById("map").classList.add("ml-4", "pl-3", "mt-3");

createPinsOnMap();

function createPinsOnMap() {
    let mapMarkers = document.getElementById("map-markers");
    let mapMarkersContent = "";
    for (let i = 0; i < 3; i++) {
        mapMarkersContent +=
       `<div id = "map-marker-${i + 1}" class = "position-absolute d-flex flex-column justify-content-start">
             <i class = "fas fa-map-marker"></i>
             <span class = "w-90 position-absolute rounded-circle"></span>
        </div>`
    }
    mapMarkers.innerHTML = mapMarkersContent;
}

let contactUs = document.querySelector("#contact-us > div");

contactUs.innerHTML = 
`<h2 class = "mb-3 fs-25 ls-3">Contact Us.</h2>
 <p class = "pr-2">
     <span class = "font-weight-bold font-family fs-12 ls-1">Watch Out!</span>
      If you have any questions, suggestions, comments or want to schedule a meeting with Moolen's employees, feel free to contact us via this contact form.
 </p>`

let form = document.getElementById("contact-form");
form.classList.add("d-flex", "flex-row", "flex-wrap", "justify-content-between");

createContactForm();

function createContactForm() {
    const inputs = 
    [ 
        {
            "id": "full-name", 
            "type": "text", 
            "name": "full-name", 
            "order": "order-1", 
            "placeholder": "Let's start with your full name", 
            "regExpr": /^[A-ZČĆŠĐŽ]{1}[a-zčćšđž]{2,15}\s[A-ZČĆŠĐŽ]{1}[a-zčćšđž]{2,15}$/
        },
        {
            "id": "e-mail", 
            "type": "email", 
            "name": "e-mail", 
            "order": "order-2", 
            "placeholder": "E-mail", 
            "regExpr": /^\w([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
        }, 
        {
            "id": "date", 
            "type": "date", 
            "name": "date", 
            "order": "order-4"
        },
        {
            "id": "time", 
            "type": "time", 
            "name": "time", 
            "order": "order-5"
        } 
    ];

    for (let i = 0; i < inputs.length; i++) {
        let div = document.createElement("div");
        div.classList.add("form-group", "w-49", inputs[i].order);

        let input = document.createElement("input");
        setAttributes([input], ["type", inputs[i].type, "id", inputs[i].id]);
        input.setAttribute("name", inputs[i].name);

        if (i < 2)  {
            input.setAttribute("placeholder", inputs[i].placeholder);

            let p = document.createElement("p");
            p.classList.add("fs-14", "ls-0");

            input.addEventListener("change", () => { 
                formValidation(inputs[i].id, inputs[i].regExpr, p); 
            });

            appendChildren(div, [input, p]);
        } 
        else if (i == 2 || i == 3) {
            setAttributes([input], ["disabled"]);
            input.classList.add("fs-16");
            div.appendChild(input);
        }

        form.appendChild(div);
    }

    let p = document.createElement("p");
    p.classList.add("w-100", "order-8", "fs-14", "ls-0");

    form.appendChild(p);

    const selectOptions = ["Choose the nearest Moolen's Store", "The Mint Glow Moolen's / 7b Avenue de l'Op&eacute;ra", "The Peach Puff Moolen's / 34 Rue Saint-Rustique", "The Misty Rose Moolen's / 256 Les de Bouvreuils"];
    const orders = ["order-3", "order-9"];

    for (let i = 0; i < 2; i++) {
        let div = document.createElement("div");
        div.classList.add("form-group", "w-100", orders[i]);

        if (i == 0) {
            let select = document.createElement("select");
            setAttributes([select], ["id", "drop-down-list", "name", "select-store"]);

            for (let j = 0; j < selectOptions.length; j++) {
                let option = document.createElement("option");
                option.setAttribute("value", j);
                option.classList.add("fs-16");
                option.innerHTML = selectOptions[j];
                select.appendChild(option);

                select.addEventListener("change", () => {
                    formValidation("drop-down-list");
                });
            }
            div.appendChild(select);
        }
        else {
            let textarea = document.createElement("textarea");
            setAttributes([textarea], ["id", "message", "name", "message", "placeholder", "Please enter your message here. Thank you!"]);

            let p = document.createElement("p");
            p.classList.add("fs-14", "ls-0");

            appendChildren(div, [textarea, p]);

            textarea.addEventListener("change", () => { 
                formValidation("message", p); 
            });
        }

        form.appendChild(div);
    }

    let button = document.createElement("button");
    setAttributes([button], ["id", "submit", "class", "order-9 font-family fs-16 ls-0"]);
    button.appendChild(document.createTextNode("Submit"));

    form.appendChild(button);
}

var fieldsValidations = {"full-name": false, "e-mail": false, "date": false, "time": false, "message": false};

document.getElementById("submit").addEventListener("click", (event) => {
    let validFields = 0;

    for (let field in fieldsValidations) 
        if (fieldsValidations[field])
            validFields++;

    if (validFields != 5)
        event.preventDefault();
    else 
        form.submit();
});

function formValidation() {
    let id = arguments[0];
    if (id == "full-name" || id == "e-mail") {
        if (arguments[1].test(document.getElementById(id).value)) {
            arguments[2].textContent = "Successfully executed entry";
            changeClasses(arguments[2], ["invalid"], ["valid", "mt-1"]);
            fieldsValidations[id] = true;
        }
        else {
            arguments[2].textContent = "Incorrect input format";
            changeClasses(arguments[2], ["valid"],  ["invalid", "mt-1"]);
            fieldsValidations[id] = false; 
        }
    }

    if (id == "drop-down-list") {
        let select = document.getElementById(id);
        let optionValue = select.options[select.selectedIndex].value;
        
        if (optionValue != 0) {
            let disabledInputs = document.querySelectorAll("#date, #time");
            for (let i = 0; i < disabledInputs.length; i++) {
                if (i == 0) {
                    disabledInputs[i].removeAttribute("disabled");
                    disabledInputs[i].addEventListener("change", () => {
                        checkDateAndTime(disabledInputs[i]);
                    });   
                }
                else 
                    setAttributes([disabledInputs[i]], ["disabled"]);

                disabledInputs[i].value = null;
            }
        }
        else 
            setAttributes([date], ["disabled"]);
    }

    if (id == "message")
        if (document.getElementById(id).value.length == 0) {
            arguments[1].textContent = "Message not added";
            changeClasses(arguments[1], ["valid"], ["invalid", "position-relative"]);
            fieldsValidations[id] = false;
        }
        else {
            arguments[1].textContent = "Message successfully added";
            changeClasses(arguments[1], ["invalid"], ["valid", "position-relative"]);
            fieldsValidations[id] = true;
        }
}

var date = null, day = null, time = null;

function checkDateAndTime(element) {
    let p = document.querySelector("p.order-8");

    if (element.type == "date") {
        let date = new Date(element.value);
        day = date.getDay();
        if (day == 0) {
            p.textContent = "The selected Moolen's Store is not open on the selected date / time";
            changeClasses(p, ["valid"],  ["invalid", "mt-1"]);
            fieldsValidations.date = false;
        }
        else 
            fieldsValidations.date = true;

        let timeInput = document.getElementById("time");
        timeInput.removeAttribute("disabled");
        timeInput.addEventListener("change", () => {
            checkDateAndTime(timeInput);
        });  
    }
    else if (element.type == "time") {  

        time = element.value;
        
        let timeHours, timeMinutes, timeSeconds;

        timeHours = parseInt(time.substring(0, 2));
        timeMinutes = parseInt(time.substring(3, 5));
        timeSeconds = 0;

        let workingTime = 
        {
            "monday_friday": {"open": 8, "close": 20}, 
            "saturday": {"open": 9, "close": 17}
        };

        if (fieldsValidations.date) {
            
            var x;

            if (day == 6)
                x = workingTime.saturday;
            else 
                x = workingTime.monday_friday;

            let condition = (timeHours >= x.open && timeHours < x.close) && (timeMinutes >= 0 && timeMinutes < 59) && (timeSeconds >= 0 && timeSeconds < 59);

            if (condition) {
                p.textContent = "The selected Moolen's Store is open on the selected date / time";
                changeClasses(p, ["invalid"],  ["valid", "mt-1"]);
                fieldsValidations.time = true;
            }
            else {
                p.textContent = "The selected Moolen's Store is not open on the selected date / time";
                changeClasses(p, ["valid"],  ["invalid", "mt-1"]);
                fieldsValidations.time = false;
            }
        }
        else {
            p.textContent = "The selected Moolen's Store is not open on the selected date / time";
            changeClasses(p, ["valid"],  ["invalid", "mt-1"]);
        }
    }
}

// [Footer]

let footer = document.getElementById("footer");

createFooter();

addClasses(document.querySelectorAll("#footer > section"), flexRow);

function createFooter() {
    let stores = [
        {
            "name" : "The Mint Glow",
            "address": "7b Avenue de l'Op&eacute;ra",
            "phone": "(&plus;33) 509 26 87 00",
            "email": "themintglow&#64;yahoo&#46;com"
        },
        {
            "name" : "The Peach Puff",
            "address": "34 Rue Saint-Rustique",
            "phone": "(&plus;33) 574 82 30 99",
            "email": "thepeachpuff&#64;yahoo&#46;com"
        },
        {
            "name" : "The Misty Rose",
            "address": "256 Les de Bouvreuils",
            "phone": "(&plus;33) 500 74 52 76",
            "email": "themistyrose&#64;yahoo&#46;com"
        }
    ];

    let links = 
    [ 
        {"name": "Sitemap", "href": "sitemap.xml", "margin": "mr-3"},
        {"name": "Documentation", "href": "documentation.pdf", "margin": "ml-3"} 
    ];
    
    var content = "";

    content += `<section class = "row-12 w-100 mb-sm-5 px-sm-5 text-light">`;
    for (let i = 0; i < stores.length; i++) {
        content += 
        `<article class = "store mb-sm-4 mb-lg-0 col-12 col-sm-11 col-md-10 col-lg-4 col-xl-3 d-flex flex-lg-row flex-wrap justify-content-center align-items-center">
             <header class = "w-100 mt-sm-2 mt-lg-0 mb-lg-3 mr-sm-5 mr-lg-0">
                 <h5 class = "fs-16 ls-2 text-light-blue">
                     ${stores[i].name}
                     <span class = "d-block pt-1 font-family fs-11 ls-2">Moolen's Store</span>
                 </h5>
             </header>
             <main class = "w-100 ml-5 ml-lg-0">`;
        for (let storeInfo in stores[i])
            if (storeInfo != "name")
                content += `<p>${stores[i][storeInfo]}</p>`;
        content += 
        `    </main>
         </article>`;
    }
    content += "</section>";

    content += `<div class = "mt-5">${createSocialMedia()}</div>`;

    content +=
    `<div class = "w-100 mt-3 px-4 px-sm-5 d-flex flex-row flex-wrap justify-content-center justify-content-xl-end align-items-center">
         <p class = "w-100 px-2 pb-3 fs-16 ls-1 text-light">Copyright &copy; 2022 The Moolen's Store &verbar; All Rights Reserved</p>`;

    for (let i = 0; i < links.length; i++) 
        content += `<a href = "${links[i].href}" class = "${links[i].margin} mb-2 font-weight-bold font-family fs-10 ls-2 text-info">${links[i].name}</a>`;
    
    content += "</div>";  

    footer.innerHTML = content;
}

function createSocialMedia() {
    let socialMedia = 
    [ 
        {"href": "https://www.instagram.com", "icon": "fab fa-instagram"}, 
        {"href": "https://www.facebook.com", "icon": "fab fa-facebook-f"}, 
        {"href": "https://twitter.com/", "icon": "fab fa-twitter"}, 
        {"href": "https://www.linkedin.com/", "icon": "fab fa-linkedin-in"} 
    ];

    var content = `<ul id = "social-media" class = "nav">`;
    for (let i = 0; i < socialMedia.length; i++) 
        content += 
        `<li class = "nav-item">
             <a class = "nav-link" href = "${socialMedia[i].href}" target = "_blank">
                 <i class = "${socialMedia[i].icon} fs-16 text-pink"></i>
             </a>
         </li>`;
    return  content + "</ul>";
}