Quickstart

```
nvm use --delete-prefix v6.10.0
npm install -g @angular/cli
ng new angular-cli-i18n-sample
cd angular-cli-i18n-sample

echo <h1 i18n>Hello world</h1> >> src/app/app.component.html
ng xi18n --locale en --output-path src/i18n --out-file messages.en.xlf 
ng xi18n --locale ja --output-path src/i18n --out-file messages.ja.xlf 
ng xi18n --locale ko --output-path src/i18n --out-file messages.ko.xlf 
ng xi18n --locale zh --output-path src/i18n --out-file messages.zh.xlf 
ng xi18n --locale zh-TW --output-path src/i18n --out-file messages.zh-TW.xlf 
ng xi18n --locale zh-CN --output-path src/i18n --out-file messages.zh-CN.xlf
# EDIT src/i18n/messages.$lang.xlf FILE to replace <target/> with <target>...</target>
for lang in en ja ko zh zh-TW zh-CN
do
    ng build --output-path=dist/$lang \
             --aot \
             -prod \
             --bh /$lang/ \
             --i18n-file=src/i18n/messages.$lang.xlf \
             --i18n-format=xlf \
             --locale=$lang;
done
cd dist

npm install -g http-server
http-server

# open another terminal
curl http://localhost:8080/en/
curl http://localhost:8080/ja/
curl http://localhost:8080/ko/
curl http://localhost:8080/zh/
curl http://localhost:8080/zh-TW/
curl http://localhost:8080/zh-CN/
```

Note

* Use Apache2 to detect accept-language and then to rewrite request path


Apache2 Configuration

```
<VirtualHost *:80>
  ServerName www.myapp.com
  DocumentRoot /var/www
  <Directory "/var/www">
    RewriteEngine on
    RewriteBase /
    RewriteRule ^../index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule (..) $1/index.html [L]
    RewriteCond %{HTTP:Accept-Language} ^ja [NC]
    RewriteRule ^$ /ja/ [R]
    RewriteCond %{HTTP:Accept-Language} ^ko [NC]
    RewriteRule ^$ /ko/ [R]
    RewriteCond %{HTTP:Accept-Language} ^zh-TW [NC]
    RewriteRule ^$ /zh-TW/ [R]
    RewriteCond %{HTTP:Accept-Language} ^zh-CN [NC]
    RewriteRule ^$ /zh-CN/ [R]
    RewriteCond %{HTTP:Accept-Language} !^ja [NC]
    RewriteCond %{HTTP:Accept-Language} !^ko [NC]
    RewriteCond %{HTTP:Accept-Language} !^zh-TW [NC]
    RewriteCond %{HTTP:Accept-Language} !^zh-CN [NC]
    RewriteRule ^$ /en/ [R]
  </Directory>
</VirtualHost>
```

Reference

* https://medium.com/@feloy/deploying-an-i18n-angular-app-with-angular-cli-fc788f17e358

Example ng app

* ngapp/
