# Personal Website

This site has been in-development since 2013, and I've moved the project to GitHub pages since 2016. I've learnt an incredible amount over the past decade and this site represents my continued learning over the years. I haven't kept up with updating it frequently enough to be an accurate representation, so be wary, haha!

I have great ideas for it now that I'm working on implementing - I want to add content that shows off who I am as a human, not just on what I do in my career. I'm excited to see how this will evolve with my career and learning.

I've kept this relatively simple at the moment. I'm using Parcel to optimize and bundle everything under `dist/` which then gets published to the branch `gh-pages` by itself (thanks to `push-dir`) which is served by GitHub. I've been using a lot of Tailwind lately in production projects and loving how much I can trim down my CSS to the essentials and keep it maintainable, so I've used it here. The javascript footprint is pretty small as well. I'm also using Cloudflare for SSL/TLS, caching/CDN, analytics, and a few security features.