const textArea = document.getElementById('text-area');
const generateLinkButton = document.getElementById('generate-link-button');
const textContainer = document.getElementById('text-container'); // New element
const copyButton = document.getElementById('text-container'); // New element

generateLinkButton.addEventListener('click', async () => {
  const text = textArea.value;

  // Check if text is entered
  if (!text) {
    textContainer.textContent = 'Please enter some text to send.';
    return;
  }

  // Display the text in the web app (no virtual file or link generation)
  textContainer.textContent = text;

  // Add copy functionality
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        copyButton.textContent = 'Copied!';
      })
      .catch(err => {
        console.error('Error copying text:', err);
        copyButton.textContent = 'Copy Failed';
    });
  });

  // Optional: Send a message to the server using Fetch API (for future enhancements)
  // This commented block is left for potential future development
  /*
  try {
    const response = await fetch('http://localhost:8080/send-text', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      console.error('Error sending text:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
  */
});
