@echo off
 
title GIT提交代码
color 3

REM 声明采用UTF-8编码
chcp 65001

echo 当前目录为：%cd%
echo;


echo 添加变更：git add .
git add .
echo;
 
set /p declation=输入提交的commit信息:
git commit -m "%declation%"
echo;

echo 推送代码：git push
git push
echo;

echo 执行完毕！
echo;
 
pause