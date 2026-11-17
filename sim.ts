declare var document: any;
declare var window: any;

namespace pxsim {
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

    // Injection automatique de la carte au démarrage de la simulation
    function initSimVisuals() {
        let doc = (typeof document !== "undefined") ? document : (window && window.document ? window.document : null);
        if (!doc) return;

        if (doc.getElementById("motor-sim-card")) return;

        let simContainer = doc.getElementById("sidediv") || doc.querySelector(".simPane") || doc.body;
        if (!simContainer) return;

        let wrapper = doc.createElement("div");
        wrapper.id = "motor-sim-card";
        wrapper.style.textAlign = "center";
        wrapper.style.marginTop = "10px";
        wrapper.style.position = "relative";
        wrapper.style.display = "inline-block";
        wrapper.style.zIndex = "99999";

        let img = doc.createElement("img");
        img.src = "./carte-moteur.png";
        img.style.width = "400px";
        img.style.display = "block";
        img.style.borderRadius = "6px";
        wrapper.appendChild(img);

        // Création des 8 DEL aux coordonnées exactes
        createLed(doc, wrapper, "led_m4_fwd", "35px", "90px");
        createLed(doc, wrapper, "led_m4_rev", "35px", "130px");
        createLed(doc, wrapper, "led_m3_fwd", "35px", "172px");
        createLed(doc, wrapper, "led_m3_rev", "35px", "212px");
        createLed(doc, wrapper, "led_m2_fwd", "35px", "253px");
        createLed(doc, wrapper, "led_m2_rev", "35px", "294px");
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
        let radius = led.style.borderRadius = "50%";
        led.style.backgroundColor = "#444";
        led.style.border = "2px solid #fff";
        led.style.boxShadow = "0 0 4px rgba(0,0,0,0.8)";
        parent.appendChild(led);
    }

    // Lancement de l'initialisation visuelle
    if (typeof control !== "undefined" && control.runInBackground) {
        control.runInBackground(() => {
            basic.pause(500);
            initSimVisuals();
        });
    }
}
