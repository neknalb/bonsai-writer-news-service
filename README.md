# Bonsai Writer News Service

News about development on Bonsai Writer provided via a simple REST API. Actually
there's only one single GET endpoint (`/news`) that provides all available news.

I developed it as an exercise for myself, as a kind of “coding kata”.

The deployed API is used by my
<a class="anchor" href="https://github.com/neknalb/bonsai-writer-website-rebuild">Bonsai
Writer Website Rebuild</a>.

## Getting started

Run server:

```
deno task start
```

Run tests:

```
deno test -N
```
