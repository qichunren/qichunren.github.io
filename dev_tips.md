---
layout: default
title: Development Tips
---

<div class="max-w-md mx-auto ">
{% for dev_tip in site.dev_tips %}
<div class="py-2 border-b border-gray-200 ">
  <h3>
    <a href="{{ dev_tip.url }}">
      {{ dev_tip.title }}
    </a>
  </h3>
</div>  
{% endfor %}
</div>