# Bonsai Writer News Service

[![](https://img.shields.io/github/actions/workflow/status/neknalb/bonsai-writer-news-service/test-and-deploy.yaml?style=flat)](https://github.com/neknalb/bonsai-writer-news-service/actions/workflows/test-and-deploy.yaml)

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

## Deploying

For deploying to [Deno Deploy](https://deno.com/deploy) you need to setup an
account first.

### From your local machine

If you want to deploy from your local machine you can simply call
`deployctl deploy`. This will open a website in your browser for authorization.
To streamline deployment you can also set the required token as an environment
variable on your machine.

### GitHub Actions and GitLab CI/CD

Ensure that you have the necessary permissions and configurations set up in
GitHub or GitLab. This includes providing the access token from Deno Deploy as a
variable with key `DENO_DEPLOY_TOKEN`.

Pushes to any branch trigger the pipeline to lint, test and deploy. Pushes to
the the `main` branch are deployed to production.
