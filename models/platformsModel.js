const pool = require("../config/database");

class Platforms {
    constructor(fk_platforms_id, fk_products_id) {
        this.fk_platforms_id = fk_platforms_id
        this.fk_products_id = fk_products_id
    }

    static async getAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM products_platforms");
            return rows;
        } catch (error) {
            console.error("Error fetching platforms:", error);
            throw error;
        }
    }

    static async getById(platformId) {
        try {
            const [rows] = await pool.query("SELECT * FROM products_platforms WHERE id = ?", [platformId]);
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
        const { fk_platforms_id, fk_products_id } = newPlatform;
        try {
            const [result] = await pool.query(
                "INSERT INTO products_platforms (fk_platforms_id, fk_products_id) VALUES (?, ?)",
                [fk_platforms_id, fk_products_id]
            );
            return result;
        } catch (error) {
            console.error("Error adding platform:", error);
            throw error;
        }
    }
}

module.exports = Platforms;
