---
title: 各种 select 标签用法记录
layout: single
---

## 1. select_tag

    class Area < ApplicationRecord
      def self.options_data
        self.order("id ASC").collect{|record| [record.name, record.id]}
      end
    end

    <%= form_tag "", method: :GET, class: "mt-4" do %>
      <%= select_tag "area_id", options_for_select(Area.options_data, params[:area_id]), include_blank: "-- 所有国家 --" %>
        --"} %>        
      <%= submit_tag "查询", class: "btn" %>
    <% end %>

## 2. f.select

    class ProductCategory < ApplicationRecord
      # Used for f.select tag
      def self.options_data
        order("id ASC").collect { |record| [record.name, record.id] }
      end
    end

    <%= form.select :product_category_id, ProductCategory.options_data, {}, {class: ""} %>

## 3. f.collection_select

    <%= f.collection_select :product_category_id, PostCategory.all, :id, :name, class: "mt-1 block w-full" %>