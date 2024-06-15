document.addEventListener("DOMContentLoaded", () => {
    const btnEl = document.getElementById("btn");
    const birthdayEl = document.getElementById("birthday");
    const resultEl = document.getElementById("result");
    const errorEl = document.getElementById("error");

    // Initialize Flatpickr
    flatpickr(birthdayEl, {
        dateFormat: "Y-m-d",
        maxDate: "today",
        allowInput: true
    });

    const getAge = (birthdayValue) => {
        const currentDate = new Date();
        const birthdayDate = new Date(birthdayValue);
        if (currentDate < birthdayDate) {
            return {years: -1};
        }

        let years = currentDate.getFullYear() - birthdayDate.getFullYear();
        let months = currentDate.getMonth() - birthdayDate.getMonth();
        let days = currentDate.getDate() - birthdayDate.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
            days += lastMonth;
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        if (years === 0 && months === 0) {
            return {days};
        } else if (years === 0) {
            return {months, days};
        } else {
            return {years, months, days};
        }
    };

    const displayError = (message) => {
        errorEl.innerText = message;
        errorEl.style.display = 'block';
    };

    const clearError = () => {
        errorEl.innerText = '';
        errorEl.style.display = 'none';
    };

    const calculateAge = () => {
        clearError();
        const birthdayValue = birthdayEl.value;
        if (!birthdayValue) {
            displayError('Please enter your birthday');
            return;
        }

        const age = getAge(birthdayValue);
        if (age.years === -1) {
            displayError('The date cannot be in the future');
            return;
        }

        if (age.years > 0) {
            resultEl.innerText = `Your age is ${age.years} ${age.years > 1 ? "years" : "year"} old`;
        } else if (age.months > 0) {
            resultEl.innerText = `Your age is ${age.months} ${age.months > 1 ? "months" : "month"} old`;
        } else {
            resultEl.innerText = `Your age is ${age.days} ${age.days > 1 ? "days" : "day"} old`;
        }
    };

    btnEl.addEventListener("click", calculateAge);
});
