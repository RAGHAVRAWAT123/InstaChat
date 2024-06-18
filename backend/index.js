const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// ChatEngine authentication endpoint URL
const chatEngineAuthURL = "https://api.chatengine.io/users";

app.post("/authenticate", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Make a request to ChatEngine to authenticate the user
    const response = await axios.put(
      chatEngineAuthURL,
      { username: username, secret: password },
      { headers: { "Private-Key": "c1c0c47c-d867-4afd-80e2-d90a1d29de9e" } }
    );

    // Check if the response from ChatEngine indicates successful authentication
    if (response.status === 200) {
      // Authentication successful
      return res.status(200).json({ message: "Authentication successful" });
    } else {
      // Authentication failed
      return res.status(401).json({ error: "Incorrect username or password" });
    }
  } catch (error) {
    // Handle errors (e.g., network errors, ChatEngine API errors)
    console.error("Authentication error:", error.message);
    return res.status(500).json({ error: "An error occurred during authentication" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
