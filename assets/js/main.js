/**
 * Template Name: iPortfolio
 * Updated: Mar 10 2024 with Bootstrap v5.3.3
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim();
        if (all) {
            return [...document.querySelectorAll(el)];
        } else {
            return document.querySelector(el);
        }
    };

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all);
        if (selectEl) {
            if (all) {
                selectEl.forEach((e) => e.addEventListener(type, listener));
            } else {
                selectEl.addEventListener(type, listener);
            }
        }
    };

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener("scroll", listener);
    };

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select("#navbar .scrollto", true);
    const navbarlinksActive = () => {
        let position = window.scrollY + 200;
        navbarlinks.forEach((navbarlink) => {
            if (!navbarlink.hash) return;
            let section = select(navbarlink.hash);
            if (!section) return;
            if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
                navbarlink.classList.add("active");
            } else {
                navbarlink.classList.remove("active");
            }
        });
    };
    window.addEventListener("load", navbarlinksActive);
    onscroll(document, navbarlinksActive);

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let elementPos = select(el).offsetTop;
        window.scrollTo({
            top: elementPos,
            behavior: "smooth",
        });
    };

    /**
     * Back to top button
     */
    let backtotop = select(".back-to-top");
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add("active");
            } else {
                backtotop.classList.remove("active");
            }
        };
        window.addEventListener("load", toggleBacktotop);
        onscroll(document, toggleBacktotop);
    }

    /**
     * Mobile nav toggle
     */
    on("click", ".mobile-nav-toggle", function (e) {
        select("body").classList.toggle("mobile-nav-active");
        this.classList.toggle("bi-list");
        this.classList.toggle("bi-x");
    });

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on(
        "click",
        ".scrollto",
        function (e) {
            if (select(this.hash)) {
                e.preventDefault();

                let body = select("body");
                if (body.classList.contains("mobile-nav-active")) {
                    body.classList.remove("mobile-nav-active");
                    let navbarToggle = select(".mobile-nav-toggle");
                    navbarToggle.classList.toggle("bi-list");
                    navbarToggle.classList.toggle("bi-x");
                }
                scrollto(this.hash);
            }
        },
        true
    );

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener("load", () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash);
            }
        }
    });

    /**
     * Hero type effect
     */
    const typed = select(".typed");
    if (typed) {
        let typed_strings = typed.getAttribute("data-typed-items");
        typed_strings = typed_strings.split(",");
        new Typed(".typed", {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
        });
    }

    /**
     * Skills animation
     */
    let skilsContent = select(".skills-content");
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: "80%",
            handler: function (direction) {
                let progress = select(".progress .progress-bar", true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute("aria-valuenow") + "%";
                });
            },
        });
    }

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener("load", () => {
        let portfolioContainer = select(".portfolio-container");
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: ".portfolio-item",
            });

            let portfolioFilters = select("#portfolio-flters li", true);

            on(
                "click",
                "#portfolio-flters li",
                function (e) {
                    e.preventDefault();
                    portfolioFilters.forEach(function (el) {
                        el.classList.remove("filter-active");
                    });
                    this.classList.add("filter-active");

                    portfolioIsotope.arrange({
                        filter: this.getAttribute("data-filter"),
                    });
                    portfolioIsotope.on("arrangeComplete", function () {
                        AOS.refresh();
                    });
                },
                true
            );
        }
    });

    /**
     * Initiate portfolio lightbox
     */
    const portfolioLightbox = GLightbox({
        selector: ".portfolio-lightbox",
    });

    /**
     * Portfolio details slider
     */
    new Swiper(".portfolio-details-slider", {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
    });

    /**
     * Testimonials slider
     */
    new Swiper(".testimonials-slider", {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        slidesPerView: "auto",
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },

            1200: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    });

    /**
     * Animation on scroll
     */
    window.addEventListener("load", () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });
    });

    new PureCounter();
})();
// About Page

// Add hover effects via JavaScript since we can't use :hover in inline styles
document.addEventListener("DOMContentLoaded", function () {
    // Profile card hover
    const profileCard = document.querySelector(".col-lg-5 > div");
    if (profileCard) {
        profileCard.addEventListener("mouseenter", function () {
            this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
            this.querySelector("div").style.opacity = "1";
        });
        profileCard.addEventListener("mouseleave", function () {
            this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
            this.querySelector("div").style.opacity = "0";
        });
    }

    // Social icon hover
    const socialIcons = document.querySelectorAll(".social-links a");
    socialIcons.forEach((icon) => {
        icon.addEventListener("mouseenter", function () {
            this.style.background = "rgba(255, 255, 255, 0.3)";
            this.style.transform = "translateY(-3px)";
        });
        icon.addEventListener("mouseleave", function () {
            this.style.background = "rgba(255, 255, 255, 0.2)";
            this.style.transform = "";
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('a[style*="padding: 12px 25px"]');
    buttons.forEach((button) => {
        button.addEventListener("mouseenter", function () {
            if (this.textContent === "Hire Me") {
                this.style.transform = "translateY(-3px)";
                this.style.boxShadow = "0 10px 20px rgba(58, 123, 213, 0.3)";
            } else {
                this.style.background = "#3a7bd5";
                this.style.color = "white";
                this.style.transform = "translateY(-3px)";
                this.style.boxShadow = "0 10px 20px rgba(58, 123, 213, 0.2)";
            }
        });
        button.addEventListener("mouseleave", function () {
            if (this.textContent === "Hire Me") {
                this.style.transform = "";
                this.style.boxShadow = "";
            } else {
                this.style.background = "";
                this.style.color = "#3a7bd5";
                this.style.transform = "";
                this.style.boxShadow = "";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Skill tag hover effects
    const skillTags = document.querySelectorAll('span[style*="display: inline-block"]');
    skillTags.forEach((tag) => {
        tag.addEventListener("mouseenter", function () {
            const bgColor = this.style.backgroundColor.replace("0.1", "0.2");
            this.style.backgroundColor = bgColor;
            this.style.transform = "scale(1.05)";
        });
        tag.addEventListener("mouseleave", function () {
            const bgColor = this.style.backgroundColor.replace("0.2", "0.1");
            this.style.backgroundColor = bgColor;
            this.style.transform = "";
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // View More Projects functionality
    const viewMoreBtn = document.getElementById("viewMoreBtn");
    const moreProjects = document.getElementById("moreProjects");

    if (viewMoreBtn && moreProjects) {
        viewMoreBtn.addEventListener("click", function () {
            if (moreProjects.style.display === "none" || moreProjects.style.display === "") {
                moreProjects.style.display = "block";
                this.textContent = "Show Less";
            } else {
                moreProjects.style.display = "none";
                this.textContent = "View More Projects";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("cert-filter");
    const viewMoreBtn = document.getElementById("viewMoreCerts");
    const moreCerts = document.getElementById("moreCerts");

    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            filterCertificates();
            // Show/hide view more button based on search input
            if (this.value.trim() !== "") {
                viewMoreBtn.style.display = "none";
                // Also show all certificates (including hidden ones) when searching
                if (moreCerts) moreCerts.style.display = "grid";
            } else {
                viewMoreBtn.style.display = "inline-block";
                // Reset to default view (only show initial certificates)
                if (moreCerts) moreCerts.style.display = "none";
                viewMoreBtn.textContent = "View More Certifications";
            }
        });
    }

    function filterCertificates() {
        const input = document.getElementById("cert-filter");
        const filter = input.value.toUpperCase();
        const certs = document.querySelectorAll(".cert-card");

        certs.forEach((cert) => {
            const text = cert.textContent || cert.innerText;
            if (text.toUpperCase().indexOf(filter) > -1) {
                cert.style.display = "";
            } else {
                cert.style.display = "none";
            }
        });
    }

    if (viewMoreBtn && moreCerts) {
        viewMoreBtn.addEventListener("click", function () {
            if (moreCerts.style.display === "none") {
                moreCerts.style.display = "grid";
                this.textContent = "Show Less";
            } else {
                moreCerts.style.display = "none";
                this.textContent = "View More Certifications";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const contactBtn = document.querySelector(".contact-btn");
    const modal = document.getElementById("contactModal");
    const closeBtn = document.querySelector(".close-modal");

    // Initialize ClipboardJS for copy buttons
    const clipboard = new ClipboardJS(".copy-btn");

    // Create notification element
    const notification = document.createElement("div");
    notification.className = "copied-notification";
    notification.textContent = "Copied to clipboard!";
    document.body.appendChild(notification);

    clipboard.on("success", function (e) {
        notification.style.display = "block";
        setTimeout(() => {
            notification.style.display = "none";
        }, 2000);
        e.clearSelection();
    });

    contactBtn.addEventListener("click", function () {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    closeBtn.addEventListener("click", function () {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    });

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
});

// Add this JavaScript for interactive elements
document.addEventListener("DOMContentLoaded", function () {
    // Animate the section divider on scroll
    const sectionDivider = document.querySelector(".section-divider");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    sectionDivider.style.width = "120px";
                }
            });
        },
        { threshold: 0.5 }
    );

    if (sectionDivider) {
        observer.observe(sectionDivider);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const statsSection = document.querySelector(".stats-section");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Trigger counter animations
                    const counters = document.querySelectorAll(".purecounter");
                    counters.forEach((counter) => {
                        counter.setAttribute("data-purecounter-start", "0");
                    });

                    // Trigger wave animations
                    const statCards = document.querySelectorAll(".stat-card");
                    statCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add("animate-in");
                        }, index * 200);
                    });
                }
            });
        },
        { threshold: 0.2 }
    );

    if (statsSection) {
        observer.observe(statsSection);
    }
});
