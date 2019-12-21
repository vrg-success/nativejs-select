[![npm version](https://badge.fury.io/js/nativejs-select.svg)](https://badge.fury.io/js/nativejs-select)

# nativejs-select
![alt text](https://github.com//FrontendMetis/nativejs-select/blob/master/devserver/img/nativejs-select.png?raw=true)

**Why do I need use this?**
I made this plugin for me, because I don't need analogs with big size, the plugin have size only 6kb and have required options, the plugin written in Typescript without boilerplate

**Getting started**
```
yarn add nativejs-select 
// or
npm install nativejs-select
```

```
<select class="customSelect">
    <option value="react">React</option>
    <option value="vue">Vue</option>
    <option value="svelte">Svelte</option>
</select>
```


```
import NativejsSelect from 'nativejs-select';
// or
const NativejsSelect = require('nativejs-select');
// Default styles
import 'nativejs-select/build/nativejs-select.css';


new NativejsSelect({
  selector: '.customSelect'
});
```

**Options** 

| Name | Type | Desc |
| -------- | -------- | -------- | 
| selector  | string  | selector of native select which you want to custom |
| placeholder?  | string  | display default placeholder after init |
| fixedPlaceholder? | string  | fixed placeholder |
| disableMobile? | boolean  | disable castomization in mobile devices for better accessibility |
| renderOptions? | (option: HTMLElement, index: number, length: number) => string | you can render options like you want |

**Html options** 

| Name | 
| -------- | 
| data-placeholder  | 
| data-fixed-placeholder |

**Cross-browser testing provided by** \
<a href="https://www.browserstack.com/" target="_blank">
  <img width="222px" src="https://i1.wp.com/www.diogonunes.com/blog/wp-content/uploads/2016/07/browserstack-logo.png?resize=840%2C276">
</a>
