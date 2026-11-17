namespace pxsim.board {
    // Fonction d'auto-démarrage sécurisée
    function autoInit() {
        let runtimeObj = (pxsim as any).runtime;
        let win = runtimeObj ? runtimeObj.window : null;
        let doc = win ? win.document : null;
        
        if (!doc || !win) {
            return;
        }

        // Recherche du conteneur dans le simulateur MakeCode
        let simContainer = doc.getElementById("sidediv") || doc.querySelector(".simPane");
        if (!simContainer) {
            // Utilisation de win.setTimeout au lieu de setTimeout
            win.setTimeout(() => autoInit(), 500);
            return;
        }

        initSimVisuals();
    }

    export function initSimVisuals() {
        let runtimeObj = (pxsim as any).runtime;
        let win = runtimeObj ? runtimeObj.window : null;
        let doc = win ? win.document : null;
        if (!doc) return;

        let simContainer = doc.getElementById("sidediv") || doc.querySelector(".simPane");
        if (!simContainer) return;

        let wrapper = doc.getElementById("motor-sim-card");
        if (!wrapper) {
            wrapper = doc.createElement("div");
            wrapper.id = "motor-sim-card";
            wrapper.style.textAlign = "center";
            wrapper.style.marginTop = "10px";
            wrapper.style.position = "relative";
            wrapper.style.display = "inline-block";
            wrapper.style.zIndex = "10";

            // Image de la carte moteur (carte-moteur.png)
            let img = doc.createElement("img");
            img.src = "./carte-moteur.png";
            img.style.width = "450px";
            img.style.borderRadius = "8px";
            wrapper.appendChild(img);

            // Création des 8 voyants DEL selon vos coordonnées exactes :
            // M4
            createLed(doc, wrapper, "led_m4_fwd", "35px", "90px");
            createLed(doc, wrapper, "led_m4_rev", "35px", "130px");
            // M3
            createLed(doc, wrapper, "led_m3_fwd", "35px", "172px");
            createLed(doc, wrapper, "led_m3_rev", "35px", "212px");
            // M2
            createLed(doc, wrapper, "led_m2_fwd", "35px", "253px");
            createLed(doc, wrapper, "led_m2_rev", "35px", "294px");
            // M1
            createLed(doc, wrapper, "led_m1_fwd", "35px", "334px");
            createLed(doc, wrapper, "led_m1_rev", "35px", "375px");

            simContainer.appendChild(wrapper);
        }
    }

    function createLed(doc: any, parent: any, id: string, top: string, left: string) {
        let led = doc.createElement("div");
        led.id = id;
        led.style.position = "absolute";
        led.style.top = top;
        led.style.left = left;
        led.style.width = "10px";
        led.style.height = "10px";
        led.style.borderRadius = "50%";
        led.style.backgroundColor = "#444"; // Éteint par défaut (gris foncé)
        led.style.border = "1px solid #fff";
        led.style.boxShadow = "inset 0 0 2px rgba(0,0,0,0.5)";
        parent.appendChild(led);
    }

    export function setLedState(ledId: string, state: boolean, isReverse: boolean = false) {
        let runtimeObj = (pxsim as any).runtime;
        let win = runtimeObj ? runtimeObj.window : null;
        let doc = win ? win.document : null;
        if (!doc) return;

        let led = doc.getElementById(ledId);
        if (led) {
            if (state) {
                // Vert pour le sens avant, Rouge pour le sens arrière
                led.style.backgroundColor = isReverse ? "#FF3B30" : "#34C759";
                led.style.boxShadow = isReverse ? "0 0 8px #FF3B30" : "0 0 8px #34C759";
            } else {
                led.style.backgroundColor = "#444";
                led.style.boxShadow = "inset 0 0 2px rgba(0,0,0,0.5)";
            }
        }
    }

    // Lancement de l'initialisation
    autoInit();
}
