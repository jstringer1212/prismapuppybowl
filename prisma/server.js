require("dotenv").config();
const express = require("express");
const pg = require("pg");
const { PrismaClient } = require("@prisma/client"); 
const client = new pg.Client(process.env.DATABASE_URL);
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT;

client.connect().catch((err) => { 
    console.error("Database connection error:", err);
  });

app.use(express.json());

// routes

// get all players
app.get("/api/players", async (req, res) => {
    try {
        const players = await prisma.players.findMany();
        res.json(players);
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ error: "failed to fetch players" })
    }
});

// create player
app.post("/api/players", async (req, res) => {
    try {
        const { name, breed } = req.body;
        const newPlayer = await prisma.players.create({
            data: {
                name,
                breed,
            },  
        });
        res.status(201).json(newPlayer);
    } catch (error) {
        console.error("Error creating player:", error);
        res.status(500).json({ error: "failed to create player"})        
    }
});

// get single player
app.get("/api/players/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const player = await prisma.players.findUnique({
            where: {id: parseInt(id) },
        });
        if (player) {
            res.json(player);
        } else {
            res.status(404).json({ error: "Player not found"});
        }
    } catch (error) {
        console.error("Error fetching player:", error);
        res.status(500).json({ error: "failed to fetch player"}) 
    }
});

// replace a player
app.put("/api/players/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {name, breed} = req.body;
        const updatedPlayer = await prisma.players.update({
            where: { id: parseInt(id) },
            data: { name, breed },
        });
        res.json(updatedPlayer);
    } catch (error) {
        console.error("Error updating player:", error);
        res.status(500).json({ error: "failed to update player"}) 
    }
});

// delete a player
app.delete("/api/players/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.players.delete({ 
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting player:", error);
        res.status(500).json({ error: "failed to delete player"}) 
    }
});
