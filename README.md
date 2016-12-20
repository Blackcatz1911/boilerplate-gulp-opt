# PP HTML5 - GULP Boilerplate

## Introduction

This boilerplate has the ability to increase the product quality of static html pages and simultaneously decrease the amount of time to build it.

## Features

*	bower dependencies
*	CSS minification
*	SCSS
*	JS minification
*	HTML minification
*	Image optimisation
*	Sprite generation
*	Dev mode without any minifications
*	Livereload without browser plugin
*	** Above the fold optimisation ** to max out Google Page Speed rankings
*	TWIG with json data sources

## Folders

*	**src** : your source foler - put your code here!
	* **data** : put your source json files for twig here - same name as ther twig file but .json
	*  **fonts** : your custom fonts
	*  **images** : your images, except the ones that should be compiled to sprites
	*  layouts : suggestion as folder for twig layouts - you can rename it but layouts cant be at root level
	*  partials : suggestion as folder for html partials - you can rename it but partials cant be at root level
	*  **scripts** : your custom js files
	*  **sprites** : images that should be compiles as sprites
	*  **styles** : your scss / css files
*	**dev** : the developement build - readonly
    * ...
    * **vendor** : all css and js files from bower end up here
*	**dist** : the final hardcore optimized build - readonly
    * ...


## Installation

    npm install bower -g    # If not allready installed
    npm install
    bower install
    
## Basic settings

There are some basic settings in the **gulpfile.js** file:

	var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];  // browsers to add prefixes for
	var siteUrl = "http://www.example.com";	 // your site url
	var optimizeDimensions = [{
	    height: 600,
	    width: 500
	}, {
	    height: 900,
	    width: 1200
	}];  // browser dimensions to optimize ATF CSS for
	
## Commands

*   Build Dev

        gulp
*   Watch & Livereload
        
        gulp watch
    
* Build for production
    
        gulp build

## Asset inclusion

You have to follow some simple rules regarding the inclusion of assets - everything else is managed by gulp

### Include stylesheets  & vendor stylesheets

    <!-- build:css styles/styles.css -->
    <link href="vendor/one.css" rel="stylesheet">
    <link href="styles/two.css" rel="stylesheet">
    <!-- endbuild -->
    
``one.css`` and ``two.css`` will be combined into ``styles/styles.css`` at dist-build time but stay seperate for developement
If you want to have multiple combined stylesheets simply use multiple _build:css_ blocks with different target file names.
Use bower_component stylesheets by prefixing the raw file name with vendor/ . Gulp automaticly copies all stylesheets to the dev/vendor foler.

### Include scripts & vendor scripts

    <!-- build:js scripts/app.js -->
    <script type="text/javascript" src="vendor/jquery.js"></script>
    <script type="text/javascript" src="scripts/one.js"></script>
    <script type="text/javascript" src="scripts/two.js"></script>
    <!-- endbuild -->

``one.css``, ``jquery.js`` and ``two.css`` will be combined into ``scripts/app.js`` at dist-build time but stay seperate for developement
If you want to have multiple combined scripts simply use multiple _build:js_ blocks with different target file names.
Use bower_component scripts by prefixing the raw file name with vendor/ . Gulp automaticly copies all scripts to the dev/vendor foler.

### Include HTML Files

    <div>
        @@include("partials/partial.html")
    </div>
    
Make sure to to put all partials in subfolders to prevent gulp from copying to the dist environment.

### Use Sprites
To use sprites first put all image seperatly into the **sprites/** folder.
Then use this css:

    background-image: url("../sprites/img2.png");  /* @meta {"sprite": {"skip": false}} */
    
Be careful to only use ``background-image`` as ``background`` will not work. The whitespace between _:_ and _url_ is also a common pitfall - make sure there is one.

## TWIG

Take a look at 
https://github.com/zimmen/gulp-twig 
and 
https://github.com/colynb/gulp-data

# Author 
Korbinian Würl

# License
[MIT License](http://en.wikipedia.org/wiki/MIT_License "Wiki: MIT License")
