namespace pxsim {
    // Définition de la carte simulée pour s'intégrer au moteur MakeCode
    export class Board extends CoreBoard {
        public element: SVGElement;
        
        constructor() {
            super();
            // Initialisation de la vue de la carte dans le simulateur
            this.initVisuals();
        }

        private initVisuals() {
            // Utilisation du conteneur officiel du simulateur MakeCode
            let container = document.getElementById("sidediv") || document.querySelector(".simPane");
            if (!container) return;

            // Évite les doublons si le simulateur redémarre
            if (document.getElementById("motor-sim-card")) return;

            let wrapper = document.createElement("div");
            wrapper.id = "motor-sim-card";
            wrapper.style.textAlign = "center";
            wrapper.style.marginTop = "10px";
            wrapper.style.position = "relative";
            wrapper.style.display = "inline-block";
            wrapper.style.zIndex = "10";

            // Image de la carte moteur
            let img = document.createElement("img");
            img.src = "./carte-moteur.png";
            img.style.width = "450px";
            img.style.borderRadius = "8px";
            wrapper.appendChild(img);

            // Création des 8 voyants DEL (coordonnées exactes)
            this.createLed(wrapper, "led_m4_fwd", "35px", "90px");
            this.createLed(wrapper, "led_m4_rev", "35px", "130px");
            this.createLed(wrapper, "led_m3_fwd", "35px", "172px");
            this.createLed(wrapper, "led_m3_rev", "35px", "212px");
            this.createLed(wrapper, "led_m2_fwd", "35px", "253px");
            this.createLed(wrapper, "led_m2_rev", "35px", "294px");
            this.createLed(wrapper, "led_m1_fwd", "35px", "334px");
            this.createLed(wrapper, "led_m1_rev", "35px", "375px");

            container.appendChild(wrapper);
        }

        private createLed(parent: HTMLElement, id: string, top: string, left: string) {
            let led = document.createElement("div");
            led.id = id;
            led.style.position = "absolute";
            led.style.top = top;
            led.style.left = left;
            led.style.width = "10px";
            led.style.height = "10px";
            led.style.borderRadius = "50%";
            led.style.backgroundColor = "#444";
            led.style.border = "1px solid #fff";
            led.style.boxShadow = "inset 0 0 2px rgba(0,0,0,0.5)";
            parent.appendChild(led);
        }

        public updateLedState(ledId: string, state: boolean, isReverse: boolean = false) {
            let led = document.getElementById(ledId);
            if (led) {
                if (state) {
                    led.style.backgroundColor = isReverse ? "#FF3B30" : "#34C759";
                    led.style.boxShadow = isReverse ? "0 0 8px #FF3B30" : "0 0 8px #34C759";
                } else {
                    led.style.backgroundColor = "#444";
                    led.style.boxShadow = "inset 0 0 2px rgba(0,0,0,0.5)";
                }
            }
        }
    }

    // Fonction globale appelée par main.ts pour mettre à jour les DEL
    export function setLedState(ledId: string, state: boolean, isReverse: boolean = false) {
        let board = pxsim.board();
        if (board && (board as any).updateLedState) {
            (board as any).updateLedState(ledId, state, isReverse);
        }
    }
}
