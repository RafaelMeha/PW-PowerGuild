const pool = require("../config/database");

class Developer { 
    constructor(id, name, location, contact_email) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.contact_email = contact_email;
    }

    static async getAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM developers");
            return rows;
        } catch (error) {
            console.error("Error fetching developers:", error);
            throw error;
        }
    }

    static async getById(disId) {
        try {
            const [rows] = await pool.query("SELECT * FROM developers WHERE id = ?", [disId]);
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error;
        }
    }

    static async add(newDev) {
        const { name, location, contact_email} = newDev; 
        try {
            const [result] = await pool.query(
                "INSERT INTO developers (name, location, contact_email) VALUES (?, ?, ?)", 
                [name, location, contact_email]
            );
            return { id: result.insertId, ...newDev };
        } catch (error) {
            console.error("Error adding developer:", error);
            throw error;
        }
    }

    static async delete(devId) {
        try {
            const [result] = await pool.query("DELETE FROM developers WHERE id = ?", [devId]);
            return result;
        } catch (error) {
            console.error("Error deleting review:", error);
            throw error;
        }
    }
}

module.exports = Developer;