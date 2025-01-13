import Container from "@mui/material/Container";
import Box from '@mui/material/Box';

export default function Contact() {
    return (
        <>
        <Container className="contact-container">
            <Box className="email-box">
            <h2>Email</h2>
            <p>henna.rajakisto@gmail.com</p>
            </Box>
            </Container>
            <form name="contact" method="POST" className="contact-form" data-netlify="true">
                <h2>Send a message</h2>
                <label htmlFor="name">Name<input type="text" id="name" required /></label>
                <label htmlFor="email">Email<input type="email" id="email" /></label>
                <label htmlFor="message">Message <span style={{color: "red"}}>*</span><textarea id="message" required /></label>
                <button type="submit">Send</button>
            </form>
            </>
    )
}
