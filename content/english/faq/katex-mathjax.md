---
draft: true
title: Why did you switch from MathJax to KaTeX?
---

The new react frontend, that was introduced with HedgeDoc 2.0 switched from MathJax 2 to [KaTeX](https://katex.org/), because:
 - [KaTeX is much faster than MathJax](https://www.intmath.com/cg5/katex-mathjax-comparison.php?processor=MathJax )
 - [The MathJax React Component is not maintained and doesn't support MathJax 3](https://github.com/wko27/react-mathjax)
 - [KaTeX supports every command you'll need for math expressions](https://katex.org/docs/supported.html)
