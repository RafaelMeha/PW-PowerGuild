const pool = require("../config/database");

class ProductsWishlists {
    constructor(fk_products_id, fk_wishlists_id) {
        this.fk_products_id = fk_products_id
        this.fk_wishlists_id = fk_wishlists_id
    }

    static async getAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM products_wishlists");
            return rows;
        } catch (error) {
            console.error("Error fetching products_wishlists:", error);
            throw error;
        }
    }

    static async getById(fkWishlistsId) {
        try {
            const [rows] = await pool.query("SELECT * FROM products_wishlists WHERE fk_wishlists_id = ?", [fkWishlistsId]);
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            throw error;
        }
    }

    static async add(newProductWishlist) {
        const { fk_products_id, fk_wishlists_id } = newProductWishlist;
        try {
            const [result] = await pool.query(
                "INSERT INTO products_wishlists (fk_products_id, fk_wishlists_id) VALUES (?, ?)",
                [fk_products_id, fk_wishlists_id]
            );
            return result;
        } catch (error) {
            console.error("Error adding products_wishlists:", error);
            throw error;
        }
    }

    static async delete(productId) {
        try {
            const [result] = await pool.query("DELETE FROM products_wishlists WHERE fk_products_id = ?", [productId]);
            return result;
        } catch (error) {
            console.error("Error removing product from products_wishlists:", error);
            throw error;
        }
    }
}

module.exports = ProductsWishlists;
