#!/usr/bin/env ruby

d = File.expand_path("..", File.dirname(__FILE__))
Dir.glob(d + "/*").each do |file|
  if file != 'src'
    sysmte("rm -rf #{file}")
  end
end

