---
title: Ruby heredoc
layout: single_dev_tips
---

When you want to define multiline strings in Ruby, we can use ruby heredoc in the following way:

```rb
a_string = (<<~MSG)
This is a heredoc example.
#{Time.now}
MSG
```

Though there are serval ways to define heredoc, but I think the foregoing way should be the primary way.

```ruby
str = <<HEREDOC
This is
a sample
text.
HEREDOC
```

---

```ruby
str = <<-HEREDOC
This is
a sample
text.
HEREDOC
```

---

```ruby
str = %Q(
This is
a sample
text.
)
```
