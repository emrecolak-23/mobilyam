import sgMail from "@sendgrid/mail"

const sendgridKey = process.env.SEND_GRID_KEY!

interface Email {
    name: string,
    email: string
}


const fromEmail: Email = {
    name: "Emre ÇOLAK",
    email: "colakkemre@gmail.com"
}

class Mailer {
    from_email: Email
    body: string


    constructor(public subject: string, public recipient: string, public content: string, public html?: string) {
        this.from_email = fromEmail
        this.subject = subject
        this.body = content
        this.recipient = recipient
        this.html = html
    }

    async send() {
        sgMail.setApiKey(sendgridKey)

        sgMail.send({
            to: this.recipient,
            from: this.from_email,
            subject: this.subject,
            text: this.content,
            html: this.html
        }).then(() => {
            console.log('Email sent successfully')
        }).catch((err) => {
            console.error('Sending email error', err.message)
        })
    }

}

export default Mailer