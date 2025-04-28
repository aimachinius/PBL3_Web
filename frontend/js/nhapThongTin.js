// Basic JavaScript could be added here for form validation and interactivity
document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.borderColor = '#007b8c';
        });
        input.addEventListener('blur', function () {
            this.style.borderColor = '#ccc';
        });
    });
});
