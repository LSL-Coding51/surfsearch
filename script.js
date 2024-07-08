document.getElementById('searchBar').addEventListener('input', function() {
    var query = this.value.toLowerCase();
    var iframe = document.getElementById('dataFrame');
    var iframeContent = iframe.contentDocument || iframe.contentWindow.document;

    if (!iframeContent) {
        console.error('Iframe content not found');
        return;
    }

    var elements = iframeContent.body.getElementsByTagName('*');
    
    // Function to wrap matched text in a span
    function highlightText(element, query) {
        var innerHTML = element.innerHTML;
        var index = innerHTML.toLowerCase().indexOf(query);
        if (index >= 0) {
            innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + query.length) + "</span>" + innerHTML.substring(index + query.length);
            element.innerHTML = innerHTML;
        }
    }
    
    // Remove previous highlights
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = elements[i].innerHTML.replace(/<span class="highlight">|<\/span>/g, '');
    }
    
    // Highlight current search
    if (query === '') {
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = elements[i].innerHTML.replace(/<span class="highlight">|<\/span>/g, '');
        }
    } else {
        for (var i = 0; i < elements.length; i++) {
            highlightText(elements[i], query);
        }
    }
});
