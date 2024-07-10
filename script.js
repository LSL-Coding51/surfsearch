document.getElementById('searchBar').addEventListener('input', function() {
    var query = this.value.toLowerCase();
    var iframe = document.getElementById('dataFrame');
    var iframeContent = iframe.contentDocument || iframe.contentWindow.document;

    if (!iframeContent) {
        console.error('Iframe content not found');
        return;
    }

    var bodyContent = iframeContent.body.innerHTML;

    // Function to escape HTML
    function escapeHtml(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    // Function to highlight text
    function highlightText(content, query) {
        if (query === '') {
            return content;  // Return original content if query is empty
        }
        var regex = new RegExp(`(${query})`, 'gi');
        return content.replace(regex, '<span class="highlight">$1</span>');
    }

    // Escape the body content before applying highlighting
    var escapedContent = escapeHtml(bodyContent);

    // Apply highlighting
    var highlightedContent = highlightText(escapedContent, query);

    // Use the DOMParser to safely parse the highlighted HTML
    var parser = new DOMParser();
    var doc = parser.parseFromString(highlightedContent, 'text/html');

    // Replace the iframe body with the new content
    iframeContent.body.innerHTML = doc.body.innerHTML;
});
