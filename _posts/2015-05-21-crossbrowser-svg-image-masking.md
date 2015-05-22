---
layout: post
title: Masking images with SVG
subtitle: a cross-browser safe way to mask images with svg
---

I went through a bunch of trouble trying to figure out how to create a crossbrowser solution to making images with SVG.  Initially I looked into css3 clipping and masking properties which are beautify and modern solutions.  The catchall solution is actually embedding the image and a clip path in an SVG element.  Then you apply the clippath to the element and ta-da!  You have a crossbrowser solution to masking images.

{% highlight html %}
<svg class="employee-headshot" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1">
  <g>
    <!-- Make sure to give the clipPath an id, it is used to reference the shape -->
    <clipPath id="employee-clip">
      <polygon transform="translate(194.000000, 194.000000) rotate(-15.000000) translate(-194.000000, -194.000000) " points="194 -6 367.205081 94 367.205081 294 194 394 20.7949192 294 20.7949192 94"></polygon>
    </clipPath>
  </g>
  <!-- embed the image in the svg, then referencet the shape above in the clip-path attribute -->
  <image clip-path="url(#employee-clip)" height="100%" width="100%" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/images/person.jpg"></image>
</svg>
{% endhighlight %}
