SELECT employee. AS movie, reviews.review
FROM department
LEFT JOIN employees
ON reviews.movie_id = movies.id
ORDER BY employee.last_name;
