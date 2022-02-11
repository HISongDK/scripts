# 1、cd 到当前目录
# 这是 cd 到脚本所在目录了
# currentDir=$(cd "$(dirname "$0")"; pwd)
# cd ${currentDir}
# echo $currentDir

# 1、打印当前目录
echo 当前目录：
pwd
echo

# 2、获取当前的分支
currentBranch=$(git symbolic-ref --short HEAD)

# 3、获取提交的信息
echo "\033[32m请输入提交信息：\033[0m"
read commitInfo
echo

# 4、提交操作
echo git add .
git add .
echo

echo git commit -m $commitInfo
git commit -m $commitInfo
echo

echo "\033[32m提交完毕\033[0m"

sleep 2
exit