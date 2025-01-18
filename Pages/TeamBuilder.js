typeDropdowns = [];

function SetupTeamBuilder()
{
    for (let i = 0; i < 18; i++)
    {
        let dropdown = document.createElement("select");
        dropdown.className = "BlackDropdown";
        dropdown.style.zIndex = 20;
        dropdown.style.left = Math.floor(i / 6) == 0 ? 40 : Math.floor(i / 6) == 1 ? 220 : 440;
        dropdown.style.top = 262 + 72 * (i % 6);
        dropdown.style.font = "16px monospace";
        dropdown.innerHTML = "";
        if (Math.floor(i / 6) == 2)
        {
            dropdown.style.width = 160;
            dropdown.innerHTML += "<option value='0'>None</option>";
            dropdown.innerHTML += "<option value='1'>Flash Fire</option>";
            dropdown.innerHTML += "<option value='2'>Water Absorb</option>";
            dropdown.innerHTML += "<option value='3'>Sap Sipper</option>";
            dropdown.innerHTML += "<option value='4'>Volt Absorb</option>";
            dropdown.innerHTML += "<option value='5'>Levitate</option>";
            dropdown.innerHTML += "<option value='6'>Thick Fat</option>";
            dropdown.innerHTML += "<option value='7'>Heat Proof</option>";
        }
        else
        {
            dropdown.innerHTML += "<option value='0'>None</option>";
            dropdown.innerHTML += "<option value='1'>Normal</option>";
            dropdown.innerHTML += "<option value='2'>Fire</option>";
            dropdown.innerHTML += "<option value='3'>Water</option>";
            dropdown.innerHTML += "<option value='4'>Grass</option>";
            dropdown.innerHTML += "<option value='5'>Electric</option>";
            dropdown.innerHTML += "<option value='6'>Ice</option>";
            dropdown.innerHTML += "<option value='7'>Poison</option>";
            dropdown.innerHTML += "<option value='8'>Bug</option>";
            dropdown.innerHTML += "<option value='9'>Rock</option>";
            dropdown.innerHTML += "<option value='10'>Ground</option>";
            dropdown.innerHTML += "<option value='11'>Fighting</option>";
            dropdown.innerHTML += "<option value='12'>Flying</option>";
            dropdown.innerHTML += "<option value='13'>Psychic</option>";
            dropdown.innerHTML += "<option value='14'>Dark</option>";
            dropdown.innerHTML += "<option value='15'>Ghost</option>";
            dropdown.innerHTML += "<option value='16'>Dragon</option>";
            dropdown.innerHTML += "<option value='17'>Steel</option>";
            dropdown.innerHTML += "<option value='18'>Fairy</option>";
        }

        dropdown.onchange = e =>
        {
            CalculateMatchups();
        };

        document.getElementById('header').append(dropdown);
        typeDropdowns.push(dropdown);
    }
}

typeChart =
[ 
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //None
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1], //Normal
    [1, 0.5, 2, 0.5, 1, 0.5, 1, 0.5, 2, 2, 1, 1, 1, 1, 1, 1, 0.5, 0.5], //Fire
    [1, 0.5, 0.5, 2, 2, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1], //Water
    [1, 2, 0.5, 0.5, 0.5, 2, 2, 2, 1, 0.5, 1, 2, 1, 1, 1, 1, 1, 1], //Grass
    [1, 1, 1, 1, 0.5, 1, 1, 1, 1, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 1], //Electric
    [1, 2, 0.5, 1, 1, 0.5, 1, 1, 2, 1, 2, 0.5, 1, 1, 1, 0.5, 2, 1], //Ice
    [1, 1, 1, 0.5, 1, 1, 0.5, 0.5, 1, 2, 0.5, 1, 2, 1, 1, 1, 1, 0.5], //Poison
    [1, 2, 1, 0.5, 1, 1, 1, 1, 2, 0.5, 0.5, 2, 1, 1, 1, 1, 1, 0.5], //Bug
    [0.5, 0.5, 2, 2, 1, 1, 0.5, 1, 1, 2, 2, 0.5, 1, 1, 1, 1, 2, 1], //Rock
    [1, 1, 2, 2, 0, 2, 0.5, 1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1], //Ground
    [1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 2, 2, 0.5, 1, 1, 1, 2], //Fighting
    [1, 1, 1, 0.5, 2, 2, 1, 0.5, 2, 0, 0.5, 1, 1, 1, 1, 1, 1, 1], //Flying
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 1, 0.5, 2, 2, 1, 1, 1], //Psychic
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0, 0.5, 0.5, 1, 1, 2], //Dark
    [0, 1, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 1, 1, 2, 2, 1, 1, 1], //Ghost
    [1, 0.5, 0.5, 0.5, 0.5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2], //Dragon
    [0.5, 2, 1, 0.5, 1, 0.5, 0, 0.5, 0.5, 2, 2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], //Steel
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 1, 1, 0.5, 1, 0, 2, 1], //Fairy
];

typeIcons =
[
    "url(../Images/TypeIcons/Normal.png)",
    "url(../Images/TypeIcons/Fire.png)",
    "url(../Images/TypeIcons/Water.png)",
    "url(../Images/TypeIcons/Grass.png)",
    "url(../Images/TypeIcons/Electric.png)",
    "url(../Images/TypeIcons/Ice.png)",
    "url(../Images/TypeIcons/Poison.png)",
    "url(../Images/TypeIcons/Bug.png)",
    "url(../Images/TypeIcons/Rock.png)",
    "url(../Images/TypeIcons/Ground.png)",
    "url(../Images/TypeIcons/Fighting.png)",
    "url(../Images/TypeIcons/Flying.png)",
    "url(../Images/TypeIcons/Psychic.png)",
    "url(../Images/TypeIcons/Dark.png)",
    "url(../Images/TypeIcons/Ghost.png)",
    "url(../Images/TypeIcons/Dragon.png)",
    "url(../Images/TypeIcons/Steel.png)",
    "url(../Images/TypeIcons/Fairy.png)",
];

function CalculateMatchups()
{
    document.getElementById('matchupIcons').innerHTML = "";
    for (let i = 0; i < 6; i++)
    {
        let x = 0;
        let x2 = 0;
        let weaks = [];
        let resists = [];
        for (let t = 0; t < 18; t++)
        {
            let base = typeChart[typeDropdowns[i].value][t] * typeChart[typeDropdowns[i + 6].value][t];

            //Abilities
            if (typeDropdowns[i + 12].value == 1 && t == 1) base = 0;
            if (typeDropdowns[i + 12].value == 2 && t == 2) base = 0;
            if (typeDropdowns[i + 12].value == 3 && t == 3) base = 0;
            if (typeDropdowns[i + 12].value == 4 && t == 4) base = 0;
            if (typeDropdowns[i + 12].value == 5 && t == 9) base = 0;
            if (typeDropdowns[i + 12].value == 6 && (t == 1 || t == 5)) base /= 2;
            if (typeDropdowns[i + 12].value == 7 && t == 1) base /= 2;

            if (base > 1) weaks.push(t);
            if (base < 1) resists.push(t);
        }
        for (let t in weaks)
        {
            let icon = document.createElement("div");
            icon.className = "TypeIcon";
            icon.style.zIndex = 20;
            icon.style.left = x + 796;
            icon.style.top = (weaks.length <= 5 ? 262 : 248 + 32 * Math.floor(t / 5)) + 72 * i;
            icon.style.backgroundImage = typeIcons[weaks[t]];
            icon.innerHTML = "";
            document.getElementById('matchupIcons').append(icon);
            x += 72;
            if (t == 4) x = 0;
        }
        for (let t in resists)
        {
            let icon = document.createElement("div");
            icon.className = "TypeIcon";
            icon.style.zIndex = 20;
            icon.style.left = x2 + 1256;
            icon.style.top = (resists.length <= 7 ? 262 : 248 + 32 * Math.floor(t / 8)) + 72 * i;
            icon.style.backgroundImage = typeIcons[resists[t]];
            icon.innerHTML = "";
            document.getElementById('matchupIcons').append(icon);
            x2 += 72;
            if (t == 7) x2 = 0;
        }
    }
}