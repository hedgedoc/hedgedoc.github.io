---
draft: true
title: Why are code-blocks with 'sequence' as language deprecated?
---

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
