document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("search-input");
    const output = document.getElementById("output");

    input.addEventListener("input", function () {
        const text = input.value;
        const regex = new RegExp(`(${text.split('').join('|')})`, 'gi');
        
        if (text.length > 0) {
            output.innerHTML = text.replace(regex, match => `<span class="highlight">${match}</span>`);
        } else {
            output.innerHTML = input.value;
        }
    });
});
