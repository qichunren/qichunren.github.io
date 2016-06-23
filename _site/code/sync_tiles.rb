require 'open-uri'

# 纬度 lat_deg -> y
# 经度 lng_deg -> x

def get_tile_number(lat_deg, lng_deg, zoom)
  lat_rad = lat_deg/180 * Math::PI
  n = 2.0 ** zoom
  x = ((lng_deg + 180.0) / 360.0 * n).to_i
  y = ((1.0 - Math::log(Math::tan(lat_rad) + (1 / Math::cos(lat_rad))) / Math::PI) / 2.0 * n).to_i
  
  {:x => x, :y =>y}
end

def tile_url(zoom, x, y)
	"http://c.tile.openstreetmap.org/#{zoom}/#{x}/#{y}.png"
end

CHINA_RECT = {:left => 72.491646, :bottom => 17.709482, :right => 135.336812, :top => 53.737864}

zoom = 8

one_file_size = 6942

min_y = get_tile_number(CHINA_RECT[:top], CHINA_RECT[:right], zoom)[:y]
max_x = get_tile_number(CHINA_RECT[:top], CHINA_RECT[:right], zoom)[:x]
max_y = get_tile_number(CHINA_RECT[:bottom], CHINA_RECT[:left], zoom)[:y]
min_x = get_tile_number(CHINA_RECT[:bottom], CHINA_RECT[:left], zoom)[:x]

tiles_count = (max_y-min_y+1)*(max_x-min_x+1)
totla_file_size = tiles_count * one_file_size / 1024.0 / 1024.0

puts "x:#{min_x} -> #{max_x}, y:#{min_y} -> #{max_y}, tiles count: #{tiles_count}, size:#{totla_file_size} M"


File.open("/home/qichunren/test.png", "w") do |f|
  f.puts open(tile_url(0, 0, 0)).read
end