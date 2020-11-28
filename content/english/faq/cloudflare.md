---
title: Why does the demo instance use Cloudflare?
weight: 2
---

Some countries have a too high latency to the demo instance, which means HedgeDoc would be unusable.
To make the demo available in as many countries as possible, we use [Cloudflare][cloudflare]. One of the [downsides][cloudflare-problems] of that is that Cloudflare intercepts all TLS traffic between your browser and the demo instance, which makes the demo unsuitable for private notes. You can of course self-host HedgeDoc to avoid all of these latency and privacy issues.

[cloudflare-problems]: https://en.wikipedia.org/wiki/Cloudflare#Controversy
[cloudflare]: https://www.cloudflare.com/
