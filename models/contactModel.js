const pool = require("../config/database");

class Contact { 
    constructor(id, first_name, last_name, email, subject, message, fk_user_id) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.fk_user_id = fk_user_id;
    }

    static async getAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM contact");
            return rows;
        } catch (error) {
            console.error("Error fetching contacts:", error);
            throw error;
        }
    }

    static async add(newContact) {
        const { first_name, last_name, email, subject, message, fk_user_id } = newContact; 
        try {
            const [result] = await pool.query(
                "INSERT INTO contact (first_name, last_name, email, subject, message, fk_user_id) VALUES (?, ?, ?, ?, ?, 1)", 
                [first_name, last_name, email, subject, message, fk_user_id]
            );
            return { id: result.insertId, ...newContact };
        } catch (error) {
            console.error("Error adding contact:", error);
            throw error;
        }
    }
}

module.exports = Contact;