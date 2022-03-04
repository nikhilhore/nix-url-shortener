const longInput = document.querySelector('#longUrl');
const shortInput = document.querySelector('#shortUrl');
const submitBtn = document.querySelector('#submitBtn');
const copyBtn = document.querySelector('#copyBtn');

async function handleSubmit() {
    const longUrl = longInput.value;
    const payload = { longUrl }
    const response = await axios.post('/convertLongUrlToShort', payload);
    const { shortUrl } = response.data;
    shortInput.value = shortUrl;
}

function copyToClipboard() {
    const shortUrl = shortInput.value;
    navigator.clipboard.writeText(shortUrl);
    copyBtn.innerText = 'Copied!';
    setTimeout(() => {
        copyBtn.innerText = 'Copy';
    }, 2000);
}

submitBtn.addEventListener('click', handleSubmit);
copyBtn.addEventListener('click', copyToClipboard);