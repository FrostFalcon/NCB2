type1Dropdowns = [];

function SetupTeamBuilder()
{
    for (let i = 0; i < 18; i++)
    {
        let dropdown = document.createElement("select");
        dropdown.className = "BlackDropdown";
        dropdown.style.zIndex = 20;
        dropdown.style.left = Math.floor(i / 6) == 0 ? 40 : Math.floor(i / 6) == 1 ? 220 : 440;
        dropdown.style.top = 190 + 72 * (i % 6);
        dropdown.style.font = "16px monospace";
        dropdown.innerHTML = "";
        if (Math.floor(i / 6) == 2)
        {
            dropdown.style.width = 160;
            dropdown.innerHTML += "<option value='1'>None</option>";
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
        document.getElementById('header').append(dropdown);
        type1Dropdowns.push(dropdown);
    }
}