class Contact { 
    constructor(id, first_name, last_name, email, subject, message, fk_user_id) {
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.subject = subject
        this.message = message
        this.fk_user_id = fk_user_id
    }
}