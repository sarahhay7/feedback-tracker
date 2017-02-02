module ApplicationHelper
  def flash_messages
    elements = flash.map do |category, message|
      content_tag(:div, message, class: "flash flash-#{category}")
    end

    safe_join elements
  end
end
