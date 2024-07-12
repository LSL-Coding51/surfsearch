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
        if (!query) {
            return content;
        }

        var regex = new RegExp(`(${query})`, 'gi');
        var highlighted = content.replace(regex, '<span class="highlight">$1</span>');

        return highlighted;
    }

    // Apply highlighting
    var highlightedContent = highlightText(bodyContent, query);

    // Replace the iframe body with the new content
    iframeContent.body.innerHTML = highlightedContent;
});
