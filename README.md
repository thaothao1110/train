## Frontend template
  - Frontend template using HTML5/CSS3/JavaScript techniques
  - Technologies used:
    * [Pug](http://jade-lang.com)
    * [Less](http://lesscss.org)
    * [jQuery](http://jquery.com)
    * [Handlebars](http://handlebarsjs.com)
    * [Grunt](http://gruntjs.com)
    * [Node.js](http://nodejs.org)

## IDE Configuration
- Open Sublime Text
- Choose Preferences -> Settings - User
- The number of spaces a tab is considered equal to "tab_size": 2
- Set to true to insert spaces when tab is pressed "translate_tabs_to_spaces": true
- Set to true to removing trailing white space on save "trim_trailing_white_space_on_save": true
- Set to true to ensure the last line of the file ends in a newline character when saving "ensure_newline_at_eof_on_save": true

## Installation
### Install Node.js
  - Download [Node.js](http://nodejs.org)
  - Ensure you have administrator role when install to set the PATH environment variable

### Install Grunt and Gulp
  - Open Command Line and run
	* npm install -g gulp
    * npm install
    * npm install grunt-cli -g

## Development
  - grunt (Please make sure your antivirus ignore JS for convert font files in node_modules folder first)

## Testing
  - grunt qunittest for using qunit
  - grunt layouts for testing all breakpoints(desktop, tablet, mobile,...) of layouts
    + layout:desktop for testing desktop only
    + layout:tablet for testing tablet only
    + layout:mobile for testing mobile only
    + ...

## Release
  - grunt release

## Deploy
  - grunt deploy for pushing to gh-pages branch

## Documentation
  - grunt doc

## Notes
  - Use **rimraf** to delete **node_modules** folder. See [rimraf](https://github.com/isaacs/rimraf)
