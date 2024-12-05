const prisma = require("../prisma");
   const seed = async () => {
     // TODO: Create 10 players
     try {
        const players =[
            { name: "Player 1", breed: "pit bull" },
            { name: "Player 2", breed: "dalmation" },
            { name: "Player 3", breed: "collie" },
            { name: "Player 4", breed: "lab" },
            { name: "Player 5", breed: "terrier" },
            { name: "Player 6", breed: "pit bull" },
            { name: "Player 7", breed: "collie" },
            { name: "Player 8", breed: "lab" },
            { name: "Player 9", breed: "pit bull" },
            { name: "Player 10", breed: "terrier" }
        ];
    for (const player of players) {
        await prisma.players.create({
            data: player,
        });
    }
    console.log("Seeded 10 players successfully")
    }
    catch (error) {
        console.error("Error seeding players into DB", error);
    }
};
   seed()
     .then(async () => await prisma.$disconnect())
     .catch(async (e) => {
       console.error(e);
       await prisma.$disconnect();
       process.exit(1);
     });