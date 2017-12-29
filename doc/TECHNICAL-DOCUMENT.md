Frontend Technical Document
===========================

## Project overview
  - Project summary

## Source control
  - GIT repository @ [http://url](http://url)

## Technical used
  - HTML5
  - CSS3
  - JavaScript
  - Build tools
    + NodeJS
    + Grunt
    + Gulp
    + Pug
    + Less
  - Frameworks
    + Bootstrap
    + jQuery
    + AngularJS
    + ReactJS
  - Plugins
    + Form validation @ [http://jqueryvalidation.org](http://jqueryvalidation.org)
    + Slider @ [http://bxslider.com](http://bxslider.com)
    + Lightbox @ [http://fancybox.net](http://fancybox.net)
    + Custom scroll @ [http://jscrollpane.kelvinluck.com](http://jscrollpane.kelvinluck.com)
    + Uploader @ [http://blueimp.github.io/jQuery-File-Upload](http://blueimp.github.io/jQuery-File-Upload)

## Web service
  - RESTFUL
  - URL @ [http://url](http://url)

## Social network integration
  - Facebook
  - Twitter
  - Youtube
  - Vimeo

## Third parties integration
  - AddThis
  - ShareThis
  - Video.js

## Web Analytics
  - Google Analytics
  - Adobe Analytics

## Browsers & Platforms supported
  - Windows 8.1, 10
    + Microsoft Internet Explorer 10, 11
    + Firefox latest
    + Chrome latest
  - Mac OSX
    + Firefox latest
    + Chrome latest
    + Safari latest

## Devices supported
  - Tablet:
    + iOS 9+ (iPad 4, iPad Air)
    + Android 4.4+ (Samsung Galaxy Tab 4 10.1)
  - Mobile:
    + iOS 9+ (iPhone 5S/6/6+)
    + Android 4.4+ (Samsung Galaxy S5/S6)

## Responsive approach
  - Breakpoints
    + Large screen: 1200 and above
    + Medium screen: 992 to 1199
    + Small screen: 768 to 991
    + Extra small screen: below 768

## Code standards
  - Follow Frontend code conventions
    + HTML/CSS/JS Checklist
    + On-page SEO Checklist
  - Follow W3C standards
    + HTML Validator [http://validator.w3.org](http://validator.w3.org)
    + CSS Validator [http://jigsaw.w3.org/css-validator](http://jigsaw.w3.org/css-validator)
    + Link Checker [http://validator.w3.org/checklink](http://validator.w3.org/checklink)
    + Web Accessibility [http://a11yproject.com](http://a11yproject.com)
  - Code quality tool
    + JSHint [http://jshint.com](http://jshint.com)
    + CSSLint [http://csslint.net](http://csslint.net)

## Security
  - Cross-Site Scripting (XSS)
  - Cross-Site Request Forgery (CSRF)

## Web performance
  - YSlow [http://developer.yahoo.com/yslow](http://developer.yahoo.com/yslow)
  - PageSpeed [https://developers.google.com/speed/pagespeed](https://developers.google.com/speed/pagespeed)

## Folder structure
```
frontend-template
    .csslintrc                   <!-- Validate css files with csslint -->
    .gitignore
    .htmlhintrc                  <!-- Validate html files with htmlhint -->
    .jshintrc                    <!-- Validate js files with JSHint -->
    .pug-lintrc                  <!-- Validate jade files with jadelint -->
    breakpoints-test.json        <!-- Configuration for testing layouts -->
    Gruntfile.js
    gulpfile.js
    package.json
    README.md
    /app                         <!-- Source code folder -->
        /assets
            /fonts               <!-- Contains font files -->
                fontawesome-webfont.ttf
                fontawesome-webfont.woff
                fontawesome-webfont.woff2
                FontAwesome.otf
            /icons               <!-- Contains favicon files -->
                favicon.ico
                apple-touch-icon-precomposed.png
            /images              <!-- Contains static image files -->
                transparent.png
                /upload          <!-- Contains dynamic image files -->
            /media               <!-- Contains audio/video files -->
        /scripts                 <!-- Contains js files -->
            l10n.js              <!-- Localization -->
            site.js              <!-- Main JavaScript file -->
            /plugins
                plugin.js        <!-- Contains all JavaScript plugins -->
            /libs
                detectizr.js
                handlebars-v4.0.5.js
                jquery-2.1.4.js
                modernizr.2.8.3.js
                /plugins         <!-- Contains all JavaScript authorized plugins -->
        /styles                  <!-- Contains all less files -->
            common.less
            editor.less
            fontface.less
            form.less
            mixin.less
            page.less
            plugin.less
            print.less
            responsive.less
            sprite.less
            structure.less
            style.less
            variable.less
            /libs                <!-- Contains library files -->
              grid.less
              libs.less
              reset.less
              util.less
            /blocks              <!-- Contains blocks/modules -->
              footer.less
              header.less
              block-1.less
        /views                   <!-- Contains jade files -->
            index.jade
            sitemap.jade
            template-layer.jade
            template-sprite.jade
            template-style-guide.jade
            /blocks              <!-- Contains blocks/modules -->
                header.jade
                footer.jade
                script.jade
            /layouts             <!-- Contains layout -->
                layout.jade
                template.jade
            /mixins              <!-- Contains mixins -->
                all.jade
                img.jade
                link.jade
                nav.jade
            /data                <!-- Data will be used by Ajax -->
                data.jade
                data.json
                data.xml
    /doc                         <!-- Contains all documents -->
        CODE-STANDARDS.md
        TECHNICAL-DOCUMENT.md
        /code-review             <!-- Contains all review code document -->
    /node_modules                <!-- All modules listed as dependencies -->
    /server                      <!-- Node server configuration -->
        index.js
        routers.js
    /static                      <!-- Static folder is generated by Grunt -->
    /test                        <!-- Write tests for qunit test and layouts test -->
        /layouts
        /qunit
    /tmp                         <!-- Contains temporary files -->
      iconfonts.less
      l10n.js
      plugin.js
      site.js
```
