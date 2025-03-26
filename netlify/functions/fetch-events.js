exports.handler = async (event, context) => {
    try {
        const response = await fetch(process.env.API_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const rawEvents = await response.json();

        // Chronologisch sortieren und optional filtern
        const sortedEvents = rawEvents
            .filter(event => event?.event?.startAt)
            .sort((a, b) => new Date(a.event.startAt) - new Date(b.event.startAt))
            .slice(0, 50); // Begrenzen auf 50 Events

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sortedEvents)
        };
    } catch (error) {
        console.error('Fetch Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed fetching events',
                details: error.message
            })
        };
    }
};