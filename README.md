# Updated: 2019/11/23
# Version: 1.0
# Author: Dao Ngoc Lam

*Note: - because of error, front and back haven't been on docker-compose, you can run its locally and work with database normaly
       - container limit was 500MB, if you want more, changed on docker-compose.yml, field name "mem_limit"

step1: start docker
> "docker-compose up" or "docker-compose start" to start mysql and adminer container 

step2: connect to adminer
> on browser, go to ip address 172.10.10.11:8080 or 127.0.0.1:8080
> fill the box follow:
       server: 172.10.10.10
       username: root
       password: mypasswd
       db: mydb
Note: - adminer is a database connect tool debug and easily checking database
      - you can skip and do this step late

step3: connect to mysql
> there are some information of database:
       server(endpoint): 172.10.10.10
       username: root
       password: mypasswd
       db: mydb
Note: - a volume /docker/mysql has been mounted to mysql container for saving data after container down
      - there are some file with root owner, so you need sudo to add and commit

step4: shutdown container
> after work, you can run "docker-compose down -v" to shutdown all container
