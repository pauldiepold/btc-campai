document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/.netlify/functions/fetch-events');
        const events = await response.json();

        const eventsList = document.getElementById('events-list');
        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.innerHTML = `
        <h3>${event.text}</h3>
        <p>Datum: ${new Date(event.event.startAt).toLocaleString()}</p>
        <p>Ort: ${event.event.locationValue}</p>
      `;
            eventsList.appendChild(eventElement);
        });
    } catch (error) {
        console.error('Fehler beim Laden der Events', error);
    }
});
