FROM caddy:2.8.4
VOLUME [ "/usr/share/caddy/config" ]
ADD Caddyfile /etc/caddy/Caddyfile
ADD data/ /usr/share/caddy