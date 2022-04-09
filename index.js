let checkboxDiv = document.getElementById("checkboxes");

// Add 
CreateNewCheckboxElement("Point Blank Shot", "pointBlankShot", checkboxDiv);
CreateNewCheckboxElement("Rapid Shot", "rapidShot", checkboxDiv);
CreateNewCheckboxElement("Manyshot", "manyshot", checkboxDiv);
CreateNewCheckboxElement("Weapon Focus", "weaponFocus", checkboxDiv);
CreateNewCheckboxElement("Rangers Focus", "rangersFocus", checkboxDiv);





function CreateNewCheckboxElement(text, id, elementToAppendTo){

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkboxes";
    checkbox.id = id;
    elementToAppendTo.appendChild(checkbox);


    let label = document.createElement("label");
    label.textContent = text;
    elementToAppendTo.appendChild(label);

    elementToAppendTo.appendChild(document.createElement("br"));
}