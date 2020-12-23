---
title: FAQ
description: Frequently asked questions
draft: false
---

This page is intended to provide answers to some questions that frequently appear in the community.

{{< faq-entry title="How stable is the demo instance?" >}}
In the past, the number of problems with our demo instance was very low, but **we don’t guarantee that your notes won’t be lost** because of hardware or software malfunctions.
The demo instance runs the latest unstable code from our repository, so sometimes things might not work as expected.
We generally recommend hosting your own instance for more than testing the features.
{{< /faq-entry >}}

{{< faq-entry title="Why does the demo instance use Cloudflare?" >}}
Some countries have a too high latency to the demo instance, which means HedgeDoc would be unusable.
To make the demo available in as many countries as possible, we use [Cloudflare][cloudflare]. One of the [downsides][cloudflare-problems] is that Cloudflare intercepts all TLS traffic between your browser and the demo instance, which makes the demo unsuitable for private notes. You can of course self-host HedgeDoc to avoid all of these latency and privacy issues.

[cloudflare-problems]: https://en.wikipedia.org/wiki/Cloudflare#Controversy
[cloudflare]: https://www.cloudflare.com/
{{< /faq-entry >}}

{{< faq-entry title="Can I run multiple instances on the same database?" >}}
No. The HedgeDoc server process is not entirely stateless and therefore running more than one instance will result in missing/broken content for users. In order to solve issues like HA-capabilities, please use a high level orchestrator that makes sure that always 1 instance is running on your infrastructure and that the database is available. The server process usually starts within seconds and therefore the possible downtime should be minimal.
{{< /faq-entry >}}

{{< faq-entry title="Why is CodiMD now called HedgeDoc?" >}}
The short version: There were two CodiMD-projects on GitHub, the community-driven fork and the original project maintained by the HackMD-team. To solve this naming conflict, our community-driven version was renamed to HedgeDoc.
For a full writeup, check out the [history document](/history/).
{{< /faq-entry >}}

{{< faq-entry title="Why was the PDF Export feature removed?" >}}
We used a chrome-headless instance to generate the PDFs, but that led to some security vulnerabilities and was therefore deactivated. There are currently plans to re-add this feature in a safe way, but this will most likely take some time and can be expected at the earliest with 2.1 (but could also take longer).
In the meantime you can use your browsers print to PDF Feature. This [page](https://www.digitaltrends.com/computing/how-to-save-a-webpage-as-a-pdf/) explains how to do that for multiple browsers.
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

{{< faq-entry title="Why do tag headings don't work anymore?" draft=true >}}
Starting with HedgeDoc 2.0, we don't support tag headings in the note anymore. 

```
#### tags: `tag1`, `tag2`
```

Instead please use the [frontmatter metadata](https://demo.hedgedoc.org/yaml-metadata#tags) to specify tags.

{{< /faq-entry >}}

{{< faq-entry title="Why is the comma-separated definition of tags in the YAML-metadata deprecated?" draft=true >}}
We try to introduce as few hedgedoc-specific things as possible, especially if there is a normal way to do it anyway. With this in mind the old syntax seems unnecessary extra, instead you should use [YAML Collections](https://yaml.org/spec/1.2/spec.html#id2759963) to specify tags as this is standard way of providing list in YAML.

**Deprecated**:

    ---
    tags: tag1, tag2
    ---
    
**New**:

    ---
    tags:
     - tag1
     - tag2
    ---

**or**

    ---
    tags: ['tag1', 'tag2']
    ---
{{< /faq-entry >}}

{{< faq-entry title="Why can't I embed some PDFs?" >}}  
Many servers don't allow the embedding of their content on arbitrary sites.

For a more technical explanation:  
The `X-Frame-Options` header can be used to specify if a given webpage can be embedded.
For security reasons this header is often set to `SAMEORIGIN`, which disallows embedding on other origins.
To be able to embed a PDF inside a HedgeDoc note, the server that hosts the PDF must either send no `X-Frame-Options`
header (which might be insecure) or include the URI of your HedgeDoc instance in an `ALLOW-FROM` statement.
See [Mozillas docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) for more details.
Also note that the `X-Frame-Options` header [is being obsoleted](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors)
by the `frame-ancestors` statement in the `Content-Security-Policy` header.
{{< /faq-entry >}}
