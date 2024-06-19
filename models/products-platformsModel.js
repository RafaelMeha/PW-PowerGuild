const pool = require("../config/database");

class PorductsPlatforms {
    constructor(id, fk_platforms_id, fk_products_id) {
        this.id = id
        this.fk_platforms_id = fk_platforms_id
        this.fk_products_id = fk_products_id
    }

    static async getAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM products_platforms");
            return rows;
        } catch (error) {
            console.error("Error fetching products_platforms:", error);
            throw error;
        }
    }

    static async getById(productsPlatformsId) {
        try {
            const [rows] = await pool.query("SELECT * FROM products_platforms WHERE id = ?", [productsPlatformsId]);
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        } catch (error) {
            console.error("Error fetching products_platforms:", error);
            throw error;
        }
    }

    static async add(newPlatform) {
        const { id, name } = newPlatform;
        try {
            const [result] = await pool.query(
                "INSERT INTO products_platforms (id, fk_products_id, fk_platforms_id) VALUES (?, ?)",
                [id, name]
            );
            return result;
        } catch (error) {
            console.error("Error adding products_platforms:", error);
            throw error;
        }
    }
}

module.exports = PorductsPlatforms;
