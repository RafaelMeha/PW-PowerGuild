const pool = require("../config/database");

class SalesProducts {
    constructor(id, quantity, price, fk_products_id) {
        this.id = id
        this.quantity = quantity
        this.price = price
        this.fk_products_id = fk_products_id
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
        const { quantity, price, fk_products_id } = NewSalesProducts;
        try {
            const [result] = await pool.query(
                "INSERT INTO sales_products (quantity, price, fk_products_id) VALUES ( ?, ?, ?)",
                [quantity, price, fk_products_id]
            );
            return result;
        } catch (error) {
            console.error("Error adding sales_products:", error);
            throw error;
        }
    }

    static async delete(productsPlatformsId) {
        try {
            const [result] = await pool.query("DELETE FROM sales_products WHERE fk_products_id = ?", [productsPlatformsId]);
            return result;
        } catch (error) {
            console.error("Error removing product from sales_products:", error);
            throw error;
        }
    }
}

module.exports = SalesProducts;
