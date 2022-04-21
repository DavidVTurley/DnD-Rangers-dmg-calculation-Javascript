///////////////////////// Checkboxes /////////////////////////
const checkboxDiv = document.getElementById("checkboxDiv");

const pointBlankShot = CreateInputElement("Point Blank Shot", "pointBlankShot", "modifier", "checkbox", checkboxDiv);
const rapidShot = CreateInputElement("Rapid Shot", "rapidShot", "modifier", "checkbox", checkboxDiv);
const manyshot = CreateInputElement("Manyshot", "manyshot", "modifier", "checkbox", checkboxDiv);
const weaponFocus = CreateInputElement("Weapon Focus", "weaponFocus", "modifier", "checkbox", checkboxDiv);
const rangersFocus = CreateInputElement("Rangers Focus", "rangersFocus", "modifier", "checkbox", checkboxDiv);

///////////////////////// Stats /////////////////////////
const statDiv = document.getElementById("statDiv");

const Stats = [
    CreateInputElement("Strength", "str", "statNumInput", "number", statDiv),
    CreateInputElement("Dexterity", "dex", "statNumInput", "number", statDiv),
    CreateInputElement("Constitution", "con", "statNumInput", "number", statDiv),
    CreateInputElement("Inteligence", "int", "statNumInput", "number", statDiv),
    CreateInputElement("Wisdom", "wis", "statNumInput", "number", statDiv),
    CreateInputElement("Charisma", "cha", "statNumInput", "number", statDiv),
    CreateInputElement("Base attack bonus", "bab", "statNumInput", "number", statDiv)
];

Stats[0].value = 16;
Stats[1].value = 19;
Stats[2].value = 8;
Stats[3].value = 10;
Stats[4].value = 12;
Stats[5].value = 8;
Stats[6].value = 8;

///////////////////////// Attack /////////////////////////
class Attack {
    constructor(name, critNum, critMultiplyer, attackRoll = undefined, attackModReduction = 0){
        console.log(attackModReduction);

        this.Name = name;
        this.CritMultiplyer = critMultiplyer;
        this.AttackModReduction = attackModReduction;
        if(attackRoll != undefined){
          this.AttackRoll = attackRoll;  
        }        
        else {
            this.AttackRoll = GetRandomIntInclusive(20);
        }        
        avarageRolledD20.push(this.AttackRoll);
        
        this.DamageRollPierce = GetRandomIntInclusive(8);
        this.DamageRollAcid = GetRandomIntInclusive(6);
        this.CritDamageRoll = [];
        for(let x = 1; x < critMultiplyer; x++){
            this.CritDamageRoll.push(GetRandomIntInclusive(8));
        }

        if(this.AttackRoll >= critNum){
            this.Crit = GetRandomIntInclusive(20);
            avarageRolledD20.push(this.Crit);
        }
    }
}

let avarageRolledD20 = [];
function CalculateAvaragedRolled(){
    let totalRolled = 0;
    avarageRolledD20.forEach(element => {
        totalRolled += element;
    });
    console.log(`Avarage Rolled = ` +totalRolled / avarageRolledD20.length)
    console.log("----")
    return totalRolled / avarageRolledD20.length;
}
function FullAttack(){
    attacks = [new Attack("Main", 20, 3)];
    if(manyshot.checked){
        attacks.push(new Attack("Manyshot", 20, 3, attacks[0].AttackRoll));
    }
    if(rapidShot.checked){
        attacks.push(new Attack("RapidShot", 20, 3));
    }
    let numberOfAttacksDone = 1;
    for(let x = 0; Math.floor(Stats[6].value / 6) > x; x++){
        attacks.push(new Attack("Second Attack", 20, 3, attackRoll = undefined, attackModReduction = -(numberOfAttacksDone * 6)));
        numberOfAttacksDone +1;
    }


    GetAttacksToPrint(attacks, GetAttackModifiers(), GetDmgModifiers());
}

function SingleAttack(){
    GetAttacksToPrint([new Attack("Main", 20, 3)], GetAttackModifiers(), GetDmgModifiers());
    //CalculateAvaragedRolled();
}

function GetAttacksToPrint(listOfAttacks, attackMod, dmgMod){  
    let text = [];
    let totalDamage = 0;
    let pierceDamage = 0;
    let acidDamage = 0;
    
    listOfAttacks.forEach(attack => {
        attackMod += attack.AttackModReduction;
        text.push(`${attack.Name}: ${attack.AttackRoll}+${attackMod} (${attack.AttackRoll + attackMod})`);
        text.push(`Pierce: ${attack.DamageRollPierce} + ${dmgMod}, Acid: ${attack.DamageRollAcid}`);

        if(attack.Crit != undefined){
            text.push(`CRIT(X${attack.CritMultiplyer}): ${attack.Crit}+${attackMod} (${attack.Crit + attackMod})`);
            attack.CritDamageRoll.forEach(critRoll => {
                text.push(`Pierce: ${critRoll} + ${dmgMod}`);
                totalDamage += critRoll + dmgMod;
                pierceDamage += critRoll + dmgMod;
            });
        }
        text.push(`-`);

        totalDamage += attack.DamageRollPierce + attack.DamageRollAcid + dmgMod;
        pierceDamage += attack.DamageRollPierce + dmgMod;
        acidDamage += attack.DamageRollAcid;
    });

    text.push(`Total damage: ${totalDamage}`)
    text.push(`Pierce damage: ${pierceDamage}`)
    text.push(`Acid damage: ${acidDamage}`)
    text.push(`AverageRoll20: ${CalculateAvaragedRolled()}`)
    


    text.push(`-------------------------`);


    let log = document.getElementById("rolls");
    let newDiv;
    let newTextElement;
    text.forEach(t => {
        newDiv = document.createElement("div");
        newTextElement = document.createTextNode(t);
        newDiv.appendChild(newTextElement);
        log.appendChild(newDiv);
    });

};


function GetAttackModifiers(){
    let attackMod = 0;
    if(pointBlankShot.checked) attackMod += 1;
    if(rapidShot.checked) attackMod += -2;
    if(weaponFocus.checked) attackMod += 1;
    if(rangersFocus.checked) attackMod += 4;

    attackMod = attackMod + GetMod("bab");

    return attackMod;
}

function GetDmgModifiers(){
    let dmgMod = 0;
    if(pointBlankShot.checked) dmgMod += 1;
    if(rangersFocus.checked) dmgMod += 4;

    return dmgMod;
}

///////////////////////// General /////////////////////////
function GetStat(statabbreviation) {
    return Stats.find(x => x.id == statabbreviation).value;
};

function GetMod(statabbreviation){
    if(statabbreviation ==  "bab") return parseInt(GetStat(statabbreviation));
    const stat = (GetStat(statabbreviation) - 10) / 2;
    return Math.floor(stat);
}

function GetRandomIntExclusive(max) {
    return Math.floor(Math.random() * max);
}
function GetRandomIntInclusive(max) {
    return Math.floor(Math.random() * max) + 1;
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
