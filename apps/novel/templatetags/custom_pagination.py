from django import template

register = template.Library()


def custom_pagination(current_page, num_pages, adjacent_pages=2):
    start_page = max(current_page.number - adjacent_pages, 1)
    end_page = min(current_page.number + adjacent_pages, num_pages)

    page_numbers = list(range(start_page, end_page + 1))

    # Add first and last pages if they are not already included
    if 1 not in page_numbers:
        page_numbers.insert(0, 1)
    if num_pages not in page_numbers:
        page_numbers.append(num_pages)

    return page_numbers


register.filter('custom_pagination', custom_pagination)
