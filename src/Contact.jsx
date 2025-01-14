import Container from "@mui/material/Container";
import Box from '@mui/material/Box';

export default function Contact() {

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    
        formData.append("access_key", "6845ebfa-9aae-4dce-889a-3253cffe718e");
    
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
    
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        }).then((res) => res.json());
    
        if (res.success) {
          console.log("Success", res);
        }
      };

    return (
        <Container className="contact-container">
            <Box className="email-box">
            <h2>Email</h2>
            <p>henna.rajakisto@gmail.com</p>
            </Box>
            <form onSubmit={onSubmit} className="contact-form">
                <h2>Send a message</h2>
                <label htmlFor="name">Name <span style={{color: "red"}}>*</span><input type="text" id="name" required /></label>
                <label htmlFor="email">Email <span style={{color: "red"}}>*</span><input type="email" id="email" /></label>
                <label htmlFor="message">Message <span style={{color: "red"}}>*</span><textarea id="message" required /></label>
                <button type="submit">Send</button>
            </form>
        </Container>
    )
}
