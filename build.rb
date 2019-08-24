#!/usr/bin/env ruby

d = File.expand_path("..", File.dirname(__FILE__))
Dir.glob(d + "/*").each do |file|
  
  if !file.end_with?("/src")
    puts "Remove #{file}"
    system("rm -rf #{file}")
  end

end

puts "Run cd src && jekyll build && cp -r _site/* .."