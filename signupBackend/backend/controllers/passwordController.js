const { User } = require("../models");
const SibApiV3Sdk = require("sib-api-v3-sdk");

// Step 1: Configure Brevo API key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";

// Step 2: Define controller function
const getPassword = async (req, res) => {
  const user = req.body;

  try {
    // Step 3: Instantiate the API
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Step 4: Set sender and receiver details
    const sender = {
      email: "ritiksg143@gmail.com", // This must be a Brevo-verified sender
      name: "TestApp",
    };

    const receivers = [
      {
        email: user.email, // Receiver's email from request body
      },
    ];

    // Step 5: Send the transactional email
    const sendEmail = await apiInstance.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Test Email from Brevo",
      textContent:
        "This is a plain text fallback for email clients that do not support HTML.",
      htmlContent: `
        <html>
          <body>
            <h1>Hello, ${user.email},GET Ready</h1>
            <p>This is a test transactional email sent via the Brevo API.</p>
          </body>
        </html>
      `,
    });

    // Step 6: Send success response
    res.status(200).json({ message: "Email sent successfully", sendEmail });
  } catch (error) {
    // Handle API or logic errors
    console.error("Error while sending email:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPassword;
