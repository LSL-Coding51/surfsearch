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
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        var nodes = tempDiv.getElementsByTagName('*');

        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            for (var j = 0; j < node.childNodes.length; j++) {
                var child = node.childNodes[j];
                if (child.nodeType === 3) { // Text node
                    var text = child.nodeValue;
                    if (query) {
                        var regex = new RegExp(`(${query})`, 'gi');
                        var highlighted = text.replace(regex, '<span class="highlight">$1</span>');
                        if (highlighted !== text) {
                            var span = document.createElement('span');
                            span.innerHTML = highlighted;
                            node.replaceChild(span, child);
                        }
                    } else {
                        node.replaceChild(document.createTextNode(text), child);
                    }
                }
            }
        }

        return tempDiv.innerHTML;
    }

    // Apply highlighting
    var highlightedContent = highlightText(bodyContent, query);

    // Replace the iframe body with the new content
    iframeContent.body.innerHTML = highlightedContent;
});
