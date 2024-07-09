document.getElementById('searchBar').addEventListener('input', function() {
    var query = this.value.toLowerCase();
    var iframe = document.getElementById('dataFrame');
    var iframeContent = iframe.contentDocument || iframe.contentWindow.document;

    if (!iframeContent) {
        console.error('Iframe content not found');
        return;
    }

    var bodyContent = iframeContent.body.innerHTML;

    // Function to highlight text
    function highlightText(content, query) {
        if (query === '') {
            return content;  // Return original content if query is empty
        }
        var regex = new RegExp(`(${query})`, 'gi');
        return content.replace(regex, '<span class="highlight">$1</span>');
    }

    // Apply highlighting
    var highlightedContent = highlightText(bodyContent, query);

    // Use the DOMParser to safely parse the highlighted HTML
    var parser = new DOMParser();
    var doc = parser.parseFromString(highlightedContent, 'text/html');

    // Replace the iframe body with the new content
    iframeContent.body.innerHTML = doc.body.innerHTML;
});
