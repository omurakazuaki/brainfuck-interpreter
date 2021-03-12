FROM nginx:latest

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

ADD ./nginx /etc/nginx
ADD ./build /usr/share/nginx
