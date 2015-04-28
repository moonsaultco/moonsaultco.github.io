# Get Started

### Prerequisites

* [Vagrant](https://www.vagrantup.com)
* [Virtualbox](https://www.virtualbox.org/wiki/Downloads)
* [Virtualbox Guest Plugin](http://kvz.io/blog/2013/01/16/vagrant-tip-keep-virtualbox-guest-additions-in-sync/)


### Instructions

```bash
git clone git@github.com:moonsaultco/moonsaultco.github.io.git
cd moonsaultco.github.io.git
vagrant up # some coffee, it's going to be a while
vagrant ssh

# now you are in a linux machine
cd /vagrant
python -m SimpleHTTPServer 4000

# open a new terminal window
vagrant ssh
cd /vagrant
grunt # now you are watching less files and compiling javascript

# using autoless instead of grunt for the lazy

autoless less css

```



Stock theme doc below here

# [Start Bootstrap](http://startbootstrap.com/) - [Agency](http://startbootstrap.com/template-overviews/agency/)

[Agency](http://startbootstrap.com/template-overviews/agency/) is a one page agency portfolio theme for [Bootstrap](http://getbootstrap.com/) created by [Start Bootstrap](http://startbootstrap.com/). This theme features several content sections, a responsive portfolio grid with hover effects, full page portfolio item modals, a responsive timeline, and a working PHP contact form.

## Getting Started

To use this theme, choose one of the following options to get started:
* Download the latest release on Start Bootstrap
* Fork this repository on GitHub

## Bugs and Issues

Have a bug or an issue with this theme? [Open a new issue](https://github.com/IronSummitMedia/startbootstrap-agency/issues) here on GitHub or leave a comment on the [template overview page at Start Bootstrap](http://startbootstrap.com/template-overviews/agency/).

## Creator

Start Bootstrap was created by and is maintained by **David Miller**, Managing Partner at [Iron Summit Media Strategies](http://www.ironsummitmedia.com/).

* https://twitter.com/davidmillerskt
* https://github.com/davidtmiller

Start Bootstrap is based on the [Bootstrap](http://getbootstrap.com/) framework created by [Mark Otto](https://twitter.com/mdo) and [Jacob Thorton](https://twitter.com/fat).

## Copyright and License

Copyright 2013-2015 Iron Summit Media Strategies, LLC. Code released under the [Apache 2.0](https://github.com/IronSummitMedia/startbootstrap-agency/blob/gh-pages/LICENSE) license.
