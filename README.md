
<p align="center">
    <img src="https://raw.githubusercontent.com/thoughtspot/visual-embed-sdk/main/static/doc-images/images/TS-Logo-black-no-bg.svg" width=100 align="center" alt="ThoughtSpot" />
</p>

<br/>

# ThoughtSpot Visual Embed SDK  [![Coverage Status](https://coveralls.io/repos/github/ts-blink/embed-sdk/badge.svg?branch=main)](https://coveralls.io/github/ts-blink/embed-sdk?branch=main) ![npm (scoped with tag)](https://img.shields.io/npm/v/@thoughtspot/visual-embed-sdk) [![](https://data.jsdelivr.com/v1/package/npm/@thoughtspot/visual-embed-sdk/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@thoughtspot/visual-embed-sdk)

SDK to embed ThoughtSpot into your web apps.

<br/>

## Usage

The SDK is compatible with ThoughtSpot SW version >= 7.1 and ThoughtSpot Cloud.

Install the Visual Embed SDK from [NPM](https://www.npmjs.com/package/@thoughtspot/visual-embed-sdk):

```
npm i @thoughtspot/visual-embed-sdk
```

The SDK is written in TypeScript and is also provided both as ES Module (ESM) and Universal Module Definition (UMD) modules, allowing you to use it in a variety of environments. For example,...

```js
// ESM via NPM
import * as TsEmbedSDK from '@thoughtspot/visual-embed-sdk';

// NPM <script>
<script src='https://cdn.jsdelivr.net/npm/@thoughtspot/visual-embed-sdk/dist/tsembed.js'></script>

// ES6 from web
import { PinboardEmbed, AuthType, init } from 'https://cdn.jsdelivr.net/npm/@thoughtspot/visual-embed-sdk/dist/tsembed.es.js';
```
<br/>

## Live Playground

Visit our [code playground](https://try-everywhere.thoughtspot.cloud/v2/#/everywhere).

<br/>

## Full API Reference

- Detailed [developer guide](https://try-everywhere.thoughtspot.cloud/v2/#/everywhere/documentation/en/?pageid=getting-started).
- Please visit our [API reference docs](https://docs.thoughtspot.com/visual-embed-sdk/release/typedoc/modules.html). 

<br/>

## Quick Start

The ThoughtSpot Embed SDK allows you to embed the ThoughtSpot search experience,
pinboards, visualizations or the even full app version.

### Embedded Search

```js 
// NPM
import { SearchEmbed, AuthType, init } from '@thoughtspot/visual-embed-sdk';
// or ES6
// import { SearchEmbed, AuthType, init } from 'https://cdn.jsdelivr.net/npm/@thoughtspot/visual-embed-sdk/dist/tsembed.es.js';

init({
    thoughtSpotHost: '<%=tshost%>',
    authType: AuthType.None,
});

const searchEmbed = new SearchEmbed(document.getElementById('ts-embed'), {
    frameParams: {
        width: '100%',
        height: '100%',
    },
});

searchEmbed.render();
```

### Embedded Pinboard & Visualization

```js
// NPM
import { PinboardEmbed, AuthType, init } from '@thoughtspot/visual-embed-sdk';
// or ES6
// import { PinboardEmbed, AuthType, init } from 'https://cdn.jsdelivr.net/npm/@thoughtspot/visual-embed-sdk/dist/tsembed.es.js';

init({
    thoughtSpotHost: '<%=tshost%>',
    authType: AuthType.None,
});

const pinboardEmbed = new PinboardEmbed(
    document.getElementById('ts-embed'),
    {
        frameParams: {
            width: '100%',
            height: '100%',
        },
        pinboardId: '<%=pinboardGUID%>',
        vizId: '<%=vizGUID%>',
    },
});

pinboardEmbed.render();
```

### Embedded Full App

```js
// NPM
import { AppEmbed, Page, AuthType, init } from '@thoughtspot/visual-embed-sdk';
// or ES6
// import { AppEmbed, AuthType, init } from 'https://cdn.jsdelivr.net/npm/@thoughtspot/visual-embed-sdk/dist/tsembed.es.js';

init({
    thoughtSpotHost: '<%=tshost%>',
    authType: AuthType.None,
});

const appEmbed = new AppEmbed(
    document.getElementById('ts-embed'),
    {
        frameParams: {
            width: '100%',
            height: '100%',
        },
        pageId: Page.Data,
    });

appEmbed.render();
```

## React Components

All the above flavors of embedding are also provided as React components for your convenience.
The constructor options are passed as props and the event listeners can be attached using `on<EventName>` convention.

### Search Component
```js
import { init } from '@thoughtspot/visual-embed-sdk';
import { SearchEmbed } from '@thoughtspot/visual-embed-sdk/react';

init({
    thoughtSpotHost: '<%=tshost%>',
    authType: AuthType.None,
});

const MyComponent = ({ dataSources }) => {
    const onCustomAction = (actionEvent) => {
        // Do something with actionEvent.
    };
    
    return <SearchEmbed dataSources={dataSources} onCustomAction={onCustomAction} />
}
```

### 

<br/>
<br/>

Visual-Embed-SDK, © ThoughtSpot, Inc. 2021
