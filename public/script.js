const submitBtn = document.querySelector('#submitBtn');
const longInput = document.querySelector('#longUrl');
const shortInput = document.querySelector('#shortUrl');

async function handleSubmit() {
    const longUrl = longInput.value;
    const payload = { longUrl }
    const response = await axios.post('/convertLongUrlToShort', payload);
    const { shortUrl } = response.data;
    shortInput.value = shortUrl;
}

submitBtn.addEventListener('click', handleSubmit);