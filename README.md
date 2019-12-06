
## Test support 
<a href="https://www.browserstack.com/" target="_blank">
  <img width="222px" src="https://i1.wp.com/www.diogonunes.com/blog/wp-content/uploads/2016/07/browserstack-logo.png?resize=840%2C276">
</a>


# nativejs-select
![alt text](https://pp.userapi.com/c847017/v847017112/1277ed/rsPTnZHIeiA.jpg)
## How To Use Plugin
1. Connect css file: `<link rel="stylesheet" href="css/nativejs-select.css">` or copy the code and insert in your CSS file
2. Connect js file: `<script href="js/nativejs-select.min.js"></script>`
3. Add HTML code:
```
  <select name="technologies" class="js-custom_select">
    <option value="1">Vue.js</option>
    <option value="2">React.js</option>
    <option value="3">Angular.js</option>
  </select>
```
4. You can add attribute `selected` to set value by default on placeholder
## How Customization Select
Just take select attribute name value + _select and you get selector by class `.technologies_select`
## Data attributes
`data-placeholder="technologies"` sets the placeholder after clicking on the option the placeholder hides </br>
`data-fixed-placeholder="technologies"` sets the placeholder after clicking on the option the placeholder remains
## Render selects after add new
If you added dynamic select just call the function `renderSelects();`
