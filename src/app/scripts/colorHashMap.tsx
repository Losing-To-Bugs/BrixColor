
export function BuildLegoHashMap() {
let LegoColorTable = new Map();

//LegoColorTable.set(0x720E0F, "Dark Red");
//LegoColorTable.set(0x631314, "HO Dark Red");
//LegoColorTable.set(0xFEBABD, "Light Salmon");
//LegoColorTable.set(0xFECCCF, "Light Pink");
//LegoColorTable.set(0xBD7D85, "Modulex Violet");
//LegoColorTable.set(0xFF879C, "Duplo Pink");
//LegoColorTable.set(0xD60026, "Pearl Red");
//LegoColorTable.set(0xFC97AC, "Pink");
//LegoColorTable.set(0xFF0040, "Trans-Neon Red");
//LegoColorTable.set(0xFF698F, "Coral");
//LegoColorTable.set(0xF785B1, "Medium Dark Pink");
//LegoColorTable.set(0xDF6695, "Glitter Trans-Dark Pink");
//LegoColorTable.set(0xFE78B0, "Clikits Pink");
//LegoColorTable.set(0xCD6298, "Light Purple");
//LegoColorTable.set(0xE4ADC8, "Bright Pink");
//LegoColorTable.set(0xC870A0, "Dark Pink");
//LegoColorTable.set(0xCE1D9B, "Opal Trans-Dark Pink");
//LegoColorTable.set(0x923978, "Magenta");
//LegoColorTable.set(0xAA4D8E, "Chrome Pink");
//LegoColorTable.set(0x81007B, "Purple");
//LegoColorTable.set(0x845E84, "Sand Purple");
//LegoColorTable.set(0x8E5597, "Reddish Lilac");
//LegoColorTable.set(0x96709F, "Trans-Light Purple");
//LegoColorTable.set(0xAC78BA, "Medium Lavender");
//LegoColorTable.set(0x8320B7, "Opal Trans-Purple");
//LegoColorTable.set(0x4B0082, "Modulex Foil Violet");
//LegoColorTable.set(0xE1D5ED, "Lavender");
//LegoColorTable.set(0x5F27AA, "Duplo Dark Purple");
//LegoColorTable.set(0x8D73B3, "Trans-Medium Purple");
//LegoColorTable.set(0x4D4C52, "Modulex Black");
//LegoColorTable.set(0x3F3691, "Dark Purple");
//LegoColorTable.set(0x9391E4, "Medium Violet");
//LegoColorTable.set(0xA5A5CB, "Trans-Purple");
//LegoColorTable.set(0xC9CAE2, "Light Violet");
//LegoColorTable.set(0x9195CA, "Light Lilac");
//LegoColorTable.set(0x2032B0, "Dark Blue-Violet");
//LegoColorTable.set(0x6874CA, "Medium Bluish Violet");
//LegoColorTable.set(0x4C61DB, "Royal Blue");
//LegoColorTable.set(0x0020A0, "Trans-Dark Blue");
//LegoColorTable.set(0x4354A3, "Violet");
//LegoColorTable.set(0xAfB5C7, "Modulex Light Bluish Gray");
//LegoColorTable.set(0x0A1327, "Pearl Black");
//LegoColorTable.set(0x6074A1, "Sand Blue");
//LegoColorTable.set(0x7988A1, "Pearl Sand Blue");
//LegoColorTable.set(0x7396c8, "HO Medium Blue");
//LegoColorTable.set(0x0055BF, "Blue");
//LegoColorTable.set(0x5A93DB, "Medium Blue");
//LegoColorTable.set(0x0A3463, "Dark Blue");
//LegoColorTable.set(0xB4D4F7, "Trans-Light Royal Blue");
//LegoColorTable.set(0xCFE2F7, "Trans-Medium Blue");
//LegoColorTable.set(0x61AFFF, "Modulex Medium Blue");
//LegoColorTable.set(0x6e8aa6, "HO Sand Blue");
//LegoColorTable.set(0x9FC3E9, "Bright Light Blue");
//LegoColorTable.set(0x0057A6, "Modulex Tile Blue");
//LegoColorTable.set(0x6C96BF, "Chrome Blue");
//LegoColorTable.set(0x0059A3, "Pearl Blue");
//LegoColorTable.set(0xB4D2E3, "Light Blue");
//LegoColorTable.set(0xC1DFF0, "Trans-Very Lt Blue");
//LegoColorTable.set(0x3592C3, "Maersk Blue");
//LegoColorTable.set(0x5f7d8c, "HO Metallic Sand Blue");
//LegoColorTable.set(0x078BC9, "Dark Azure");
//LegoColorTable.set(0x1591cb, "HO Azure");
//LegoColorTable.set(0x0d4763, "HO Metallic Blue");
//LegoColorTable.set(0x68AECE, "Modulex Foil Light Blue");
//LegoColorTable.set(0x5b98b3, "HO Cyan");
//LegoColorTable.set(0x467083, "Modulex Teal Blue");
//LegoColorTable.set(0x7DBFDD, "Sky Blue");
//LegoColorTable.set(0x354e5a, "HO Blue-gray");
//LegoColorTable.set(0x3E95B6, "Duplo Medium Blue");
//LegoColorTable.set(0x009ECE, "Duplo Blue");
//LegoColorTable.set(0x039CBD, "Vintage Blue");
//LegoColorTable.set(0x5AC4DA, "Pastel Blue");
//LegoColorTable.set(0x36AEBF, "Medium Azure");
//LegoColorTable.set(0x55A5AF, "Light Turquoise");
//LegoColorTable.set(0x68BCC5, "Opal Trans-Light Blue");
//LegoColorTable.set(0x008F9B, "Dark Turquoise");
//LegoColorTable.set(0x10929d, "HO Dark Turquoise");
//LegoColorTable.set(0xAEEFEC, "Trans-Light Blue");
//LegoColorTable.set(0x27867E, "Modulex Aqua Green");
//LegoColorTable.set(0xADC3C0, "Light Aqua");
//LegoColorTable.set(0xB3D7D1, "Aqua");
//LegoColorTable.set(0x3FB69E, "Duplo Turquoise");
//LegoColorTable.set(0xa7dccf, "HO Dark Aqua");
//LegoColorTable.set(0xa3d1c0, "HO Light Aqua");
//LegoColorTable.set(0x184632, "Dark Green");
//LegoColorTable.set(0x3CB371, "Chrome Green");
//LegoColorTable.set(0x73DCA1, "Medium Green");
//LegoColorTable.set(0x008E3C, "Pearl Green");
//LegoColorTable.set(0xA0BCAC, "Sand Green");
//LegoColorTable.set(0x468A5F, "Duplo Medium Green");
//LegoColorTable.set(0x237841, "Green");
//LegoColorTable.set(0x94E5AB, "Trans-Light Green");
//LegoColorTable.set(0x60BA76, "Duplo Light Green");
//LegoColorTable.set(0x84B68D, "Trans-Green");
//LegoColorTable.set(0x006400, "Modulex Foil Dark Green");
//LegoColorTable.set(0x1E601E, "Vintage Green");
//LegoColorTable.set(0x78FC78, "Fabuland Lime");
//LegoColorTable.set(0x627a62, "HO Dark Sand Green");
//LegoColorTable.set(0x4B9F4A, "Bright Green");
//LegoColorTable.set(0xC2DAB8, "Light Green");
//LegoColorTable.set(0x7DB538, "Modulex Pastel Green");
//LegoColorTable.set(0xBDC6AD, "Glow In Dark Trans");
//LegoColorTable.set(0x879867, "HO Metallic Green");
//LegoColorTable.set(0x6C6E68, "Speckle DBGray-Silver");
//LegoColorTable.set(0x7C9051, "Modulex Olive Green");
//LegoColorTable.set(0xC9E788, "Trans-Light Bright Green");
//LegoColorTable.set(0x6A7944, "Pearl Lime");
//LegoColorTable.set(0x899B5F, "Metallic Green");
//LegoColorTable.set(0xC0F500, "Glitter Trans-Neon Green");
//LegoColorTable.set(0xBBE90B, "Lime");
//LegoColorTable.set(0xDFEEA5, "Yellowish Green");
//LegoColorTable.set(0xD9E4A7, "Light Lime");
//LegoColorTable.set(0xC7D23C, "Medium Lime");
//LegoColorTable.set(0xf5fab7, "HO Light Yellow");
//LegoColorTable.set(0xBDC618, "Modulex Lemon");
//LegoColorTable.set(0xb2b955, "HO Dark Lime");
//LegoColorTable.set(0x9B9A5A, "Olive Green");
//LegoColorTable.set(0xFFF230, "Duplo Lime");
//LegoColorTable.set(0xF8F184, "Trans-Neon Green");
//LegoColorTable.set(0xEBD800, "Vibrant Yellow");
//LegoColorTable.set(0xFFF03A, "Bright Light Yellow");
//LegoColorTable.set(0xf9f1c7, "HO Light Tan");
//LegoColorTable.set(0xBBA53D, "Chrome Gold");
//LegoColorTable.set(0xFBE890, "Trans-Fire Yellow");
//LegoColorTable.set(0xDAB000, "Trans-Neon Yellow");
//LegoColorTable.set(0xF3C305, "Vintage Yellow");
//LegoColorTable.set(0xFFCF0B, "Clikits Yellow");
//LegoColorTable.set(0xF5CD2F, "Trans-Yellow");
//LegoColorTable.set(0xF2CD37, "Yellow");
//LegoColorTable.set(0xFFE371, "Modulex Light Yellow");
//LegoColorTable.set(0xFBE696, "Light Yellow");
//LegoColorTable.set(0xb4a774, "HO Gold");
//LegoColorTable.set(0xcdc298, "HO Light Gold");
//LegoColorTable.set(0xFED557, "Modulex Ochre Yellow");
//LegoColorTable.set(0xDBAC34, "Metallic Gold");
//LegoColorTable.set(0x5C5030, "Modulex Terracotta");
//LegoColorTable.set(0xF8BB3D, "Bright Light Orange");
//LegoColorTable.set(0xE4CD9E, "Tan");
//LegoColorTable.set(0x958A73, "Dark Tan");
//LegoColorTable.set(0xAA7F2E, "Pearl Gold");
//LegoColorTable.set(0xDCBC81, "Pearl Light Gold");
//LegoColorTable.set(0xFFA70B, "Medium Orange");
//LegoColorTable.set(0xDEC69C, "Modulex Buff");
//LegoColorTable.set(0x352100, "Dark Brown");
//LegoColorTable.set(0xDD982E, "Curry");
//LegoColorTable.set(0xFFCB78, "Warm Yellowish Orange");
//LegoColorTable.set(0xF3C988, "Light Tan");
//LegoColorTable.set(0xB46A00, "Pearl Copper");
//LegoColorTable.set(0xFA9C1C, "Earth Orange");
//LegoColorTable.set(0xF9BA61, "Light Orange");
//LegoColorTable.set(0xAC8247, "Reddish Gold");
//LegoColorTable.set(0xF3CF9B, "Very Light Orange");
//LegoColorTable.set(0x645A4C, "Chrome Antique Brass");
//LegoColorTable.set(0xbb771b, "HO Earth Orange");
//LegoColorTable.set(0x907450, "Modulex Brown");
//LegoColorTable.set(0xF08F1C, "Trans-Orange");
//LegoColorTable.set(0xEF9121, "Fabuland Orange");
//LegoColorTable.set(0xCCA373, "Warm Tan");
//LegoColorTable.set(0xF6D7B3, "Light Nougat");
//LegoColorTable.set(0xFCB76D, "Trans-Flame Yellowish Orange");
//LegoColorTable.set(0xA95500, "Dark Orange");
//LegoColorTable.set(0xFE8A18, "Orange");
//LegoColorTable.set(0xF7AD63, "Modulex Light Orange");
//LegoColorTable.set(0xB48455, "Flat Dark Gold");
//LegoColorTable.set(0x737271, "Two-tone Silver");
//LegoColorTable.set(0xFF800D, "Trans-Neon Orange");
//LegoColorTable.set(0xFF8014, "Fabuland Red");
//LegoColorTable.set(0xAA7D55, "Medium Nougat");
//LegoColorTable.set(0xB67B50, "Fabuland Brown");
//LegoColorTable.set(0x755945, "Medium Brown");
//LegoColorTable.set(0xAB673A, "Two-tone Gold");
//LegoColorTable.set(0xD09168, "Nougat");
//LegoColorTable.set(0xF47B30, "Modulex Orange");
//LegoColorTable.set(0x915C3C, "Sienna Brown");
//LegoColorTable.set(0x583927, "Brown");
//LegoColorTable.set(0xAE7A59, "Copper");
//LegoColorTable.set(0x582A12, "Reddish Brown");
//LegoColorTable.set(0xCA4C0B, "Reddish Orange");
//LegoColorTable.set(0x7C503A, "Light Brown");
//LegoColorTable.set(0x965336, "HO Light Brown");
//LegoColorTable.set(0xAD6140, "Dark Nougat");
//LegoColorTable.set(0x764D3B, "Metallic Copper");
//LegoColorTable.set(0x57392C, "Pearl Brown");
//LegoColorTable.set(0x5E3F33, "Umber Brown");
//LegoColorTable.set(0x872B17, "Rust Orange");
//LegoColorTable.set(0xEE5434, "Bright Reddish Orange");
//LegoColorTable.set(0xF45C40, "Modulex Pink Red");
//LegoColorTable.set(0xCA1F08, "Vintage Red");
//LegoColorTable.set(0xF2705E, "Salmon");
//LegoColorTable.set(0x945148, "Two-tone Copper");
//LegoColorTable.set(0xC91A09, "Red");
//LegoColorTable.set(0xB31004, "Rust");
//LegoColorTable.set(0xB52C20, "Modulex Red");
//LegoColorTable.set(0xD67572, "Sand Red");
//LegoColorTable.set(0x8B0000, "Modulex Foil Red");
//LegoColorTable.set(0x330000, "Modulex Tile Brown");
//LegoColorTable.set(0xFFFFFF, "Milky White");
//LegoColorTable.set(0xFCFCFC, "Trans-Clear");
//LegoColorTable.set(0xF2F3F2, "Pearl White");
//LegoColorTable.set(0xc01111, "HO Medium Red");
//LegoColorTable.set(0xE6E3DA, "Very Light Gray");
//LegoColorTable.set(0xE6E3E0, "Very Light Bluish Gray");
//LegoColorTable.set(0xE0E0E0, "Chrome Silver");
//LegoColorTable.set(0xD4D5C9, "Glow In Dark Opaque");
//LegoColorTable.set(0xA5A9B4, "Metallic Silver");
//LegoColorTable.set(0xABADAC, "Pearl Very Light Gray");
//LegoColorTable.set(0xA0A5A9, "Light Bluish Gray");
//LegoColorTable.set(0x9CA3A8, "Pearl Light Gray");
//LegoColorTable.set(0x9BA19D, "Light Gray");
//LegoColorTable.set(0x898788, "Flat Silver");
//LegoColorTable.set(0xd06262, "HO Rose");
//LegoColorTable.set(0x6D6E5C, "Dark Gray");
//LegoColorTable.set(0x6C6E68, "Dark Bluish Gray");
//LegoColorTable.set(0x635F52, "Trans-Brown");
//LegoColorTable.set(0x635F52, "Trans-Black");
//LegoColorTable.set(0x595D60, "Modulex Charcoal Gray");
//LegoColorTable.set(0x575857, "Pearl Dark Gray");
//LegoColorTable.set(0x3E3C39, "Pearl Titanium	");
//LegoColorTable.set(0x1B2A34, "Chrome Black");
//LegoColorTable.set(0x6B5A5A, "Modulex Tile Gray");
//LegoColorTable.set(0x05131D, "Black");
//LegoColorTable.set(0xF4F4F4, "Modulex White");
//LegoColorTable.set(0xD9D9D9, "Glow in Dark White");
//LegoColorTable.set(0x9C9C9C, "Modulex Light Gray");
//LegoColorTable.set(0x616161, "HO Titanium");
//LegoColorTable.set(0x5e5e5e, "HO Metallic Dark Gray");
//LegoColorTable.set(0x, "");

//212-232
LegoColorTable.set(0xD4BA2A, "Yellow");
LegoColorTable.set(0xD5BA2A, "Yellow");
LegoColorTable.set(0xD6BA2A, "Yellow");
LegoColorTable.set(0xD7BA2A, "Yellow");
LegoColorTable.set(0xD8BA2A, "Yellow");
LegoColorTable.set(0xD9BA2A, "Yellow");
LegoColorTable.set(0xDABA2A, "Yellow");
LegoColorTable.set(0xDBBA2A, "Yellow");
LegoColorTable.set(0xDCBA2A, "Yellow");
LegoColorTable.set(0xDCBA2A, "Yellow");
LegoColorTable.set(0xDDBA2A, "Yellow");
LegoColorTable.set(0xDEBA2A, "Yellow");
LegoColorTable.set(0xDFBA2A, "Yellow");
LegoColorTable.set(0xE0BA2A, "Yellow");
LegoColorTable.set(0xE1BA2A, "Yellow");
LegoColorTable.set(0xE2BA2A, "Yellow");
LegoColorTable.set(0xE3BA23, "Yellow");
LegoColorTable.set(0xE4BA23, "Yellow");
LegoColorTable.set(0xE5BA23, "Yellow");
LegoColorTable.set(0xE6BA25, "Yellow");
LegoColorTable.set(0xE7BA23, "Yellow");
LegoColorTable.set(0xE8BA23, "Yellow");

//220-234
LegoColorTable.set(0xDC7724, "Orange");
LegoColorTable.set(0xDD7724, "Orange");
LegoColorTable.set(0xDE7724, "Orange");
LegoColorTable.set(0xDF7724, "Orange");
LegoColorTable.set(0xE07724, "Orange");
LegoColorTable.set(0xE17724, "Orange");
LegoColorTable.set(0xE27724, "Orange");
LegoColorTable.set(0xE37724, "Orange");
LegoColorTable.set(0xE47724, "Orange");
LegoColorTable.set(0xE57724, "Orange");
LegoColorTable.set(0xE67724, "Orange");
LegoColorTable.set(0xE77724, "Orange");
LegoColorTable.set(0xE87724, "Orange");
LegoColorTable.set(0xE97724, "Orange");
LegoColorTable.set(0xEA7724, "Orange");

//206-225
LegoColorTable.set(0xCE2312, "Red");
LegoColorTable.set(0xCF2312, "Red");
LegoColorTable.set(0xD02312, "Red");
LegoColorTable.set(0xD12312, "Red");
LegoColorTable.set(0xD22312, "Red");
LegoColorTable.set(0xD32312, "Red");
LegoColorTable.set(0xD42312, "Red");
LegoColorTable.set(0xD52312, "Red");
LegoColorTable.set(0xD62312, "Red");
LegoColorTable.set(0xD72312, "Red");
LegoColorTable.set(0xD82312, "Red");
LegoColorTable.set(0xD92312, "Red");
LegoColorTable.set(0xDA2312, "Red");
LegoColorTable.set(0xDB2312, "Red");
LegoColorTable.set(0xDC2312, "Red");
LegoColorTable.set(0xDD2312, "Red");
LegoColorTable.set(0xDE2312, "Red");
LegoColorTable.set(0xDF2310, "Red");
LegoColorTable.set(0xE02310, "Red");

LegoColorTable.set(0xE25497, "Pink");
LegoColorTable.set(0xE35497, "Pink");
LegoColorTable.set(0xE45497, "Pink");
LegoColorTable.set(0xE55497, "Pink");
LegoColorTable.set(0xE65497, "Pink");
LegoColorTable.set(0xE75497, "Pink");
LegoColorTable.set(0xE85497, "Pink");
LegoColorTable.set(0xE95497, "Pink");

LegoColorTable.set(0x206CCF, "Blue");
LegoColorTable.set(0x216CCF, "Blue");
LegoColorTable.set(0x226CCF, "Blue");
LegoColorTable.set(0x236CCF, "Blue");
LegoColorTable.set(0x246CCF, "Blue");
LegoColorTable.set(0x256CCF, "Blue");

LegoColorTable.set(0x298CF3, "Light Blue");
LegoColorTable.set(0x2A8CF3, "Light Blue");
LegoColorTable.set(0x2B8CF3, "Light Blue");
LegoColorTable.set(0x2C8CF3, "Light Blue");
LegoColorTable.set(0x2D8CF3, "Light Blue");
LegoColorTable.set(0x2E8CF3, "Light Blue");

LegoColorTable.set(0xD7D695, "Yellow-Green");
LegoColorTable.set(0xD8D695, "Yellow-Green");
LegoColorTable.set(0xD9D695, "Yellow-Green");
LegoColorTable.set(0xDAD695, "Yellow-Green");
LegoColorTable.set(0xDBD695, "Yellow-Green");
LegoColorTable.set(0xDCD695, "Yellow-Green");
LegoColorTable.set(0xDDD695, "Yellow-Green");
LegoColorTable.set(0xDED695, "Yellow-Green");
LegoColorTable.set(0xDFD695, "Yellow-Green");

LegoColorTable.set(0x4BBB53, "Green");
LegoColorTable.set(0x4CBB53, "Green");
LegoColorTable.set(0x4DBB53, "Green");
LegoColorTable.set(0x4EBB53, "Green");
LegoColorTable.set(0x4FBB53, "Green");
LegoColorTable.set(0x50BB53, "Green");
LegoColorTable.set(0x51BB53, "Green");
LegoColorTable.set(0x52BB53, "Green");
LegoColorTable.set(0x53BB53, "Green");
LegoColorTable.set(0x54BB53, "Green");
LegoColorTable.set(0x55BB53, "Green");

LegoColorTable.set(0xAAD644, "Light-Green");
LegoColorTable.set(0xABD644, "Light-Green");
LegoColorTable.set(0xACD644, "Light-Green");
LegoColorTable.set(0xADD644, "Light-Green");
LegoColorTable.set(0xAED644, "Light-Green");
LegoColorTable.set(0xAFD644, "Light-Green");
LegoColorTable.set(0xB0D644, "Light-Green");
LegoColorTable.set(0xB1D644, "Light-Green");
LegoColorTable.set(0xB2D644, "Light-Green");
LegoColorTable.set(0xB3D644, "Light-Green");
LegoColorTable.set(0xB4D644, "Light-Green");
LegoColorTable.set(0xB5D644, "Light-Green");
LegoColorTable.set(0xB6D644, "Light-Green");

LegoColorTable.set(0x89A134, "Lime Green");
LegoColorTable.set(0x8AA134, "Lime Green");
LegoColorTable.set(0x8BA134, "Lime Green");
LegoColorTable.set(0x8CA134, "Lime Green");
LegoColorTable.set(0x8DA134, "Lime Green");

LegoColorTable.set(0x7B3F1C, "Red-Brown");
LegoColorTable.set(0x7C3F1C, "Red-Brown");
LegoColorTable.set(0x7D3F1C, "Red-Brown");
LegoColorTable.set(0x7E3F1C, "Red-Brown");
LegoColorTable.set(0x7F3F1C, "Red-Brown");

LegoColorTable.set(0xDD874C, "Tan");
LegoColorTable.set(0xDE874C, "Tan");
LegoColorTable.set(0xDF874C, "Tan");
LegoColorTable.set(0xE0874C, "Tan");
LegoColorTable.set(0xE1874C, "Tan");
LegoColorTable.set(0xE2874C, "Tan");
LegoColorTable.set(0xE3874C, "Tan");
LegoColorTable.set(0xE4874C, "Tan");

LegoColorTable.set(0xDEDCD9, "White");
LegoColorTable.set(0xDFDCD9, "White");
LegoColorTable.set(0xE0DCD9, "White");
LegoColorTable.set(0xE1DCD9, "White");
LegoColorTable.set(0xE2DCD9, "White");
LegoColorTable.set(0xE3DCDA, "White");
LegoColorTable.set(0xE4DCD9, "White");
LegoColorTable.set(0xE5DEDC, "White");
LegoColorTable.set(0xE6DCD9, "White");

LegoColorTable.set(0xE4DB4B, "Light-Yellow");
LegoColorTable.set(0xE5DB4B, "Light-Yellow");
LegoColorTable.set(0xE6DB4B, "Light-Yellow");
LegoColorTable.set(0xE7DB4B, "Light-Yellow");
LegoColorTable.set(0xE8DB4B, "Light-Yellow");
LegoColorTable.set(0xE9DB4B, "Light-Yellow");
LegoColorTable.set(0xEADB4B, "Light-Yellow");
LegoColorTable.set(0xEBDB4B, "Light-Yellow");

LegoColorTable.set(0xE497B7, "Light-Pink");
LegoColorTable.set(0xE597B7, "Light-Pink");
LegoColorTable.set(0xE697B7, "Light-Pink");
LegoColorTable.set(0xE797B7, "Light-Pink");
LegoColorTable.set(0xE897B7, "Light-Pink");
LegoColorTable.set(0xE997B7, "Light-Pink");
LegoColorTable.set(0xEA97B7, "Light-Pink");

LegoColorTable.set(0xA07ACC, "Purple");
LegoColorTable.set(0xA17ACC, "Purple");
LegoColorTable.set(0xA27ACC, "Purple");
LegoColorTable.set(0xA37ACC, "Purple");
LegoColorTable.set(0xA47ACC, "Purple");
LegoColorTable.set(0xA57ACC, "Purple");
LegoColorTable.set(0xA67ACC, "Purple");
LegoColorTable.set(0xA77ACC, "Purple");
LegoColorTable.set(0xA87ACC, "Purple");
LegoColorTable.set(0xA97ACC, "Purple");

LegoColorTable.set(0x66A3D8, "Medium-Blue");
LegoColorTable.set(0x67A3D8, "Medium-Blue");
LegoColorTable.set(0x68A3D8, "Medium-Blue");
LegoColorTable.set(0x69A3D8, "Medium-Blue");
LegoColorTable.set(0x6AA3D8, "Medium-Blue");

LegoColorTable.set(0x53BFDE, "Blue-Green");
LegoColorTable.set(0x54BFDE, "Blue-Green");
LegoColorTable.set(0x55BFDE, "Blue-Green");
LegoColorTable.set(0x56BFDE, "Blue-Green");
LegoColorTable.set(0x57BFDE, "Blue-Green");
LegoColorTable.set(0x58BFDE, "Blue-Green");
LegoColorTable.set(0x59BFDE, "Blue-Green");
LegoColorTable.set(0x5ABFDE, "Blue-Green");

LegoColorTable.set(0xC8D6CD, "Light-Blue-Green");
LegoColorTable.set(0xC9D6CD, "Light-Blue-Green");
LegoColorTable.set(0xCAD6CD, "Light-Blue-Green");
LegoColorTable.set(0xCBD6CD, "Light-Blue-Green");
LegoColorTable.set(0xCCD6CD, "Light-Blue-Green");
LegoColorTable.set(0xCDD6CD, "Light-Blue-Green");
LegoColorTable.set(0xCED6CD, "Light-Blue-Green");
LegoColorTable.set(0xCFD6CD, "Light-Blue-Green");
LegoColorTable.set(0xD0D6CD, "Light-Blue-Green");

LegoColorTable.set(0xD2C085, "Light-Tan");
LegoColorTable.set(0xD3C085, "Light-Tan");
LegoColorTable.set(0xD4C085, "Light-Tan");
LegoColorTable.set(0xD5C085, "Light-Tan");
LegoColorTable.set(0xD6C085, "Light-Tan");
LegoColorTable.set(0xD7C085, "Light-Tan");
LegoColorTable.set(0xD8C085, "Light-Tan");
LegoColorTable.set(0xD9C085, "Light-Tan");
LegoColorTable.set(0xDAC085, "Light-Tan");

LegoColorTable.set(0xE9B380, "Peach");
LegoColorTable.set(0xEAB380, "Peach");
LegoColorTable.set(0xEBB380, "Peach");
LegoColorTable.set(0xECB380, "Peach");
LegoColorTable.set(0xEDB380, "Peach");
LegoColorTable.set(0xEEB380, "Peach");

LegoColorTable.set(0xE39702, "Yellow-Orange");
LegoColorTable.set(0xE39702, "Yellow-Orange");
LegoColorTable.set(0xE49702, "Yellow-Orange");
LegoColorTable.set(0xE59702, "Yellow-Orange");
LegoColorTable.set(0xE69702, "Yellow-Orange");
LegoColorTable.set(0xE79702, "Yellow-Orange");
LegoColorTable.set(0xE89702, "Yellow-Orange");
LegoColorTable.set(0xE99702, "Yellow-Orange");

LegoColorTable.set(0xC92283, "Dark-Pink");
LegoColorTable.set(0xCA2283, "Dark-Pink");
LegoColorTable.set(0xCB2283, "Dark-Pink");
LegoColorTable.set(0xCC2283, "Dark-Pink");
LegoColorTable.set(0xCD2283, "Dark-Pink");

LegoColorTable.set(0xBFA3D3, "Light-Purple");
LegoColorTable.set(0xC0A3D3, "Light-Purple");
LegoColorTable.set(0xC1A3D3, "Light-Purple");
LegoColorTable.set(0xC2A3D3, "Light-Purple");
LegoColorTable.set(0xC3A3D3, "Light-Purple");
LegoColorTable.set(0xC4A3D3, "Light-Purple");
LegoColorTable.set(0xC5A3D3, "Light-Purple");

LegoColorTable.set(0x79B6E2, "Sky-Blue");
LegoColorTable.set(0x7AB6E2, "Sky-Blue");
LegoColorTable.set(0x7BB6E2, "Sky-Blue");
LegoColorTable.set(0x7CB6E2, "Sky-Blue");
LegoColorTable.set(0x7DB6E2, "Sky-Blue");
LegoColorTable.set(0x7EB6E2, "Sky-Blue");
LegoColorTable.set(0x7FB6E2, "Sky-Blue");
LegoColorTable.set(0x80B6E2, "Sky-Blue");

LegoColorTable.set(0x83A880, "Grey-Green");
LegoColorTable.set(0x84A880, "Grey-Green");
LegoColorTable.set(0x85A880, "Grey-Green");
LegoColorTable.set(0x86A880, "Grey-Green");
LegoColorTable.set(0x87A880, "Grey-Green");

LegoColorTable.set(0xAB9062, "Yellow-Brown");
LegoColorTable.set(0xAC9062, "Yellow-Brown");
LegoColorTable.set(0xAD9062, "Yellow-Brown");
LegoColorTable.set(0xAE9062, "Yellow-Brown");
LegoColorTable.set(0xAF9062, "Yellow-Brown");
LegoColorTable.set(0xB09062, "Yellow-Brown");

//172-178
LegoColorTable.set(0xA9ABA4, "Grey");
LegoColorTable.set(0xAAABA4, "Grey");
LegoColorTable.set(0xABABA4, "Grey");
LegoColorTable.set(0xACABA4, "Grey");
LegoColorTable.set(0xADABA4, "Grey");
LegoColorTable.set(0xAEABA4, "Grey");
LegoColorTable.set(0xAFABA4, "Grey");
LegoColorTable.set(0xB0ABA4, "Grey");
LegoColorTable.set(0xB1ABA4, "Grey");
LegoColorTable.set(0xB2ABA4, "Grey");

LegoColorTable.set(0x575850, "Dark-Grey");
LegoColorTable.set(0x585850, "Dark-Grey");
LegoColorTable.set(0x595850, "Dark-Grey");
LegoColorTable.set(0x5A5850, "Dark-Grey");
LegoColorTable.set(0x5B5850, "Dark-Grey");
LegoColorTable.set(0x5C5850, "Dark-Grey");
LegoColorTable.set(0x5D5850, "Dark-Grey");

LegoColorTable.set(0x4B2EB3, "Dark-Purple");
LegoColorTable.set(0x4C2EB3, "Dark-Purple");
LegoColorTable.set(0x4D2EB3, "Dark-Purple");
LegoColorTable.set(0x4E2EB3, "Dark-Purple");
LegoColorTable.set(0x4F2EB3, "Dark-Purple");
LegoColorTable.set(0x502EB3, "Dark-Purple");

LegoColorTable.set(0x7C99AA, "Grey-Blue");
LegoColorTable.set(0x7D99AA, "Grey-Blue");
LegoColorTable.set(0x7E99AA, "Grey-Blue");
LegoColorTable.set(0x7F99AA, "Grey-Blue");
LegoColorTable.set(0x8099AA, "Grey-Blue");
LegoColorTable.set(0x8199AA, "Grey-Blue");
LegoColorTable.set(0x8299AA, "Grey-Blue");
LegoColorTable.set(0x8399AA, "Grey-Blue");

LegoColorTable.set(0x45AF45, "Dark-Green");
LegoColorTable.set(0x46AF45, "Dark-Green");
LegoColorTable.set(0x47AF45, "Dark-Green");
LegoColorTable.set(0x48AF45, "Dark-Green");
LegoColorTable.set(0x49AF45, "Dark-Green");
LegoColorTable.set(0x4AAF45, "Dark-Green");
LegoColorTable.set(0x4BAF45, "Dark-Green");

LegoColorTable.set(0x989A57, "Brown-Green");
LegoColorTable.set(0x999A57, "Brown-Green");
LegoColorTable.set(0x9A9A57, "Brown-Green");
LegoColorTable.set(0x9B9A57, "Brown-Green");
LegoColorTable.set(0x9C9A57, "Brown-Green");
LegoColorTable.set(0x9D9A57, "Brown-Green");
LegoColorTable.set(0x9E9A57, "Brown-Green");

LegoColorTable.set(0xC18345, "Light-Brown");
LegoColorTable.set(0xC28345, "Light-Brown");
LegoColorTable.set(0xC38345, "Light-Brown");
LegoColorTable.set(0xC48345, "Light-Brown");
LegoColorTable.set(0xC58345, "Light-Brown");
LegoColorTable.set(0xC68345, "Light-Brown");
LegoColorTable.set(0xC78345, "Light-Brown");

LegoColorTable.set(0xBB5C20, "Brown");
LegoColorTable.set(0xBC5C20, "Brown");
LegoColorTable.set(0xBD5C20, "Brown");
LegoColorTable.set(0xBE5C20, "Brown");
LegoColorTable.set(0xBF5C20, "Brown");
LegoColorTable.set(0xC05C20, "Brown");
LegoColorTable.set(0xC15C20, "Brown");

LegoColorTable.set(0x7E807B, "Medium-Grey");
LegoColorTable.set(0x7F807B, "Medium-Grey");
LegoColorTable.set(0x80807B, "Medium-Grey");
LegoColorTable.set(0x81807B, "Medium-Grey");
LegoColorTable.set(0x82807B, "Medium-Grey");
LegoColorTable.set(0x83807B, "Medium-Grey");

//196-205
LegoColorTable.set(0xC49826, "Gold");
LegoColorTable.set(0xC59826, "Gold");
LegoColorTable.set(0xC69826, "Gold");
LegoColorTable.set(0xC79826, "Gold");
LegoColorTable.set(0xC89826, "Gold");
LegoColorTable.set(0xC99826, "Gold");
LegoColorTable.set(0xCA9826, "Gold");
LegoColorTable.set(0xCB9826, "Gold");
LegoColorTable.set(0xCC9826, "Gold");
LegoColorTable.set(0xCD9826, "Gold");

LegoColorTable.set(0x942B2B, "Dark-Red");
LegoColorTable.set(0x952B2B, "Dark-Red");
LegoColorTable.set(0x962B2B, "Dark-Red");
LegoColorTable.set(0x972B2B, "Dark-Red");
LegoColorTable.set(0x982B2B, "Dark-Red");
LegoColorTable.set(0x992B2B, "Dark-Red");

LegoColorTable.set(0x224C7C, "Dark-Blue");
LegoColorTable.set(0x234C7C, "Dark-Blue");
LegoColorTable.set(0x244C7C, "Dark-Blue");
LegoColorTable.set(0x254C7C, "Dark-Blue");
LegoColorTable.set(0x264C7C, "Dark-Blue");
LegoColorTable.set(0x274C7C, "Dark-Blue");
LegoColorTable.set(0x284C7C, "Dark-Blue");
LegoColorTable.set(0x294C7C, "Dark-Blue");
LegoColorTable.set(0x2A4C7C, "Dark-Blue");
LegoColorTable.set(0x2B4C7C, "Dark-Blue");

LegoColorTable.set(0x306644, "Dark-Green");
LegoColorTable.set(0x316644, "Dark-Green");
LegoColorTable.set(0x326644, "Dark-Green");
LegoColorTable.set(0x336644, "Dark-Green");
LegoColorTable.set(0x346644, "Dark-Green");
LegoColorTable.set(0x356644, "Dark-Green");
LegoColorTable.set(0x366644, "Dark-Green");

LegoColorTable.set(0x49312B, "Dark-Brown");
LegoColorTable.set(0x4A312B, "Dark-Brown");
LegoColorTable.set(0x4B312B, "Dark-Brown");
LegoColorTable.set(0x4C312B, "Dark-Brown");
LegoColorTable.set(0x4D312B, "Dark-Brown");
LegoColorTable.set(0x4E312B, "Dark-Brown");
LegoColorTable.set(0x4F312B, "Dark-Brown");

LegoColorTable.set(0x1E2627, "Black");
LegoColorTable.set(0x1F2627, "Black");
LegoColorTable.set(0x202627, "Black");
LegoColorTable.set(0x212627, "Black");
LegoColorTable.set(0x222627, "Black");
LegoColorTable.set(0x232627, "Black");
LegoColorTable.set(0x242627, "Black");
LegoColorTable.set(0x252627, "Black");
LegoColorTable.set(0x262627, "Black");

LegoColorTable.set(0x696D64, "Black");
LegoColorTable.set(0x6A6D64, "Black");
LegoColorTable.set(0x6B6D64, "Black");
LegoColorTable.set(0x6C6D64, "Black");
LegoColorTable.set(0x6D6D64, "Black");
LegoColorTable.set(0x6E6D64, "Black");
LegoColorTable.set(0x6F6D64, "Black");
LegoColorTable.set(0x706D64, "Black");
LegoColorTable.set(0x716D64, "Black");
LegoColorTable.set(0x726D64, "Black");
LegoColorTable.set(0x736D64, "Black");


LegoColorTable.set(0x979D9B, "Silver-Grey");
LegoColorTable.set(0x989D9B, "Silver-Grey");
LegoColorTable.set(0x999D9B, "Silver-Grey");
LegoColorTable.set(0x9A9D9B, "Silver-Grey");
LegoColorTable.set(0x9B9D9B, "Silver-Grey");
LegoColorTable.set(0x9C9D9B, "Silver-Grey");


return LegoColorTable;
}

export function buildLegoColorTree(LegoColorTable) {
const legoColors = LegoColorTable.keys();
const sortByRed = Array.from(legoColors);

sortByRed.sort((a : number, b : number) => {
    return (a & 0xFF0000) - (b & 0xFF0000);
})

let ColorTree = new Array;

let lastColor = -1;
let Count = -1;
sortByRed.forEach((color : number) => {
    if(lastColor !== (color  & 0xFF0000)){
        Count++;
        ColorTree[Count] = new Array;
        ColorTree[Count].push(color & 0xFF0000);
        lastColor = (color & 0xFF0000)
    }
ColorTree[Count].push(color);
});

ColorTree.forEach((arr) =>{
    let firstElement = arr.shift();
    arr.sort((a : number,b : number) => {
        return (a & 0x00FF00) - (b & 0x00FF00);
    })
    arr.unshift(firstElement);
})

let original_length = -1;

ColorTree.forEach((arr) => {
    let redIdentifier = arr.shift();
    lastColor = -1;
    original_length = arr.length;
    Count = original_length - 1;
    for(let i = 0; i < original_length; i++){
        if(lastColor !== (arr[i] & 0x00FF00)){
            Count++;
            arr[Count] = new Array;
            arr[Count].push(arr[i] & 0x00FF00);
            lastColor = (arr[i] & 0x00FF00)
        }
    arr[Count].push(arr[i]);
    }
    arr.splice(0,original_length);
    arr.unshift(redIdentifier);
})

return ColorTree;
}

export function getLegoColorName(red,green,blue,LegoColorTable,ColorTree){

let r = Math.max(Math.floor(red), 0);
let g = Math.max(Math.floor(green), 0);
let b = Math.max(Math.floor(blue), 0);

let userColor = (((r << 8) | g) << 8) | b;

let diff = Number.MAX_SAFE_INTEGER;
let currentDiff = -1;
let closestRed = -1;
for(let i = 0; i < ColorTree.length; i++){
    currentDiff = Math.abs((userColor & 0xFF0000) - ColorTree[i][0]); 
    if(currentDiff < diff){
        diff = currentDiff;
        closestRed = i;
    }
}
diff = Number.MAX_SAFE_INTEGER;
let closestGreen = -1;
for(let i = 1; i < ColorTree[closestRed].length; i++){
    currentDiff = Math.abs((userColor & 0x00FF00) - ColorTree[closestRed][i][0]);
    if(currentDiff < diff){
        diff = currentDiff;
        closestGreen = i;
    }
}
diff = Number.MAX_SAFE_INTEGER;
let closestLegoColor = -1;
for(let i = 1; i < ColorTree[closestRed][closestGreen].length; i++){
    currentDiff = Math.abs((userColor & 0x0000FF) - (ColorTree[closestRed][closestGreen][i] & 0x0000FF ));
    if(currentDiff < diff){
        diff = currentDiff;
        closestLegoColor = ColorTree[closestRed][closestGreen][i];
    }
}


return LegoColorTable.get(closestLegoColor);
}
