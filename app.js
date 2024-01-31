// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function() {
    //Hide
    document.getElementById('results').style.display = 'none';
    // Showloader
    document.getElementsByClassName('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);


    e.preventDefault()
});

// Calculate Results
function calculateResults() {
    console.log('calculating...');
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principal = patseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

        // Show results
        document.getElementById('results').style.display = 'block';


        // Hide loader
        document.getElementsByClassName('loading').style.display = 'none';

    } else {
        showerror('please check your numbers');
    }

}
// Show Error
function showerror(error) {
    // Show results
    document.getElementById('results').style.display = 'none';


    // Hide loader
    document.getElementsByClassName('loading').style.display = 'none';

    //Create a div
    const errorDiv = document.createElement('div');

    //Get element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading)

    // Clear error after 3 seconds
    setTime(clearError, 3000);
}
// C;ear error
function clearError() {
    document.querySelector('.alert').remove();
}