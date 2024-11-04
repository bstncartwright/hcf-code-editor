document.getElementById('codeInput').addEventListener('input', function() {
    const code = this.value;
    const highlightedCode = highlightSyntax(code);
    document.getElementById('highlightedCode').innerHTML = highlightedCode;
    const inlayHints = generateInlayHints(code);
    document.getElementById('inlayHints').innerHTML = inlayHints;
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

function generateInlayHints(code) {
    const lines = code.split('\n');
    let hints = '';

    lines.forEach((line, index) => {
        const match = line.match(/(JUMP|JUMPZ|JUMPG|COPY|ICOPY|DECSKIP)\s+(-?\d+)/);
        if (match) {
            const instruction = match[1];
            const argument = match[2];
            hints += `<div class="inlay-hint">Line ${index + 1}: ${instruction} references line ${index + 1 + parseInt(argument)}</div>`;
        }
    });

    return hints;
}
