export default function rehypeTruncate({
  ignoreTags = [],
  maxChars = 120,
  disable = false
} = {}) {
  return truncator;

  function truncator(tree) {
    if (!disable) {
      truncateNode(tree);
    }
  }

  function truncateNode(node, tf = 0) {
    let foundText = tf;

    if (node.type === "text") {
      foundText += node.value.length;
      if (foundText >= maxChars) {
        node.value = `${node.value.slice(
          0,
          node.value.length - (foundText - maxChars)
        )}\u2026`;
        return maxChars;
      }
    }

    if (node.type === "root" || node.type === "element") {
      if (node.type === "element" && ignoreTags.includes(node.tagName)) {
        return foundText;
      }
      for (let i = 0; i < node.children.length; i++) {
        if (foundText === maxChars) {
          node.children.splice(i, 1);
          i--;
          continue;
        }
        foundText = truncateNode(node.children[i], foundText);
      }
    }

    return foundText;
  }
}
