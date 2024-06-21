# Caddy Page

Caddy Page is a minimalist start page designed for simplicity and speed. This project aims to provide a clean and efficient browsing experience, focusing on performance and configurability.

There are dozens (maybe hundreds) of them, this is just yet another one.

![image](https://github.com/reddec/caddy-page/assets/6597086/3b3090a1-608c-4088-ba44-3b49b462c097)

![Screencastfrom2024-06-2122-39-06-ezgif com-video-to-gif-converter](https://github.com/reddec/caddy-page/assets/6597086/513c1c27-024a-455b-9d80-ee7bded69011)

## Features

* Minimalistic Design: straightforward interface that emphasizes usability and aesthetics.
* No JavaScript: rhe start page can function without JavaScript, though the search feature requires it.
* Powered by Caddy Server
* Easy to extend and configure: nothing else then just plain JS, CSS, and server-side templates.
* **Multi-Term Search**: supports advanced search functionality where each term (word, separated by space) sequentially enhances the filter, providing more precise results. Keyboard friendly (`/` to open search, `enter` to open link, `esc` to close)
* Fast and lightweight: designed to be quick and responsive, keeping in mind a smooth user experience even on slower connections.

## Deploy

    docker run --rm -p 8080:80 -v $(pwd)/config.json:/usr/share/caddy/config/config.json:ro ghcr.io/reddec/caddy-page


__Demo mode__

    docker run --rm -p 8080:80 ghcr.io/reddec/caddy-page

## Configuration

**Simple**

Sample `config.json`

```json
{
    "title": "Start page",
    "links": [
        {
            "name": "Google",
            "href": "https://google.com",
            "tags": [
                "search",
                "find"
            ]
        },
        {
            "name": "DuckDuckGo",
            "href": "https://ddg.gg",
            "tags": [
                "search",
                "find",
                "free",
                "ddg",
                "privacy"
            ]
        },
        {
            "name": "GitHub",
            "href": "https://github.com",
            "tags": [
                "git"
            ]
        },
        {
            "name": "Codeberg",
            "href": "https://codeberg.org/",
            "tags": [
                "git",
                "open-source",
                "free"
            ]
        }
    ]
}
```

- `title` (string): title and name of page
- `links` (array): array of links

Each link:

- `name` (string): visible name of entry
- `href` (string): remote link
- `tags` (array of string): **optional** tags which can be used during search


**Deep dive**

To customize the start page, you can modify the HTML and CSS files according to your preferences. The structure is simple and well-documented to facilitate easy changes.

## TLS

Caddy supports TLS by default. Just update Caddyfile. For example:


**Caddyfile**
```
example.com {
        root * /usr/share/caddy/

        handle_path /static/* {
            root * /usr/share/caddy/static
            file_server
        }

        handle / {
            root * /usr/share/caddy/templates
            file_server
            templates {
                root /usr/share/caddy/config
            }
        }
}
```

and run it as


    docker run --rm -p 80:80 -p 443:443 -v $(pwd)/Caddyfile:/etc/caddy/Caddyfile:ro -v $(pwd)/data:/data -v $(pwd)/config.json:/usr/share/caddy/config/config.json:ro ghcr.io/reddec/caddy-page


- `$(pwd)/data:/data` needed for TLS cache

## Contribution

Contributions are welcome! If you have ideas for improvements or new features, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.