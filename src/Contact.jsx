import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useState } from "react";

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", "6845ebfa-9aae-4dce-889a-3253cffe718e");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Thank you for your message!");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <Container className="contact-container">

      <form onSubmit={onSubmit} className="contact-form">
        <h2>Send a message</h2>

        <label htmlFor="name">
          Name <span>*</span>
          <input type="text" id="name" name="name" required />
        </label>

        <label htmlFor="email">
          Email <span>*</span>
          <input type="email" id="email" name="email" required />
        </label>

        <label htmlFor="message">
          Message <span>*</span>
          <textarea id="message" name="message" required />
        </label>

        {/* <input type="hidden" name="access_key" value="6845ebfa-9aae-4dce-889a-3253cffe718e" /> */}

        <button type="submit">Submit</button>
      </form>

      {result && <span className="result-message">{result}</span>}

      <Box className="email-box">
        <h2>Let's connect</h2>
        <p>henna.rajakisto@gmail.com</p>

        <a
          href="https://www.linkedin.com/in/henna-rajakisto-b57b99253/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/img/linkedin-square-icon.png"
            alt="linkedin"
            className="linkedin-icon"
          />
        </a>
      </Box>

    </Container>
  );
}