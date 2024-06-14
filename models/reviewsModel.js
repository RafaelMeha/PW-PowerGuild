const pool = require("../config/database");

class Reviews {
    constructor(id, ratings, review_text, review_date, fk_user_id, fk_product_id ) {
        this.id = id;
        this.ratings = ratings;
        this.review_text = review_text;
        this.review_date = review_date;
        this.fk_user_id = fk_user_id;
        this.fk_product_id = fk_product_id;
    }

    static async getAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM reviews");
            return rows;
        } catch (error) {
            console.error("Error fetching reviews:", error);
            throw error;
        }
    }

    static async getById(reviewId) {
        try {
            const [rows] = await pool.query("SELECT * FROM reviews WHERE fk_product_id = ?", [reviewId]);
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        } catch (error) {
            console.error("Error fetching review:", error);
            throw error;
        }
    }

    static async add(newReview) {
        const { ratings, review_text, review_date, fk_user_id, fk_product_id } = newProduct;
        try {
            const [result] = await pool.query(
                "INSERT INTO products (ratings, review_text, review_date, fk_user_id, fk_product_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [ratings, review_text, review_date, fk_user_id, fk_product_id]
            );
            return result;
        } catch (error) {
            console.error("Error adding review:", error);
            throw error;
        }
    }

    static async delete(productId) {
        try {
            const [result] = await pool.query("DELETE FROM reviews WHERE id = ?", [productId]);
            return result;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }
}

module.exports = Reviews;