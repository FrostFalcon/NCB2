formIcons = 
{
    685: "-a",
    686: "-d",
    687: "-s",
    688: "-s",
    689: "-t",
    690: "-s",
    691: "-o",
    692: "-h",
    693: "-w",
    694: "-f",
    695: "-s",
    696: "-m",
    697: "-s",
    698: "-r",
    699: "-i",
    700: "-b",
    701: "d",
    702: "-p",
    703: "-b",
    704: "-w",
    705: "-r",
    706: "-s",
    707: "-s",
    708: "-s"
};

class Pokemon
{
    constructor(id, name, baseid, formid, baseStats, oldStats, types, abilities, evYield, genderRatio, levelRate, levelUpMoves, tms, evolutionMethods, associates)
    {
        this.id = id;
        this.name = name;
        this.baseid = baseid;
        this.formid = formid;

        this.sprite = "https://www.serebii.net/blackwhite/pokemon/" + LeadingZeros(id) + ".png";
        if ([252, 253, 254].includes(id))
        {
            this.icon = "https://www.serebii.net/pokedex-sm/icon/" + LeadingZeros(id + 470) + ".png";
        }
        else if (id in formIcons)
        {
            this.icon = "https://www.serebii.net/pokedex-sm/icon/" + LeadingZeros(this.baseid) + formIcons[id] + ".png";
        }
        else
        {
            this.icon = "https://www.serebii.net/pokedex-sm/icon/" + LeadingZeros(id) + ".png";
        }

        this.baseStats = baseStats;
        this.baseHP = baseStats[0];
        this.baseAtt = baseStats[1];
        this.baseDef = baseStats[2];
        this.baseSpA = baseStats[3];
        this.baseSpD = baseStats[4];
        this.baseSpe = baseStats[5];
        this.baseStatTotal = this.baseHP + this.baseAtt + this.baseDef + this.baseSpA + this.baseSpD + this.baseSpe;

        this.oldbaseStats = oldStats;
        this.oldBaseHP = oldStats[0];
        this.oldBaseAtt = oldStats[1];
        this.oldBaseDef = oldStats[2];
        this.oldBaseSpA = oldStats[3];
        this.oldBaseSpD = oldStats[4];
        this.oldBaseSpe = oldStats[5];
        this.oldBaseStatTotal = this.oldBaseHP + this.oldBaseAtt + this.oldBaseDef + this.oldBaseSpA + this.oldBaseSpD + this.oldBaseSpe;

        this.type1 = types[0];
        this.type2 = types[1];
        this.ability1 = abilities[0];
        this.ability2 = abilities[1];
        this.ability3 = abilities[2];

        this.evYield = evYield;
        this.genderRatio = genderRatio;
        this.levelRate = levelRate;

        this.levelUpMoves = levelUpMoves;
        this.tms = tms;

        this.evolutionMethods = evolutionMethods;
        this.associates = associates;
    }
}

function LeadingZeros(num)
{
    return ("000" + num).substring(("000" + num).length - 3);
}

function SetupList(filter)
{
    document.getElementById('pokelist').innerHTML = "";
    for (let id in pokedexEntries)
    {
        if (!pokedexEntries[id].name.includes("("))
        {
            if (filter == "" || CheckFilter(filter.toLowerCase(), pokedexEntries[id]))
            {
                document.getElementById('pokelist').appendChild(document.createElement("br"));
                let b = document.createElement("button");
                b.className = "PokedexEntry";
                b.innerHTML = LeadingZeros(pokedexEntries[id].id) + " " + pokedexEntries[id].name;
                let pk = pokedexEntries[id];
                b.addEventListener ("click", function() {
                    OpenPokedexEntry(pk, true);
                });
                b.style.zIndex = 1;

                let icon = document.createElement("div");
                icon.className = "PokedexIcon";
                icon.style.backgroundImage = 'url(' + pokedexEntries[id].icon + ')';
                icon.style.zIndex = 2;
                document.getElementById('pokelist').append(icon);

                document.getElementById('pokelist').append(b);
            }
        }
    }
    for (let n = 0; n < 5; n++)
    {
        document.getElementById('pokelist').appendChild(document.createElement("br"));
    }
}

function CheckFilter(filter, poke)
{
    let dropdown = document.getElementById("filterDropdown").options[document.getElementById("filterDropdown").selectedIndex].text;
    if (dropdown == "Name" && poke.name.toLowerCase().includes(filter))
    {
        return true;
    }
    if (dropdown == "Type" && (poke.type1.toLowerCase().includes(filter) || poke.type2.toLowerCase().includes(filter)))
    {
        return true;
    }
    if (dropdown == "Ability" && (poke.ability1.toLowerCase().includes(filter) || poke.ability2.toLowerCase().includes(filter)))
    {
        return true;
    }
    if (dropdown == "Move" && (poke.levelUpMoves.some(function (item)
    {
        return item[0].toLowerCase().includes(filter)
    }) || poke.tms.some(function (item)
    {
        return item.toLowerCase().includes(filter)
    })))
    {
        return true;
    }
    if (dropdown == "Evolution" && (poke.name.toLowerCase().includes(filter) || poke.associates.some(function (item)
    {
        return item.toLowerCase().includes(filter)
    })))
    {
        return true;
    }
    return false;
}

function GoHome()
{
    history.pushState(null, document.title, location.pathname);
    window.location.replace("../index.html");
}

function OpenPokedexEntry(poke, resetForms)
{
    document.getElementById("pokeImage").style.backgroundImage = 'url("../DexSprites/' + poke.name + '.png")';
    
    document.getElementById("statBox").innerHTML = "";
    let statNames = ["Hp", "Attack", "Defense", "Sp. Att", "Sp. Def", "Speed"];
    for (let i = 0; i < 6; i++)
    {
        let label = document.createElement("div");
        label.className = "StatText";
        label.style.display = "inline-block";
        label.style.marginTop = 8;
        label.innerHTML = statNames[i];
        label.style.top = 40 * i;
        document.getElementById("statBox").appendChild(label);
        
        let bar = document.createElement("div");
        bar.className = "StatBar";
        bar.style.width = Math.pow(poke.baseStats[i] * 2.25, 1 / 1.1) + 10;
        bar.style.height = 20;
        bar.style.top = -4 + 40 * i;
        if (poke.oldbaseStats[i] < poke.baseStats[i])
        {
            bar.style.backgroundColor = "rgb(128, 255, 128)";
        }
        document.getElementById("statBox").appendChild(bar);

        let bar2 = document.createElement("div");
        bar2.className = "StatBar";
        bar2.style.width = Math.pow(poke.oldbaseStats[i] * 2.25, 1 / 1.1) + 10;
        bar2.style.height = 20;
        bar2.style.top = -4 + 40 * i;
        if (poke.oldbaseStats[i] > poke.baseStats[i])
        {
            bar2.style.backgroundColor = "rgb(255, 128, 128)";
            bar.style.zIndex = 11;
        }
        document.getElementById("statBox").appendChild(bar2);

        label = document.createElement("div");
        label.className = "StatText";
        label.style.display = "inline-block";
        label.style.marginTop = 8;
        label.innerHTML = poke.baseStats[i];
        label.style.top = 40 * i;
        label.style.left = 432;
        document.getElementById("statBox").appendChild(label);
    }

    document.getElementById("type1Icon").style.backgroundImage = "url(../Images/TypeIcons/" + poke.type1 + ".png";
    if (poke.type1 == poke.type2)
    {
        document.getElementById("type1Icon").style.left = 124;
        document.getElementById("type2Icon").style.display = "none";
    }
    else
    {
        document.getElementById("type1Icon").style.left = 64;
        document.getElementById("type2Icon").style.backgroundImage = "url(../Images/TypeIcons/" + poke.type2 + ".png";
        document.getElementById("type2Icon").style.display = "";
    }

    let abil = "";
    if (poke.ability2 == "--") abil = "Ability: " + poke.ability1;
    else abil = "Abilities: " + poke.ability1 + ", " + poke.ability2;
    document.getElementById("abilityText").innerHTML = abil + "<br>Hidden Ability: " + poke.ability3;

    //Forms
    if (resetForms)
    {
        document.getElementById("formList").innerHTML = "";
        for (let i = 0; i < poke.associates.length; i++)
        {
            let form = pokedexEntries.find((p) => { return p.name == poke.associates[i]});
            if (form != null)
            {
                let icon = document.createElement("div");
                icon.className = "PokeFormIcon"
                icon.zIndex = 12;
                icon.style.backgroundImage = "url(" + form.icon + ")";
                icon.style.top = 440;
                icon.style.left = 20 + 90 * i;
                icon.addEventListener("click", function() {
                    OpenPokedexEntry(form, false);
                });
                document.getElementById("formList").appendChild(icon);
            }
        }
    }
    for (let i = 0; i < poke.associates.length; i++)
    {
        let form = pokedexEntries.find((p) => { return p.name == poke.associates[i]});
        if (form == poke)
        {
            document.getElementById("formOutline").style.top = 440;
            document.getElementById("formOutline").style.left = 16 + 90 * (i);
            if (poke.associates.indexOf(poke.name) == 0)
                document.getElementById("formOutline").style.left = 16 + 90 * (i + poke.formid);
        }
    }
    document.getElementById("dexPage").scrollTop = 0;

    //Moves
    document.getElementById("learnsetBox").innerHTML = "";
    for (let i = 0; i < poke.levelUpMoves.length; i++)
    {
        let move = poke.levelUpMoves[i];

        let t = document.createElement("div");
        t.className = "TypeIcon";
        t.style.height = 24;
        t.style.top = 16 + 40 * i;
        t.style.left = 252;
        t.style.backgroundImage = "url(../Images/TypeIcons/" + moveData[move[0]].type + ".png";
        document.getElementById("learnsetBox").appendChild(t);

        t = document.createElement("div");
        t.className = "TypeIcon";
        t.style.height = 28;
        t.style.top = 14 + 40 * i;
        t.style.left = 330;
        t.style.backgroundImage = "url(../Images/TypeIcons/" + moveData[move[0]].category + ".png";
        document.getElementById("learnsetBox").appendChild(t);

        document.getElementById("learnsetBox").innerHTML += "lv " + move[1] + "<br>";
        
        let label = document.createElement("div");
        label.className = "learnsetMoveText";
        label.style.display = "inline-block";
        label.innerHTML = move[0];
        label.style.top = 40 * i;
        document.getElementById("learnsetBox").appendChild(label);
    }
    document.getElementById("learnsetBox").parentElement.style.height = poke.levelUpMoves.length * 40 + 12;
    document.getElementById("learnsetBox").append(document.createElement("br"));

    //TMs
    document.getElementById("learnsetTMBox").innerHTML = "";
    for (let i = 0; i < poke.tms.length; i++)
    {
        let move = poke.tms[i];
        console.log(move);

        let t = document.createElement("div");
        t.className = "TypeIcon";
        t.style.height = 24;
        t.style.top = 16 + 40 * i;
        t.style.left = 252;
        t.style.backgroundImage = "url(../Images/TypeIcons/" + moveData[move].type + ".png";
        document.getElementById("learnsetTMBox").appendChild(t);

        t = document.createElement("div");
        t.className = "TypeIcon";
        t.style.height = 28;
        t.style.top = 14 + 40 * i;
        t.style.left = 330;
        t.style.backgroundImage = "url(../Images/TypeIcons/" + moveData[move].category + ".png";
        document.getElementById("learnsetTMBox").appendChild(t);

        document.getElementById("learnsetTMBox").innerHTML += tms[move] + "<br>";
        
        let lv = move;
        let label = document.createElement("div");
        label.className = "learnsetMoveText";
        label.style.display = "inline-block";
        label.innerHTML = lv;
        label.style.top = 40 * i;
        document.getElementById("learnsetTMBox").appendChild(label);
    }
    document.getElementById("learnsetTMBox").parentElement.style.height = Math.max(poke.tms.length * 40 + 12, 40);
    document.getElementById("learnsetTMBox").append(document.createElement("br"));
}

type1Colors = {
    "Normal" : "#C6C6A7",
    "Grass" : "#A7DB8D",
    "Fire" : "#F5AC78",
    "Water" : "#9DB7F5",
    "Electric" : "#FAE078",
    "Ice" : "#BCE6E6",
    "Bug" : "#C6D16E",
    "Poison" : "#C183C1",
    "Flying" : "#C6B7F5",
    "Fighting" : "#D67873",
    "Rock" : "#D1C17D",
    "Ground" : "#EBD69D",
    "Psychic" : "#FA92B2",
    "Dark" : "#A29288",
    "Ghost" : "#A292BC",
    "Dragon" : "#A27DFA",
    "Steel" : "#D1D1E0",
};

type2Colors = {
    "Normal" : "#6D6D4E",
    "Grass" : "#4E8234",
    "Fire" : "#9C531F",
    "Water" : "#445E9C",
    "Electric" : "#A1871F",
    "Ice" : "#638D8D",
    "Bug" : "#6D7815",
    "Poison" : "#682A68",
    "Flying" : "#6D5E9C",
    "Fighting" : "#7D1F1A",
    "Rock" : "#786824",
    "Ground" : "#927D44",
    "Psychic" : "#A13959",
    "Dark" : "#49392F",
    "Ghost" : "#493963",
    "Dragon" : "#4924A1",
    "Steel" : "#787887",
};