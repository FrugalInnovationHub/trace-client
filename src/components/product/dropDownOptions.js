const dropdownOptions = [
{text: "Beds, Stryker MPS, w/o Mattress", value: "700017"},
{text: "SUPPORTS, KNEE, PATELLA BRACE", value: "700026"},
{text: "SURGICAL PACKS, STD LEG FRACTURE PLUS II PACK", value: "700044"},
{text: "Orthopedic, compression lag screws, assorted", value: "700065"},
{text: "Beds, Electric, Used, w/o Mattress", value: "700066"},
{text: "Syringes, 10cc, Luer LockIN", value: "700068"},
{text: "Hemodialysis Tubing Sets, Arterial-Venous", value: "700069"},
{text: "Beds, Electric, Homecare, w/Mat", value: "700072"},
{text: "Stretchers, Hydraulic with Mat.", value: "700073"},
{text: "ORTHOPEDIC, HIP SAVER W/ TAILBONE PROTECTOR", value: "700076"},
{text: "Urinary Collection Bags, 2000cc", value: "700077"},
{text: "Urinary Drainage Units, 2000cc w/Anti-Reflux Valve", value: "700078"},
{text: "Stools, Shower", value: "700084"},
{text: "PILLOWS, CERVICAL PILLOW", value: "700085"},
{text: "Scales, Portable Digital", value: "700088"},
{text: "Tubing, Latex Extension Tube, 9/32 x 18in.", value: "700089"},
{text: "TRASH CAN LINERS, 20-30 GAL", value: "700090"},
{text: "IV Extension Sets, Primary Plumset, 15ml", value: "700092"},
{text: "LANCETS, 21G x 1.8MM", value: "700093"},
{text: "CLEANING SUPPLIES, DAMP MOP CLEANER,64OZ", value: "700094"},
{text: "Airways, Oropharyngeal, Berman, 4cm", value: "700095"},
{text: "Phototherapy, Biliblanket Disposable Cover.(10 PK)", value: "700097"},
{text: "Ovens, Convection Toaster Oven", value: "700098"},
{text: "Protectors, Surge & Battery Back-up", value: "700101"},
{text: "Swabs, Oral Care, Lemon-Glycerine Oral Swabstick", value: "700102"},
{text: "STERILIZATION PACKAGING, SELF SEAL POUCH,12x15 1/2", value: "700103"},
{text: "Gauze Dressings, Tracheostomy Drain, 4in x 4in", value: "700105"},
{text: "Tracheostomy Kits", value: "700106"},
{text: "Breathing Circuits, Anesthesia, 60in Adult, filter", value: "700107"},
{text: "Breathing Circuits, Anesthesia, Breathing Tubing", value: "700108"},
{text: "Orthopedic, Cannulated Screw Set, Incomplete,4.5mm", value: "700111"},
{text: "SPLINT, ELBOW, PRE-FORMED POSTERIOR, LARGE", value: "700112"},
{text: "Trays, Instrument, Wound closure", value: "700113"},
{text: "Trays, Wound closure, Without Instruments", value: "700114"},
{text: "Catheters, bronchoalveolar lavage, 16fr, 5.33mm", value: "700116"},
{text: "Swabs, Cotton-tipped, 6in", value: "700117"},
{text: "TISSUE, TOILET 3.55 X 1000FT,2PLY WHT JUMBO", value: "700118"},
{text: "Catheter Kit, Urinary, Foley, 8fr, 400ml, Ped", value: "700119"},
{text: "Gauze Dressings, 6in x 6.75in", value: "700121"},
{text: "Stockings, Compression, Medium, Knee Length", value: "700122"},
{text: "Loops, High Temp Cautery, Fine Tip", value: "700123"},
{text: "Tracheostomy, Suction Catheter Kit, 10Fr ", value: "700124"},
{text: "Electrodes, ECG, Resting, single use", value: "700125"},
{text: "Trays, Instrument, Laceration Iris Scissor, Forcep", value: "700126"},
{text: "Pressure Pads, Foam, single", value: "700127"},
{text: "Crutches, Wood, Adjustable, Adult, Tall, Pair", value: "700128"},
{text: "Basins, 6 quart Stainless Steel Basin", value: "700129"},
{text: "Stopcocks, 3-way w/Extension Tube", value: "700132"},
{text: "Pads, Barrier Prep Pad", value: "700135"},
{text: "Paper, Recording, Monitoring, ECG,  Roll", value: "700137"},
{text: "Camera, Endoscopic Video System", value: "700138"},
{text: "SUCTION UNIT, V-VAC REPLACEMENT CARTRIDGE", value: "700140"},
{text: "IV Sets, General-Purpose, 20drops/ml ", value: "700142"},
{text: "Sheets, bed, nonwoven fabric, disposable, 84x40", value: "700144"},
{text: "Scrubs Suits, Disposable, Scrub Shirt, XL", value: "700145"},
{text: "Cuffs, BP, Single Tube, Adult,Thigh, Cuff Only", value: "700146"},
{text: "Basins, Emesis, Kidney Basin", value: "700147"},
{text: "Manometer Sets, Venous, graduated, 3-way stopcock", value: "700148"},
{text: "Other, Hats, Assorted Baseball Caps", value: "700149"},
{text: "Drapes, Surgical, 44x72 non-woven Half Sheet", value: "700150"},
{text: "Cuffs, BP, Single Tube, Adult, Cuff Only", value: "700151"},
{text: "IV SETS, NORMOTHERMIC FLUID ADMIN, D-70", value: "700152"},
{text: "Cuffs, BP, Double Tube, Adult,Thigh, Cuff Only", value: "700155"},
{text: "Ortho, Burr, Barrel, Assorted", value: "700156"},
{text: "Test Tubes, Glass, 12x75mm", value: "700157"},
{text: "Crutches, Aluminum, Adjustable, Youth, Pair, Used", value: "700160"},
{text: "GOWNS, COVERALL, LARGE", value: "700161"},
{text: "Feeding, Enteral, Pump Set, Kangaroo 1200ml", value: "700163"},
{text: "Beds, Electric, w/Mat, Used", value: "700164"},
{text: "Surgical Coverings, Arm Sleeves", value: "700165"},
{text: "Syringes, 35cc, Eccentric Luer tip", value: "700166"},
{text: "DRAPES, SURGICAL, CHEST/BREAST DRAPE PACK", value: "700168"},
{text: "Gauze dressing, X-ray Detectable, 1 1/2in", value: "700169"},
{text: "Cuffs, BP, Double Tube, Adult, Cuff Only", value: "700170"},
{text: "Iodine, Povidone, Cliniscrub, 4oz.", value: "700171"},
{text: "Cuffs, BP, Single Tube, Pediatric, Cuff Only", value: "700175"},
{text: "Cuffs, BP, Double Tube, Pediatric, Cuff Only", value: "700176"},
{text: "Supports, Ankle , XL", value: "700177"},
{text: "Supports, Knee, Hinged Support", value: "700178"},
{text: "Cuffs, BP, Single Tube, Infant, Cuff Only", value: "700179"},
{text: "Cuffs, BP, Double Tube, Infant, Cuff Only", value: "700180"},
{text: "Tracheostomy, Foam Trach Ties", value: "700183"},
{text: "SCRUB SUITS, DISPOSABLE, SCRUB SHIRT, XS", value: "700184"},
{text: "Tubes, Chest Tube Set", value: "700187"},
{text: "Headrests, Round, 7in", value: "700190"},
{text: "Headrests, Round, 9in", value: "700191"},
{text: "Stockings, Compression, Large, Knee High", value: "700193"},
{text: "Stockings, Compression, Small, Knee", value: "700194"},
{text: "Plasticware, Pitcher, 32oz.", value: "700195"},
{text: "Basins, Wash, 8 quart, rectangular, plastic", value: "700196"},
{text: "Aspiration Collection Canister, 2000cc", value: "700197"},
{text: "Labware, Basic, Reusable, Plastic Utility Carrier", value: "700198"},
{text: "Slippers, Non-Skid, Universal", value: "700199"},
{text: "Swabs Oral Care, Oral Care Kit, w/accessories", value: "700200"},
{text: "Positioning Aids, Abduction Pillows, Large", value: "700201"},
{text: "Personal Hygiene,Self-Foaming Wash Cloth ", value: "700202"},
{text: "Tube Holders, Endotracheal, Restraint, Disposable", value: "700203"},
{text: "Breathing Circuits, Anesthesia, 40in with filter", value: "700204"}
];

export default dropdownOptions;