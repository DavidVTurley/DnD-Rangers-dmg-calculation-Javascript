///////////////////////// Checkboxes /////////////////////////
const checkboxDiv = document.getElementById("checkboxDiv");

const Checkboxes = [
    CreateInputElement("Point Blank Shot", "pointBlankShot", "modifier", "checkbox", checkboxDiv),
    CreateInputElement("Rapid Shot", "rapidShot", "modifier", "checkbox", checkboxDiv),
    CreateInputElement("Manyshot", "manyshot", "modifier", "checkbox", checkboxDiv),
    CreateInputElement("Weapon Focus", "weaponFocus", "modifier", "checkbox", checkboxDiv),
    CreateInputElement("Rangers Focus", "rangersFocus", "modifier", "checkbox", checkboxDiv)
];

///////////////////////// Stats /////////////////////////
const statDiv = document.getElementById("statDiv");

const Stats = [
    CreateInputElement("Strength", "str", "statNumInput", "number", statDiv),
    CreateInputElement("Dexterity", "dex", "statNumInput", "number", statDiv),
    CreateInputElement("Constitution", "con", "statNumInput", "number", statDiv),
    CreateInputElement("Inteligence", "int", "statNumInput", "number", statDiv),
    CreateInputElement("Wisdom", "wis", "statNumInput", "number", statDiv),
    CreateInputElement("Charisma", "cha", "statNumInput", "number", statDiv)
];

Stats[0].value = 16;
Stats[1].value = 19;
Stats[2].value = 8;
Stats[3].value = 10;
Stats[4].value = 12;
Stats[5].value = 8;

///////////////////////// Attack /////////////////////////


///////////////////////// General /////////////////////////
function GetStat(statabbreviation) {
    return Stats.find(x => x.id == statabbreviation).value;
};

function GetMod(statabbreviation){
    const stat = (GetStat(statabbreviation) - 10) / 2;
    return Math.floor(stat);
}

function CreateInputElement(text, id, inputClass, inputType, elementToAppendTo){
    const fragment = document.createDocumentFragment();
    const label = document.createElement("label");
    
    const labelText = document.createTextNode(text);
    label.setAttribute("for", id);
    
    const input = document.createElement('input');
    input.setAttribute('type', inputType);
    input.setAttribute('class', inputClass);
    input.name = id;
    input.id = id;

    label.appendChild(input);
    label.appendChild(labelText);
    fragment.appendChild(label);

    elementToAppendTo.appendChild(fragment);
    elementToAppendTo.appendChild(document.createElement("br"));

    return input;
}
