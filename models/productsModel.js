const pool = require("../config/database");

class Products {
    constructor(id, name, description, discount, price, quantity, launchDate, type, category, fkDevelopersId, fkSuppliersId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.discount = discount;
        this.price = price;
        this.quantity = quantity;
        this.launchDate = new Date(launchDate);
        this.type = type;
        this.category = category;
        this.fkDevelopersId = fkDevelopersId;
        this.fkSuppliersId = fkSuppliersId;
    }

    static async getAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM products");
            return rows;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }

    static async getById(productId) {
        try {
            const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [productId]);
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        } catch (error) {
            console.error("Error fetching product:", error);
            throw error;
        }
    }

    static async add(newProduct) {
        const { name, description, discount, price, quantity, launch_date, Type, category, fk_developers_id, fk_suppliers_id } = newProduct;
        try {
            const [result] = await pool.query(
                "INSERT INTO products (name, description, discount, price, quantity, launch_date, Type, category, fk_developers_id, fk_suppliers_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [name, description, discount, price, quantity, launch_date, Type, category, fk_developers_id, fk_suppliers_id]
            );
            return result;
        } catch (error) {
            console.error("Error adding product:", error);
            throw error;
        }
    }

    static async delete(productId) {
        try {
            await pool.query("DELETE FROM sales_products WHERE fk_products_platforms_id IN (SELECT id FROM products_platforms WHERE fk_products_id = ?)", [productId]);
            await pool.query("DELETE FROM products_wishlists WHERE fk_products_id = ?", [productId]);
            await pool.query("DELETE FROM reviews WHERE fk_product_id = ?", [productId]);
            await pool.query("DELETE FROM products_platforms WHERE fk_products_id = ?", [productId]);
            const [result] = await pool.query("DELETE FROM products WHERE id = ?", [productId]);
            return result;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }
}

module.exports = Products;
