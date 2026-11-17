declare var document: any;
declare var window: any;

namespace pxsim.board {

    export function initSimVisuals() {
        let doc = (typeof document !== "undefined") ? document : (window && window.document ? window.document : null);
        if (!doc) return;

        // Évite de dupliquer si le simulateur se recharge
        if (doc.getElementById("motor-sim-card")) return;

        // On cible le conteneur du simulateur, ou le body en secours absolu
        let simContainer = doc.getElementById("sidediv") || doc.querySelector(".simPane") || doc.body;
        if (!simContainer) return;

        let wrapper = doc.createElement("div");
        wrapper.id = "motor-sim-card";
        wrapper.style.textAlign = "center";
        wrapper.style.marginTop = "15px";
        wrapper.style.position = "relative";
        wrapper.style.display = "inline-block";
        wrapper.style.zIndex = "99999";
        wrapper.style.backgroundColor = "#222"; // Fond sombre pour voir le conteneur
        wrapper.style.padding = "5px";
        wrapper.style.borderRadius = "10px";
        wrapper.style.boxShadow = "0 4px 10px rgba(0,0,0,0.5)";

        // Image de la carte moteur
        let img = doc.createElement("img");
        img.src = "./carte-moteur.png";
        img.style.width = "400px";
        img.style.display = "block";
        img.style.borderRadius = "6px";
        
        // Gestion de l'erreur si l'image ne charge pas
        img.onerror = () => {
            console.log("ERREUR : Impossible de trouver './carte-moteur.png'");
            wrapper.style.border = "2px solid red";
        };

        wrapper.appendChild(img);

        // Création des 8 voyants DEL (coordonnées exactes)
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

    function createLed(doc: any, parent: any, id: string, top: string, left: string) {
        let led = doc.createElement("div");
        led.id = id;
        led.style.position = "absolute";
        led.style.top = top;
        led.style.left = left;
        led.style.width = "12px";
        led.style.height = "12px";
        led.style.borderRadius = "50%";
        led.style.backgroundColor = "#444"; // Gris éteint par défaut
        led.style.border = "2px solid #fff";
        led.style.boxShadow = "0 0 4px rgba(0,0,0,0.8)";
        parent.appendChild(led);
    }

    export function setLedState(ledId: string, state: boolean, isReverse: boolean = false) {
        let doc = (typeof document !== "undefined") ? document : (window && window.document ? window.document : null);
        if (!doc) return;

        let led = doc.getElementById(ledId);
        if (led) {
            if (state) {
                led.style.backgroundColor = isReverse ? "#FF3B30" : "#34C759";
                led.style.boxShadow = isReverse ? "0 0 10px #FF3B30" : "0 0 10px #34C759";
            } else {
                led.style.backgroundColor = "#444";
                led.style.boxShadow = "0 0 4px rgba(0,0,0,0.8)";
            }
        }
    }

    // Lancement répété pour s'assurer que le DOM du simulateur est prêt
    control.runInBackground(() => {
        for (let i = 0; i < 5; i++) {
            basic.pause(1000);
            initSimVisuals();
        }
    });
}
