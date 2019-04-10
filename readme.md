# How to use Nunjucks to render templates on the client side/in the browser

**There are two options:**
1) You can host the full Nunjucks library and load the compiler through your html page
2) You can precompile your Nunjucks templates and load slim version of Nunjucks (without the compiler) to your HTML page
    1) Precompiling templates means that before you've published your HTML page, you've compiled the templates into a single JS file, so you won't need to do that step when you're passing data and trying to render. It does require you to plan.

This will cover option #1. When I took my General Assembly course, we learned about template compiliing using Handlebars but I want to apply that same exercise using Nunjucks. Figured it should not be soo different and would be a good way to refresh/improve my knowledge on the whole templating shebang. And also as a reference when I need to use Nunjucks really easily without doing server-side stuff. Hopefully it helps someone else.

**Official Documentation:** https://mozilla.github.io/nunjucks/getting-started.html

## Prerequisites
You can use my sample folder (`simple-app`) to test or create your own. Up to you. You need an HTML page w/elements, a JS file, and data (a JSON file or a JS object).


## Step 1: Add nunjucks library to HTML page
Download the full Nunjucks library and add a reference to it at the bottom of your very simple HTML page using a `<script>` tag. The slim version won't work.
```html
<script src="nunjucks.js"></script>
<!-- will need to be self-hosted, can also use the minified version nunjucks.min.js  -->
```

### Step 2: Create the template in the HTML page
Create a nunjucks template in the HTML page by adding it to a `<script>` tag and giving it a unique id and a special value for the `type` attribute (e.g. `type="text/x-nunjucks-template"`). This is an unknown content type that the browser doesn't know what to do with it, meaning it definitely won't render it on the page, it will just ignore it. So it is a good way to hide a template from the browser but still make it accessible through JS and the DOM. More info about that can be found [here](https://johnresig.com/blog/javascript-micro-templating).
```html
<script type="text/x-nunjucks-template" id="profile">
    <div class="profile">


    {% for item in artists %}

    <h3>{{item.showName}}</h3>
        <ul>
            <li>{{item.fullName}}</li>
            <li>{{item.dob}}</li>
            <li><a href="{{item.wikipedia}}">Wikipedia Link</a></li>
            <img src="{{item.pic}}">
        </ul>
       {% endfor %}

    </div>

</script>
```

### Step 3: In your app.js, create a reference to this template using some DOM manipulation
```js
let source = document.querySelector('#profile') // we're targeting the element on the page w/the "profile" ID. This is where the nunjucks template is located
console.log(source) // this will log the template with nunjucks markup
```

### Step 4: Compile the template (referenced by source) using the templating engine... Nunjucks
This is a Nunjucks method. Behind the scenes, Nunjucks is parsing the template and then creating a function. The parsed template and markup will be wrapped in the function. In this case, Nunjucks returns an object after the compilation and that object includes the method/function that will be used in the next step.
```js
let njkTemplate = nunjucks.compile( source.innerHTML )
console.log(njkemplate)
```

### Step 5: Render your template by passing it data!
To get the final markup, we'll need to call the `.render` method on our compiled template, pass in data and create a reference to it with a variable. The `.render` method will interpolate everything, swapping the blocks/variables/stuff in the template with the data and creating something new, HTML markup.
```js
let renderedTemplate = njkTemplate.render(data)
console.log(renderedTemplate) // this will log the template and should show that the variables were replaced w/actual data

```

### Step 6: Add the rendered HTML to the page
Although we have markup (with data) that the browser can interpret, it is not currently appearing on the page. In order to place this output onto the page, we'll need to do some DOM manipulation, similar to when we started.
```js
 document.querySelector('.content').innerHTML = renderedTemplate // we're targeting the element on the page w/this "content" classname. This is where we'll insert our rendered template on the page
```

### Step 7: Reload the page
Once you save your HTML and JS file, when you load the `index.html` page you should see updated markup with data injected on the page.


## Other Resources
I will say that a lot of templating primers are not as "plain language" as I'd like but I've added these links because I think they're helpful collectively, especially the Smashing Magazine one.
- [Client-side Templating from Smashing Magazine](https://www.smashingmagazine.com/2012/12/client-side-templating/)
- [Intro to micro-templating](https://johnresig.com/blog/javascript-micro-templating)
- [Basics of JS templating](https://css-tricks.com/video-screencasts/127-basics-of-javascript-templating/)
- [Precompiled templates w/handlebars](https://nuunoo.wordpress.com/2013/06/08/javascript-pre-compiled-templates-with-handlebars-js/)
- [Stackoverflow: differentiating parsing, compiling, and rendering] (https://stackoverflow.com/questions/9384650/difference-between-compile-parse-and-render-in-mustache-js)
---
