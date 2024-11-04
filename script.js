// Load code from session storage on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedCode = sessionStorage.getItem("codeInput");
  if (savedCode) {
    const codeInput = document.getElementById("codeInput");
    codeInput.value = savedCode;
    adjustTextareaHeight(codeInput);
    const highlightedCode = highlightSyntax(savedCode);
    document.getElementById("highlightedCode").innerHTML = highlightedCode;
  }
});

document.getElementById("codeInput").addEventListener("input", function () {
  const code = this.value;
  adjustTextareaHeight(this);
  const highlightedCode = highlightSyntax(code);
  document.getElementById("highlightedCode").innerHTML = highlightedCode;
  // Save code to session storage
  sessionStorage.setItem("codeInput", code);
});

function adjustTextareaHeight(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

function highlightSyntax(code) {
  const keywords = [
    "NOOP",
    "PUSH",
    "DROP",
    "DUPE",
    "DUPE2",
    "SWAP",
    "INC",
    "ADD",
    "SUBTRACT",
    "DIVIDE",
    "MULTIPLY",
    "GT",
    "LT",
    "NEGATE",
    "JUMP",
    "JUMPZ",
    "JUMPG",
    "HCF",
    "SCAN",
    "COPY",
    "ICOPY",
    "PUSHARG",
    "INCARG",
    "SETARG",
    "DECSKIP",
  ];
  const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
  const numberRegex = /\b-?\d+\b/g;
  const commentRegex = /(;.*|#.*)/g; // Updated to support comments starting with #

  const lines = code.split("\n");
  const nonCommentNonEmptyLines = lines.filter(
    (line) => !commentRegex.test(line) && line.trim() !== ""
  );

  return lines
    .map((line, index) => {
      if (commentRegex.test(line) || line.trim() === "") {
        return (
          `<span class="line-number">${index + 1}</span> ` +
          line.replace(commentRegex, '<span class="comment">$&</span>')
        );
      }

      const match = line.match(
        /(JUMP|JUMPZ|JUMPG|COPY|ICOPY|DECSKIP|SETARG)\s+(-?\d+)/
      );
      if (match) {
        const argument = match[2];
        const nonCommentNonEmptyIndex = nonCommentNonEmptyLines.indexOf(line);
        const referencedLineIndex =
          nonCommentNonEmptyIndex + 1 + parseInt(argument);
        const referencedLine =
          nonCommentNonEmptyLines[referencedLineIndex - 1] || "";
        const hint = `<span class="inlay-hint">(references line ${referencedLineIndex} → ${referencedLine.trim()})</span>`;
        line += " " + hint;
      }
      return (
        `<span class="line-number">${index + 1}</span> ` +
        line
          .replace(commentRegex, '<span class="comment">$&</span>')
          .replace(keywordRegex, '<span class="keyword">$&</span>')
          .replace(numberRegex, '<span class="number">$&</span>')
      );
    })
    .join("\n");
}
