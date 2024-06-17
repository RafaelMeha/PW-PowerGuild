const pool = require("../config/database");

class Platforms {
    constructor(id, quantity, price, fk_sales_id, fk_products_platforms_id) {
        this.id = id
        this.quantity = quantity
        this.price = price
        this.fk_sales_id = fk_sales_id
        this.fk_products_platforms_id = fk_products_platforms_id
    }

    static async getAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM sales_products");
            return rows;
        } catch (error) {
            console.error("Error fetching sales_products:", error);
            throw error;
        }
    }

    static async getById(salesProductsId) {
        try {
            const [rows] = await pool.query("SELECT * FROM sales_products WHERE id = ?", [salesProductsId]);
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        } catch (error) {
            console.error("Error fetching sales_products:", error);
            throw error;
        }
    }

    static async add(NewSalesProducts) {
        const { id, quantity, price, fk_sales_id, fk_products_platforms_id } = NewSalesProducts;
        try {
            const [result] = await pool.query(
                "INSERT INTO sales_products (id, quantity, price, fk_sales_id, fk_products_platforms_id) VALUES (?, ?, ?, ?, ?)",
                [id, quantity, price, fk_sales_id, fk_products_platforms_id]
            );
            return result;
        } catch (error) {
            console.error("Error adding sales_products:", error);
            throw error;
        }
    }
}

module.exports = Platforms;
