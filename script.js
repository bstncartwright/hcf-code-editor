document.getElementById('codeInput').addEventListener('input', function() {
    const code = this.value;
    const highlightedCode = highlightSyntax(code);
    document.getElementById('highlightedCode').innerHTML = highlightedCode;
});

function highlightSyntax(code) {
    const keywords = ['NOOP', 'PUSH', 'DROP', 'DUPE', 'DUPE2', 'SWAP', 'INC', 'ADD', 'SUBTRACT', 'DIVIDE', 'MULTIPLY', 'GT', 'LT', 'NEGATE', 'JUMP', 'JUMPZ', 'JUMPG', 'HCF', 'SCAN', 'COPY', 'ICOPY', 'PUSHARG', 'INCARG', 'SETARG', 'DECSKIP'];
    const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    const numberRegex = /\b-?\d+\b/g;
    const commentRegex = /;.*/g;

    return code
        .replace(commentRegex, '<span class="comment">$&</span>')
        .replace(keywordRegex, '<span class="keyword">$&</span>')
        .replace(numberRegex, '<span class="number">$&</span>');
}
