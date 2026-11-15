
document.addEventListener("DOMContentLoaded", function () {

    // ==================================
    // MOBILES MENÜ
    // ==================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navigation.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });

        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";

            });

        });

    }


    // ==================================
    // IMMOBILIEN-SUCHFILTER
    // ==================================

    const searchForm = document.getElementById("search-form");

    const locationSelect = document.getElementById("location");
    const typeSelect = document.getElementById("property-type");
    const priceSelect = document.getElementById("max-price");

    const propertyCards = document.querySelectorAll(".property-card");
    const noResults = document.getElementById("no-results");

    if (searchForm) {

        searchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const selectedLocation = locationSelect.value;
            const selectedType = typeSelect.value;
            const selectedPrice = priceSelect.value;

            let visibleProperties = 0;

            propertyCards.forEach(function (card) {

                const cardLocation = card.dataset.location;
                const cardType = card.dataset.type;
                const cardPrice = Number(card.dataset.price);

                const matchesLocation =
                    selectedLocation === "" ||
                    cardLocation === selectedLocation;

                const matchesType =
                    selectedType === "" ||
                    cardType === selectedType;

                const matchesPrice =
                    selectedPrice === "" ||
                    cardPrice <= Number(selectedPrice);

                const matchesAll =
                    matchesLocation &&
                    matchesType &&
                    matchesPrice;

                card.hidden = !matchesAll;

                if (matchesAll) {
                    visibleProperties++;
                }

            });

            noResults.hidden = visibleProperties > 0;

            document.getElementById("immobilien").scrollIntoView({
                behavior: "smooth"
            });

        });

    }


    // ==================================
    // DEMO-KONTAKTFORMULAR
    // ==================================

    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    if (contactForm && formMessage) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            formMessage.textContent =
                "Vielen Dank! Dies ist ein Demo-Formular. Ihre Nachricht wurde nicht versendet.";

            contactForm.reset();

        });

    }

    // ==================================
    // IMMOBILIEN-DETAILANSICHTEN
    // ==================================

    const propertyDialog = document.getElementById("property-dialog");
    const dialogClose = document.getElementById("dialog-close");
    const detailButtons = document.querySelectorAll(".detail-btn");

    const propertyDescriptions = {
        Berlin:
            "Diese moderne Wohnung überzeugt mit einem hellen Wohnbereich, " +
            "offener Raumgestaltung und zeitloser Einrichtung.",

        Hamburg:
            "Dieses großzügige Familienhaus bietet viel Platz, " +
            "große Fenster und einen schönen Garten.",

        München:
            "Diese exklusive Designvilla verbindet moderne Architektur " +
            "mit großzügigen Räumen und hochwertigem Wohnkomfort."
    };

    if (propertyDialog && dialogClose) {

        detailButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const card = button.closest(".property-card");

                if (!card) return;

                const location = card.dataset.location;
                const title = card.querySelector("h3").textContent;
                const image = card.querySelector(".property-image img");
                const details = card.querySelectorAll(".property-details span");
                const price = card.querySelector(".property-footer strong").textContent;

                document.getElementById("dialog-title").textContent = title;
                document.getElementById("dialog-location").textContent = location;
                document.getElementById("dialog-image").src = image.src;
                document.getElementById("dialog-image").alt = image.alt;

                document.getElementById("dialog-area").textContent =
                    details[0].textContent;

                document.getElementById("dialog-rooms").textContent =
                    details[1].textContent;

                document.getElementById("dialog-price").textContent = price;

                document.getElementById("dialog-description").textContent =
                    propertyDescriptions[location] || "";

                propertyDialog.showModal();

            });

        });

        dialogClose.addEventListener("click", function () {
            propertyDialog.close();
        });

        const dialogContact = document.getElementById("dialog-contact");

        if (dialogContact) {
            dialogContact.addEventListener("click", function () {
                propertyDialog.close();
            });
        }

    }

});
