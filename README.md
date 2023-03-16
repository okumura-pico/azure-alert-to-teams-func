# Sample implementation of Azure Functions App for posting alert to teams

Azure Monitor Alert を Teams へ投稿する Azure Functions App です。

## Getting Started

Get source codes.

```console
git clone https://github.com/okumura-pico/azure-alert-to-teams-func.git
```

Install packages.

```console
npm install
```

Create **local.settings.json** file.

```console
cp local.settings.sample.json local.settings.json
vi local.settings.json
```

Run function locally. You might see the url.

```console
npm run start
```

Post sample data to the url.

## How to deploy

There are several options.

1. Run GitHub workflow
2. Use azure-function-core-tools

and so on.
