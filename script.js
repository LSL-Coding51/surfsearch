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
        var textNodes = [];
        // Find all text nodes within the element
        function getTextNodes(node) {
            if (node.nodeType === 3) {
                textNodes.push(node);
            } else {
                for (var child = node.firstChild; child; child = child.nextSibling) {
                    getTextNodes(child);
                }
            }
        }
        getTextNodes(element);

        for (var i = 0; i < textNodes.length; i++) {
            var text = textNodes[i].nodeValue;
            var index = text.toLowerCase().indexOf(query);
            if (index >= 0) {
                var span = document.createElement('span');
                span.className = 'highlight';
                span.textContent = text.substring(index, index + query.length);
                var restText = document.createTextNode(text.substring(index + query.length));
                textNodes[i].nodeValue = text.substring(0, index);
                textNodes[i].parentNode.insertBefore(span, textNodes[i].nextSibling);
                textNodes[i].parentNode.insertBefore(restText, span.nextSibling);
            }
        }
    }

    // Remove previous highlights
    function removeHighlights(element) {
        var spans = element.getElementsByClassName('highlight');
        while (spans.length > 0) {
            var span = spans[0];
            var text = span.textContent;
            span.parentNode.replaceChild(document.createTextNode(text), span);
        }
    }

    // Process elements to highlight or reset highlights
    if (query === '') {
        for (var i = 0; i < elements.length; i++) {
            removeHighlights(elements[i]);
        }
    } else {
        for (var i = 0; i < elements.length; i++) {
            removeHighlights(elements[i]);
            highlightText(elements[i], query);
        }
    }
});
