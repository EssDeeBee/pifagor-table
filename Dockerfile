FROM nginx
COPY ./public/* /usr/share/nginx/html/
EXPOSE 80
EXPOSE 443