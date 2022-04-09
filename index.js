let checkboxDiv = document.getElementById("checkboxes");

// Add 
CreateNewCheckboxElement("Point Blank Shot", "pointBlankShot", checkboxDiv);
CreateNewCheckboxElement("Rapid Shot", "rapidShot", checkboxDiv);
CreateNewCheckboxElement("Manyshot", "manyshot", checkboxDiv);
CreateNewCheckboxElement("Weapon Focus", "weaponFocus", checkboxDiv);
CreateNewCheckboxElement("Rangers Focus", "rangersFocus", checkboxDiv);





function CreateNewCheckboxElement(text, id, elementToAppendTo){
    const fragment = document.createDocumentFragment();
    const label = document.createElement("label");
    const labelText = document.createTextNode(text);
    label.setAttribute("for", id);
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.name = id;
    input.id = id;

    label.appendChild(input);
    label.appendChild(labelText);
    fragment.appendChild(label);

    elementToAppendTo.appendChild(fragment);
    elementToAppendTo.appendChild(document.createElement("br"));
}