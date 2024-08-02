function SetupCategories()
{
    let text = [
        "First Gym",
        "Second Gym",
        "Third Gym",
        "Fourth Gym",
        "Fifth Gym",
        "Sixth Gym",
        "Seventh Gym",
        "Eighth Gym",
        "Elite Four",
    ];
    for (let i = 0; i < 9; i++)
    {
        document.getElementById('header').appendChild(document.createElement("br"));
        let b = document.createElement("div");
        b.className = "CategoryButton";
        b.innerHTML = text[i];
        b.style.left = 128 + 192 * i;
        b.style.top = 92;
        b.style.zIndex = 8;
        document.getElementById('header').append(b);
    }
}