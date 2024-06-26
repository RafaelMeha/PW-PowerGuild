const pool = require("../config/database");

class Review { 
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

    static async getByProductId(productId) {
        try {
            const [rows] = await pool.query("SELECT * FROM reviews WHERE fk_product_id = ?", [productId]);
            return rows;
        } catch (error) {
            console.error("Error fetching reviews by product ID:", error);
            throw error;
        }
    }

    static async getReviewById(reviewId) {
        try {
            const [rows] = await pool.query("SELECT * FROM reviews WHERE id = ?", [reviewId]);
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
        const { ratings, review_text, review_date, fk_user_id, fk_product_id } = newReview; 
        try {
            const [result] = await pool.query(
                "INSERT INTO reviews (ratings, review_text, review_date, fk_user_id, fk_product_id) VALUES (?, ?, ?, ?, ?)", 
                [ratings, review_text, review_date, fk_user_id, fk_product_id]
            );
            return { id: result.insertId, ...newReview };
        } catch (error) {
            console.error("Error adding review:", error);
            throw error;
        }
    }

    static async delete(reviewId) {
        try {
            const [result] = await pool.query("DELETE FROM reviews WHERE id = ?", [reviewId]);
            return result;
        } catch (error) {
            console.error("Error deleting review:", error);
            throw error;
        }
    }
}

module.exports = Review;
