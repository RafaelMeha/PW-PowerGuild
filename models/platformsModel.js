const pool = require("../config/database");

class Platforms {
    constructor(id, name) {
        this.id = id
        this.name = name
    }

    static async getAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM platforms");
            return rows;
        } catch (error) {
            console.error("Error fetching platforms:", error);
            throw error;
        }
    }

    static async getById(platformId) {
        try {
            const [rows] = await pool.query("SELECT * FROM platforms WHERE id = ?", [platformId]);
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        } catch (error) {
            console.error("Error fetching platform:", error);
            throw error;
        }
    }

    static async add(newPlatform) {
        const { id, name } = newPlatform;
        try {
            const [result] = await pool.query(
                "INSERT INTO platforms (id, name) VALUES (?, ?)",
                [id, name]
            );
            return result;
        } catch (error) {
            console.error("Error adding platform:", error);
            throw error;
        }
    }
}

module.exports = Platforms;
