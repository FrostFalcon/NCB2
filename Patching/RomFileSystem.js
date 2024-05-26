const ARM9_PointerLocation = 0x20;
const ARM9_SizeLocation = 0x2C;
const ARM7_PointerLocation = 0x30;
const ARM7_SizeLocation = 0x3C;
const FNT_PointerLocation = 0x40;
const FNT_SizeLocation = 0x44;
const FAT_PointerLocation = 0x48;
const FAT_SizeLocation = 0x4C;
const Y9_PointerLocation = 0x50;
const Y9_SizeLocation = 0x54;
const Banner_PointerLocation = 0x68;
const End_PointerLocation = 0x1F0;

const Swav_PointerStart = 0x3D9C0;

const OverlayCount = 344;
const NARCCount = 308;
const MiscCount = 7;

class RomFileSystem
{
    constructor(bytes)
    {
        this.header = bytes.slice(0, this.ReadInt(bytes, ARM9_PointerLocation));
        this.arm9 = this.GetRange(bytes, ARM9_PointerLocation, ARM9_SizeLocation);
        this.arm7 = this.GetRange(bytes, ARM7_PointerLocation, ARM7_SizeLocation);
        this.fnt = this.GetRange(bytes, FNT_PointerLocation, FNT_SizeLocation);
        this.fat = this.GetRange(bytes, FAT_PointerLocation, FAT_SizeLocation);
        this.y9 = this.GetRange(bytes, Y9_PointerLocation, Y9_SizeLocation);
        this.banner = this.GetRange(bytes, Banner_PointerLocation, this.ReadInt(this.fat, OverlayCount * 8));

        this.overlays = [];
        this.narcs = [];
        this.misc = [];

        let start;
        let end;
        let pos = 0;
        for (let i = 0; i < OverlayCount; i++)
        {
            start = this.ReadInt(this.fat, pos);
            end = this.ReadInt(this.fat, pos + 4);
            this.overlays.push(bytes.slice(start, end));
            pos += 8;
        }

        start = this.ReadInt(this.fat, pos);
        end = this.ReadInt(this.fat, pos + 4);
        this.skb = bytes.slice(start, end);
        pos += 8;

        start = this.ReadInt(this.fat, pos);
        end = this.ReadInt(this.fat, pos + 4);
        this.soundStatus = bytes.slice(start, end);
        pos += 8;

        start = this.ReadInt(this.fat, pos);
        end = this.ReadInt(this.fat, pos + 4);
        this.soundData = bytes.slice(start, end);
        pos += 8;

        for (let i = 0; i < NARCCount; i++)
        {
            start = this.ReadInt(this.fat, pos);
            end = this.ReadInt(this.fat, pos + 4);
            this.narcs.push(bytes.slice(start, end));
            pos += 8;
        }

        while (pos < this.fat.length)
        {
            start = this.ReadInt(this.fat, pos);
            end = this.ReadInt(this.fat, pos + 4);
            this.misc.push(bytes.slice(start, end));
            pos += 8;
        }

        this.ender = bytes.slice(this.ReadInt(bytes, End_PointerLocation), bytes.length - 1);
    }

    GetRange(bytes, ptr, sizePtr)
    {
        let loc = this.ReadInt(bytes, ptr);
        let size = this.ReadInt(bytes, sizePtr);
        return bytes.slice(loc, loc + size);
    }

    ReadInt(bytes, pos)
    {
        return bytes[pos] + (bytes[pos + 1] << 8) + (bytes[pos + 2] << 16) + (bytes[pos + 3] << 24);
    }
}

function OpenRom()
{
    let file = document.querySelector("#fileSelect").files[0];
    if (file == null) return;
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) =>
        {
            let bytes = new Uint8Array(reader.result);
            let decoder = new TextDecoder("utf-8");
            let romTypeBytes = bytes.slice(0, 16);
            let romType = decoder.decode(romTypeBytes);
            if (!romType.startsWith("POKEMON B2") && !romType.startsWith("POKEMON W2")) return;
            let rom = new RomFileSystem(bytes);
            ReadPatchSections();
        };
}

function ReadPatchSections()
{
    
    read("NCB2Patches/NCB2v0.17.5.bw2Patch");
}