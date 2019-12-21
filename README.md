**Updated: 2019/11/23**

**Version: 1.0**

**Author: Dao Ngoc Lam**

**Note:**
Trong trường hợp muốn sử dụng container để deploy web frontend và web backend, vui lòng bỏ comment các component web-frontend và web-backend và thêm vào ssh-node dựa trên web-frontend và web-backend


## bước 1: khởi động database container 
Tại thư mục chứa file docker-compose, chạy command:

```
docker-compose up
```

Hoặc để chạy ẩn docker-compose, chạy một trong 2 lệnh sau

```
docker-compose up -d 
```
hoặc <br/>
```
docker-compose start
```

## bước 2: tạo database

**Note**:
Chỉ cần làm bước này lần đầu tiên, hoặc trong trường hợp database đã bị xóa <br/>
Trong trường hợp chưa cài đặt mysql trong máy, có thể sử dụng admnider đã được cài sẵn trong container tại địa chỉ: 172.10.10.11:8080 hoặc localhost/8080 (đã được mount với port của local) <br/>

truy cập vào database với các thông số sau:
> server: 172.10.10.10 <br/>
> username: root <br/>
> password: mypasswd <br/>

tạo database có tên:

> db: mydb <br/>

## step 3: khởi động
Chạy các câu lệnh sau **tại thư mục sshmanager**: <br/>
***Khởi động web server***
```
cd server
node index.js
```
***Khởi động ssh node***
```
cd ssh-node
node SshClient.js
```
***Khởi động web frontend***
```
cd client
npm start
```

## Lưu ý khác:
1. Các file hoặc folder quan trọng chạy trong docker đã được mount với file/folder quan trọng trên local. Vì vậy, không cần lo lắng việc sau dữ liệu bị mất sau khi tắt container <br/>
2. địa chỉ IP của container đã được cài đặt cố định, vì vậy không cần thay đổi cài đặt trong file .env khi khởi động lại container <br/>
3. Để tiết kiệm tài nguyên máy, có thể tắt container sau khi sử dụng bằng command <br/>
```
docker-compose down -d
```
hoặc chỉ để tắt tạm thời (container sẽ khởi động lại sau khi restart máy) <br/>
```
docker-compose down
```