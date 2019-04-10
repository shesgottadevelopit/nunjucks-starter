// a simple nunjucks template

const data = {
    artists: [
        {
            pic:"https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Ftimedotcom.files.wordpress.com%2F2018%2F09%2Frihanna-barbados-ambassador.jpg&w=800&c=sc&poi=face&q=85",
            wikipedia: "https://en.wikipedia.org/wiki/Rihanna",
            showName: "Rihanna",
            fullName: "Robyn Rihanna Fenty",
            dob: "February 20, 1988"
        },
        {
            pic:"https://s3.r29static.com//bin/entry/b30/340x408,80/2157147/reebok-addresses-that-beyonc-rumor-2157147.jpg",
            wikipedia: "https://en.wikipedia.org/wiki/Beyonc%C3%A9",
            showName: "Beyonce",
            fullName: "Beyoncé Giselle Knowles-Carter",
            dob: "September 4, 1981"
        },
        {
            pic: "https://www.billboard.com/files/styles/article_main_image/public/media/megan-thee-stallion-press-photo-2018-cr-DHinez-billboard-1548.jpg",
            wikipedia: "https://en.wikipedia.org/wiki/Megan_Thee_Stallion",
            showName: "Megan Thee Stallion",
            fullName: "Megan Pete",
            dob: "February 15, 1995"
        }


    ]
}

// the nunjucks script was added to the html, and logging it in the console should return the nunjucks object
console.log(nunjucks)

// create the nunjucks template in the script tags

/*-----------------EXAMPLE
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
</script>*/


// 1. get the template source
let source = document.querySelector('#profile') // this ID should be unique and correspond to the ID you've added to your template

 // 2. compile the template into a template function
let profileTemplate = nunjucks.compile( source.innerHTML ) // this template function is tied to a nunjucks object.
console.log(profileTemplate)


// 3. render the compiled template, passing in data and letting that data get interpolated
let renderedTemplate = profileTemplate.render(data)


// 4. Add our rendered HTML to the page
 document.querySelector('.content').innerHTML = renderedTemplate // the .content class corresponds to the element with that classname. The rendered template will now appear in this element

 console.log(source)
 console.log(renderedTemplate)
