#!/usr/bin/env ruby

d = File.expand_path("..", File.dirname(__FILE__))
Dir.glob(d + "/*").each do |file|
  
  if !file.end_with?("/src")
    puts "Remove #{file}"
    sysmte("rm -rf #{file}")
  end
end