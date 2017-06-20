Image

```
httpd:2.4.25-alpine
```

Inject httpd.conf and web application via volume

```
docker run -dit -p 8000:80 -v "$PWD/htdocs":/usr/local/apache2/htdocs/ -v "$PWD/conf":/usr/local/apache2/conf/ httpd:2.4.25-alpine
```
