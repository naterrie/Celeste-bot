NAME = boted

all: $(NAME)

$(NAME):
	docker build -t $(NAME) .

js:
	node main.js

fclean: clean
	docker system prune -f --all

re: fclean all

.PHONY: all clean fclean re down
