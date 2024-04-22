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
    constructor(id, name, baseid, formid, baseStats, oldStats, types, abilities, evYield, genderRatio, levelRate, levelUpMoves, tms, evolutionMethods, forms, locations)
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
        else if ([158, 159, 160].includes(id))
        {
            this.icon = "https://www.serebii.net/pokedex-sm/icon/" + LeadingZeros(id + 498) + ".png";
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
        this.forms = forms;
        this.locations = locations;
    }
}

class MoveData
{
    constructor(id, name, type, category, power, accuracy, pp, effects)
    {
        this.id = id;
        this.name = name;
        this.type = type;
        this.category = category;
        this.power = power;
        this.accuracy = accuracy;
        this.pp = pp;
        this.effects = effects;
    }
}

class EvolutionMethod
{
    constructor(from, to, method, parameter)
    {
        this.from = from;
        this.to = to;
        this.method = method;
        this.parameter = parameter;
    }
}