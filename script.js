document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.service-btn');
    const queueDisplay = document.getElementById('queueDisplay');

    // Initialize queue numbers for each service
    let queueNumbers = {
        'Enrollment/Registration': 0,
        'Accounting': 0,
        'Inquiry': 0,
        'Uniform and Supply': 0
    };

    // Function to get the current date in YYYY-MM-DD format
    function getCurrentDate() {
        const now = new Date();
        return now.toISOString().split('T')[0];
    }

    // Function to get the current date and time
    function getCurrentDateTime() {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return now.toLocaleDateString(undefined, options);
    }

    // Load the last date from localStorage
    const lastDate = localStorage.getItem('lastDate');
    const currentDate = getCurrentDate();

    // If the date has changed, reset the queue numbers
    if (lastDate !== currentDate) {
        localStorage.setItem('lastDate', currentDate);
        localStorage.setItem('queueNumbers', JSON.stringify(queueNumbers));
    } else {
        // Load queue numbers from localStorage
        queueNumbers = JSON.parse(localStorage.getItem('queueNumbers')) || queueNumbers;
    }

    // Update the initial display
    queueDisplay.innerHTML = `
        <p>Select a service to get your number.</p>
    `;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const service = button.getAttribute('data-service');
            queueNumbers[service]++;
            const queueNumber = queueNumbers[service];

            // Save the updated queue numbers to localStorage
            localStorage.setItem('queueNumbers', JSON.stringify(queueNumbers));

            // Update the queue display with the latest queue number
            queueDisplay.innerHTML = `
                <p>Service: ${service}</p>
                <p id="queueNumber">Number: ${queueNumber}</p>
                <p>Time: ${getCurrentDateTime()}</p>
            `;
        });
    });
});
