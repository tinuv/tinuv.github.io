echo "=====Git 快速提交脚本=====";
cd "D:\My Blog\tinuv.github.io";
echo "=====已切换到目标文件夹====="
git add .;
echo "=====本地已修改====="
git commit -a -m "commit";
echo "=====本地已提交====="
git pull origin master;
echo "=====远程拉取成功====="
git push origin master;
echo "=====已推送====="
echo "=====完成所有动作====="