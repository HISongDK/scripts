# 1、打印当前目录
echo 当前目录：
pwd
echo

# 2、获取提交的信息
echo "\033[32m请输入提交信息：\033[0m"
read commitInfo
echo

# 3、提交操作
echo git add .
git add .
echo

echo git commit -m $commitInfo
git commit -m $commitInfo
echo

echo "\033[32m提交完毕\033[0m"

sleep 2
exit