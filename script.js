document.getElementById('searchBar').addEventListener('input', function() {
    var query = this.value.toLowerCase();
    var iframe = document.getElementById('dataFrame');
    var iframeContent = iframe.contentDocument || iframe.contentWindow.document;

    if (!iframeContent) {
        console.error('Iframe content not found');
        return;
    }

    var elements = iframeContent.body.getElementsByTagName('*');
    
    // Remove previous highlights
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = '';
    }
    
    // Highlight current search
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].innerText.toLowerCase().includes(query)) {
            elements[i].style.backgroundColor = 'yellow';
        }
    }
});
