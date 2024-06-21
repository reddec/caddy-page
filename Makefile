dev:
	docker run --rm -p 8080:80 -v $(PWD)/data:/usr/share/caddy:ro -v $(PWD)/Caddyfile:/etc/caddy/Caddyfile:ro caddy