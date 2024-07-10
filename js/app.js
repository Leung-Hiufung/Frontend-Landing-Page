/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
var baseURL = window.location.href;
const SECTIONS = document.querySelectorAll('section');
const NAVBARLIST = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * calculate the absolute distance between section's top and windows's top
 * find the section with the minimum value
 * @returns the nearest section
 */
function getNearestSection() { 
    let nearestSection = null;
    let minDistance = Infinity;

    SECTIONS.forEach(section => { 
        const box = section.getBoundingClientRect();
        const distance = Math.abs(box.top);

        if (distance < minDistance) { 
            minDistance = distance;
            nearestSection = section;
        }
    });

    return nearestSection;
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/



/**
 * build the nav
 * Build the navigation bar based on the section title.
 * Section Tile is data-nav's content.
 * build like: <li><a class="menu_link" harf="#section 1">Section 1</a></li>
 */
function buildNav() { 
    const newElement = document.createDocumentFragment();

    for (let section of SECTIONS) { 
        // create <li><a class="menu__link"></a></li>
        const newNavLi = document.createElement('li');
        const newNavLiLink = document.createElement('a');
        newNavLiLink.classList.add('menu__link');
        
        newNavLiLink.textContent = section.dataset.nav;
        newNavLiLink.dataset.href = section.id;
        newNavLi.appendChild(newNavLiLink);
        newElement.appendChild(newNavLi);
    }
    NAVBARLIST.appendChild(newElement);
}



/**
 * Add class 'active' to section when near top of viewport
 */
function makeActive() { 
    const nearestSection = getNearestSection();

    if (nearestSection) { 
        SECTIONS.forEach(section => { 
            section.classList.remove('your-active-class');
        });
        nearestSection.classList.add('your-active-class');
    }
}

/**
 * Scroll to anchor ID using scrollTO event
 */
function scrollToSection() { 
    const links = document.getElementsByClassName('menu__link');
    for (let link of links) {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const target = document.getElementById(link.dataset.href);
            target.scrollIntoView({ behavior: 'smooth' });
        });
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener('DOMContentLoaded', readyFunction);

function readyFunction() { 
    // set Base URL
    document.querySelector('base').setAttribute('href', baseURL);
    // Build menu 
    buildNav();

    // Scroll to section on link click
    scrollToSection();

    // Set sections as active
    document.addEventListener('scroll', makeActive);
}
