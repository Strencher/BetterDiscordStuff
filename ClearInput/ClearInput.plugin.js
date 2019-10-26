//META{"name":"clearInput"}*//

class clearInput {
    getName() {return "ClearInput";}
    getAuthor() {return "Strencher";}
    getDescription() {return "Adds a 'X' in the textbox to clear the input.";}
    getVersion() {return "0.0.1";}

    load() {}
    unload() {this.clearButtonRemove();}
    onSwitch() {
        if(document.getElementsByClassName("clearButton")) {
            this.clearButton();
        }else {
            return;
        }
    
    }
    start() {
        if(document.getElementsByClassName("clearButton")) {
            this.clearButton();
        }else {
            return;
        }
    }
    clearButtonOnClick() {

        let area = document.getElementsByClassName("textArea-2Spzkt")[0];
        let clear = "";
        area.value = clear;
    }
    
    clearButtonRemove() {
        let s1 = document.getElementsByClassName("clearButton")[0];
        let s2 = document.getElementsByClassName("clearButtonInner")[0];
        let s3 = document.getElementsByClassName("clearButtonIcon")[0];
        s1.setAttribute("style", "display: none;");
        s2.setAttribute("style", "display: none;");
        s3.setAttribute("style", "display: none;");
    
    
    
    }
    clearButton() {



        let box = document.getElementsByClassName("attachButtonDivider-3Glu60")[0];
        let button = document.createElement("button");
        let buttonIcon = document.createElement("img");
        let buttonInner = document.createElement("div");
        buttonIcon.setAttribute("src", "https://image.flaticon.com/icons/svg/151/151882.svg");
        buttonInner.setAttribute("style", "background-color: transparent;");
        button.setAttribute("style", "background-color: transparent !important; z-index: 99999;");
        button.setAttribute("class", "clearButton");
        buttonInner.setAttribute("class", "clearButtonInner");
        buttonIcon.setAttribute("class", "clearButtonIcon");
        button.setAttribute("style", "margin-right: -7px !important; background-color: transparent !important");
        buttonIcon.setAttribute("style", "filter: invert(70%) !important; margin-bottom: 15px !important; margin-right: -1px;");
        buttonIcon.setAttribute("height", "10");
        buttonIcon.setAttribute("width", "10");
        box.setAttribute("style", "background-color: transparent !important;")
        button.setAttribute("style", "margin-left:-6px !important; margin-top: 1px !important; background-color: transparent !important;");

        buttonIcon.onmouseover = () => {
            buttonIcon.setAttribute("style", "filter: invert(100%) !important; transform: scale(1.2) !important; margin-bottom: 15px !important;");
          }
          buttonIcon.onmouseout = () => {
            buttonIcon.setAttribute("style", "filter: invert(70%) !important; transform: scale(1) !important; margin-bottom: 15px !important;");
          }
        button.onclick = () => {
            this.clearButtonOnClick();
        }
        


        box.appendChild(button);
        button.appendChild(buttonInner);
        buttonInner.appendChild(buttonIcon);

    }

    stop() {this.clearButtonRemove();}
}