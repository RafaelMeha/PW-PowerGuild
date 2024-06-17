const pool = require("../config/database");

class User { 
    constructor(id, name, email, pwd) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.pwd = pwd;
    }

    static async getAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM users");
            return rows;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    static async getById(userId) {
        try {
            const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [userId]);
            if (rows.length === 0) {
                return null;
            }
            return rows[0];
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error;
        }
    }

    static async add(newUser) {
        const { name, email, pwd } = newUser; 
        try {
            const [result] = await pool.query(
                "INSERT INTO users (name, email, pwd) VALUES (?, ?, ?)", 
                [name, email, pwd]
            );
            return { id: result.insertId, ...newUser };
        } catch (error) {
            console.error("Error adding user:", error);
            throw error;
        }
    }

    static async delete(userId) {
        try {
            const [result] = await pool.query("DELETE FROM users WHERE id = ?", [userId]);
            return result;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }
}

module.exports = User;
