namespace pxsim.board {
    // Cette fonction s'exécute dans le navigateur pour dessiner l'interface du simulateur
    export function initSimVisuals() {
        // Recherche du conteneur du simulateur MakeCode
        let simContainer = document.getElementById("sidediv");
        if (!simContainer) return;

        // Création d'un bloc conteneur pour la carte moteur sous micro:bit
        let wrapper = document.getElementById("motor-sim-card");
        if (!wrapper) {
            wrapper = document.createElement("div");
            wrapper.id = "motor-sim-card";
            wrapper.style.textAlign = "center";
            wrapper.style.marginTop = "10px";
            wrapper.style.position = "relative";
            wrapper.style.display = "inline-block";

            // Insertion de l'image de la carte moteur
            let img = document.createElement("img");
            img.src = "./carte-moteur.png"; // Nom du fichier image dans le dépôt
            img.style.width = "180px"; // Ajustez la taille selon vos besoins
            img.style.borderRadius = "8px";
            wrapper.appendChild(img);

            // Création des voyants DEL superposés (ex: pour M1 et M2)
            // Vous pouvez dupliquer et positionner chaque DEL en CSS (top/left)
            createLed(wrapper, "led_m1_fwd", "50px", "30px"); // Coordonnées sur l'image
            createLed(wrapper, "led_m1_rev", "50px", "50px");

            simContainer.appendChild(wrapper);
        }
    }

    functionatiques(parent: HTMLElement, id: string, top: string, left: string) {
        let led = document.createElement("div");
        led.id = id;
        led.style.position = "absolute";
        led.style.top = top;
        led.style.left = left;
        led.style.width = "12px";
        led.style.height = "12px";
        led.style.borderRadius = "50%";
        led.style.backgroundColor = "#555"; // Éteint par défaut (gris)
        led.style.border = "1px solid #fff";
        parent.appendChild(led);
    }

    // Fonction appelée par vos blocs pour allumer ou éteindre une DEL visuelle
    export function setLedState(ledId: string, state: boolean) {
        let led = document.getElementById(ledId);
        if (led) {
            led.style.backgroundColor = state ? "#00FF00" : "#555"; // Vert si actif, gris si éteint
            led.style.boxShadow = state ? "0 0 8px #00FF00" : "none"; // Effet lumineux
        }
    }
}
