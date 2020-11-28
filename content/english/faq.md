---
title: FAQ
description: Frequently asked questions
draft: false
---

This page is intended to provide answers to some questions that frequently appear in the community.

{{< faq-entry title="Why is CodiMD now called HedgeDoc?" >}}
The short version: There were two CodiMD-projects on GitHub, the community-driven fork and the original project maintained by the HackMD-team. To solve this naming conflict, our community-driven version was renamed to HedgeDoc.
For a full writeup, check out the [history document](/history/).
{{< /faq-entry >}}

{{< faq-entry title="Why was the PDF Export feature removed?" >}}
We used a chrome-headless instance to generate the PDFs, but that led to some security vulnerabilities and was therefore deactivated. There are currently plans to re-add this feature in a safe way, but this will most likely take some time and can be expected at the earliest with 2.1 (but could also take longer).
In the meantime you can use your browsers print to PDF Feature. This [page](https://www.digitaltrends.com/computing/how-to-save-a-webpage-as-a-pdf/) explains how to do that for multiple browsers.
{{< /faq-entry >}}

{{< faq-entry title="Can I run multiple instances on the same database?" >}}
No. The HedgeDoc server process is not entirely stateless and therefore running more than one instance will result in missing/broken content for users. In order to solve issues like HA-capabilities, please use a high level orchestrator that makes sure that always 1 instance is running on your infrastructure and that the database is available. The server process usually starts within seconds and therefore the possible downtime should be minimal.
{{< /faq-entry >}}

{{< faq-entry title="Why did you switch from MathJax to KaTeX?" draft=true >}}
The new react frontend, that was introduced with HedgeDoc 2.0 switched from MathJax 2 to [KaTeX](https://katex.org/), because:
 - [KaTeX is much faster than MathJax](https://www.intmath.com/cg5/katex-mathjax-comparison.php?processor=MathJax )
 - [The MathJax React Component is not maintained and doesn't support MathJax 3](https://github.com/wko27/react-mathjax)
 - [KaTeX supports every command you'll need for math expressions](https://katex.org/docs/supported.html)
{{< /faq-entry >}}

{{< faq-entry title="Why are code-blocks with 'sequence' as language deprecated?" draft=true >}}
Starting with HedgeDoc 2.0, mermaid is used for rendering sequence-diagrams. The  [syntax](https://mermaid-js.github.io/mermaid/#/sequenceDiagram) doesn't change. To remove the deprecation warning, simply change the codeblock-"language" from `sequence` to `mermaid` and insert a single line with `sequenceDiagram` just before your diagram content.

**Deprecated**:

    ```sequence
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    ```
    
**New**:

    ```mermaid
    sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    ```
{{< /faq-entry >}}