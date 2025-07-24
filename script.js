const urlForm = document.getElementById('url-form');
const longUrlInput = document.getElementById('long-url');
const resultSection = document.getElementById('result');
const shortUrlInput = document.getElementById('short-url');
const copyBtn = document.getElementById('copy-btn');
const qrBtn = document.getElementById('qr-btn');
const qrcodeDiv = document.getElementById('qrcode');

let qrcode = null;

urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const longUrl = longUrlInput.value;

    // A real-world application would call a backend service here
    // For this example, we'll use the TinyURL API
    const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to shorten URL');
        }
        const shortUrl = await response.text();
        shortUrlInput.value = shortUrl;
        resultSection.classList.remove('hidden');
        if(qrcode) {
            qrcode.clear();
            qrcodeDiv.style.display = 'none';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Could not shorten the URL. Please try again.');
    }
});

copyBtn.addEventListener('click', () => {
    shortUrlInput.select();
    document.execCommand('copy');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyBtn.textContent = 'Copy';
    }, 2000);
});

qrBtn.addEventListener('click', () => {
    const url = shortUrlInput.value;
    if (!url) return;

    if (qrcode) {
        qrcode.clear();
        qrcode.makeCode(url);
    } else {
        qrcode = new QRCode(qrcodeDiv, {
            text: url,
            width: 128,
            height: 128,
            correctLevel : QRCode.CorrectLevel.H
        });
    }
    qrcodeDiv.style.display = 'block';
});