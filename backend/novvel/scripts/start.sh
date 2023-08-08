#!/usr/bin/env bash

PROJECT_ROOT="/home/ubuntu"
JAR_FILE="$PROJECT_ROOT/spring-webapp-0.0.1.jar"
SSL_JAR_FILE="$PROJECT_ROOT/ssl-spring-webapp.jar"

APP_LOG="$PROJECT_ROOT/application.log"
ERROR_LOG="$PROJECT_ROOT/error.log"
DEPLOY_LOG="$PROJECT_ROOT/deploy.log"
SSL_APP_LOG="$PROJECT_ROOT/ssl_application.log"
SSL_ERROR_LOG="$PROJECT_ROOT/ssl_error.log"

TIME_NOW=$(date +%c)

# build 파일 복사
echo "$TIME_NOW > $JAR_FILE 파일 복사" >> $DEPLOY_LOG
cp $JAR_FILE $SSL_JAR_FILE

# jar 파일 실행
# echo "$TIME_NOW > $JAR_FILE 파일 실행" >> $DEPLOY_LOG
nohup java -jar $JAR_FILE > $APP_LOG 2> $ERROR_LOG &
nohup java -jar $SSL_JAR_FILE --spring.profiles.active=server > $SSL_APP_LOG 2> $SSL_ERROR_LOG &

# CURRENT_PID=$(pgrep -f $JAR_FILE)
# echo "$TIME_NOW > 실행된 프로세스 아이디 $CURRENT_PID 입니다." >> $DEPLOY_LOG
