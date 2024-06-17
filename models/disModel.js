const pool = require("../config/database");

class Distributor { 
    constructor(id, name, price, location) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.location = location;
    }

    static async getAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM distributors");
            return rows;
        } catch (error) {
            console.error("Error fetching distributors:", error);
            throw error;
        }
    }

    static async getById(disId) {
        try {
            const [rows] = await pool.query("SELECT * FROM distributors WHERE id = ?", [disId]);
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error;
        }
    }

    static async add(newDis) {
        const { name, price, location } = newDis; 
        try {
            const [result] = await pool.query(
                "INSERT INTO distributors (name, price, location) VALUES (?, ?, ?)", 
                [name, price, location]
            );
            return { id: result.insertId, ...newDis };
        } catch (error) {
            console.error("Error adding user:", error);
            throw error;
        }
    }

    static async delete(disId) {
        try {
            const [result] = await pool.query("DELETE FROM distributors WHERE id = ?", [disId]);
            return result;
        } catch (error) {
            console.error("Error deleting distributor:", error);
            throw error;
        }
    }    
}

module.exports = Distributor;