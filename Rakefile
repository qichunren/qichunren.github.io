# encoding: utf-8
class String
  def to_url
  	self.downcase.gsub(/[^a-z0-9]+/i, '-')
  	self
  end 
end

task :new do
  puts "Please type post url slug:"
  url = STDIN.gets.chomp #TODO: chage url to url_like 
  url = url.to_url
                        
  puts "Please type post category:"
  category = STDIN.gets.chomp 
  
  puts "Please type post title:"
  title = STDIN.gets.chomp 
  
  if File.exists?("_posts/#{category}")
    FileUtils.cd "_posts/#{category}"
    File.open("#{Time.now.strftime('%Y-%m-%d')}-#{url}.md", "w") do |f|
      f.puts <<-CONTENT
---
layout: post
title: #{title}
category: #{category}
---        

    
      CONTENT
    end
  else 
    FileUtils.mkdir_p "_posts/#{category}"
    
    FileUtils.cd "_posts/#{category}"
    File.open("#{Time.now.strftime('%Y-%m-%d')}-#{url}.md", "w") do |f|
      f.puts <<-CONTENT
---
layout: post
title: #{title}
category: #{category}
---        
      
      
      CONTENT
    end
  end
  
end

task :build_wikis do
  require 'github/markup'
                                    
  File.open("wikis/2011-05-06-use_ab_for_request_performance_test.html", "w") do |f|
    f.puts GitHub::Markup.render("wikis/2011-05-06-use_ab_for_request_performance_test.html", File.read("origin_wikis/2011-05-06-use_ab_for_request_performance_test.md"))  
  end
  
  # markup(:markdown, /md|mkdn?|markdown/) do |content|
  #   Markdown.new(File.read("origin_wikis/2011-05-06-use_ab_for_request_performance_test.md")).to_html
  # end   
  
end