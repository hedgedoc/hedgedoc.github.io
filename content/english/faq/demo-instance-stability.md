---
title: How stable is the demo instance? 
---

The demo instance runs the latest master branch. But generally speaking over the past year, we had a wonderful uptime score and the number of times we were contacted about problems with the demo instance should be countable with one, maximum two hands.

We also don’t delete notes there intentionally, so from that perspective you don’t have to expect your notes to be lost every week. **BUT** and that should be said, we also don’t guarantee that your notes won’t be lost. After all, it’s unstable code, and it might do rather weird things. We have daily backups, but we try to avoid using them.

Also we explicitly don’t recommend the demo instance for personal notes. Main reason here: It uses [Cloudflare][cloudflare]. Cloudflare has its very own [share of problems][cloudflare-problems], one being that it’s intercepting all TLS traffic between your browser and the demo instance. This allows us to provide the demo instance even in countries that otherwise would have a too high latency to try HedgeDoc in any useful way, but of course has the downside of being rather insecure when it comes to actual privacy. We think for a demo instance that’s an acceptable trade, but in general we recommend running an own HedgeDoc instance.

So yes, all in all: Code-wise the demo instance acts as a testing platform. Privacy-wise it’s to consider public but overall if you just need a few notes you want to edit together with your friends, it’s definitely a fine choice to use the demo instance.

[cloudflare-problems]: https://en.wikipedia.org/wiki/Cloudflare#Controversy
[cloudflare]: https://www.cloudflare.com/
